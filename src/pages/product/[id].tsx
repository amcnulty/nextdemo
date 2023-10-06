import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "~/components/layout";
import { type Product } from "~/types/Product";
import useSWR from "swr";
import { fetcher } from "~/util/fetcher";
import { RatingComponent } from "~/components/rating/Rating";
import { useEffect, useState } from "react";
import { RelatedItems } from "~/components/related-items/RelatedItems";
import { useContextSetters } from "~/hooks/useContextSetters";
import { appContext, selectLineitems } from "~/context/AppContext";
import { useContextSelector } from "~/hooks/useContextSelector";
import { type Lineitem } from "~/types/Lineitem";
import { useCurrency } from "~/hooks/useCurrency";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const currency = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const { addLineitem, mergeLineitem } = useContextSetters(appContext);
  const lineitems = useContextSelector(
    appContext,
    selectLineitems,
  ) as Lineitem[];

  const { data: product } = useSWR<Product>(
    `https://fakestoreapi.com/products/${id as string}`,
    fetcher,
  );

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    lineitems &&
      setIsInCart(
        !!lineitems.find((item) => item.product.id === parseInt(id as string)),
      );
  }, [id, lineitems]);

  const handleAddToCart = () => {
    if (isInCart) {
      mergeLineitem({ product: product!, quantity });
    } else {
      addLineitem({ product: product!, quantity });
    }
  };

  return (
    <Layout>
      <div className="breadcrumbs bg-slate-100 ps-2 text-sm">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
          <li>
            <p className="w-60 truncate">{product ? product.title : ". . ."}</p>
          </li>
        </ul>
      </div>
      <div className="card card-bordered my-2 bg-zinc-50">
        <span>
          <RatingComponent rating={product?.rating ?? { count: 0, rate: 0 }} />
        </span>
        <div className="card-body">
          <h1 className="text-2xl">{product?.title}</h1>
          <img
            className="w-3/5 self-center"
            src={product?.image}
            alt={product?.title}
          />
        </div>
      </div>
      <div className="card card-bordered my-2 bg-zinc-50">
        <div className="card-body">
          <div className="badge badge-ghost">{product?.category}</div>
          <p>{product?.description}</p>
          <div className="card-actions justify-end">
            <span className="me-auto self-center font-bold">
              {currency(product?.price ?? 0)}
            </span>
            <div className="flex">
              <label className="label text-sm">Qty.</label>
              <input
                type="number"
                min={1}
                className="input input-bordered w-12"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button
              className={`btn btn-primary ${isInCart ? "btn-outline" : ""}`}
              onClick={handleAddToCart}
            >
              {isInCart ? "Add More" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
      <RelatedItems category={product?.category} />
    </Layout>
  );
}

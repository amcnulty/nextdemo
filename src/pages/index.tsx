/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Layout from "~/components/layout";
import useSWR from "swr";
import { fetcher } from "~/util/fetcher";
import { type Product } from "~/types/Product";
import { ProductCard } from "~/components/product-card/ProductCard";
import Link from "next/link";

export default function Home() {
  const { data } = useSWR<[Product]>(
    "https://fakestoreapi.com/products?limit=2",
    fetcher,
  );

  const { data: categories }: { data: any[] } = useSWR(
    "https://fakestoreapi.com/products/categories",
    fetcher,
  );

  return (
    <Layout>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Fake Store</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-center text-4xl font-bold text-slate-800">
          Featured Products
        </h1>
        {data?.map((product: Product) => (
          <ProductCard key={product.id} product={product} hideDescription hideCategory />
        ))}
        <h1 className="text-center text-4xl font-bold text-slate-800">
          Shop Category
        </h1>
        <div className="mt-8 grid grid-cols-2">
          {categories?.map((category) => (
            <button key={category} className="btn btn-secondary btn-outline">
              <Link href={`/catalog?category=${category}`}>{category}</Link>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}

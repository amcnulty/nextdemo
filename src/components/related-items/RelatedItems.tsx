import { type Product } from "~/types/Product";
import { ProductCard } from "../product-card/ProductCard";
import useSWR from "swr";
import { fetcher } from "~/util/fetcher";

export const RelatedItems = ({ category }: { category?: string }) => {
  const { data } = useSWR<[Product]>(
    () => `https://fakestoreapi.com/products/category/${category}`,
    fetcher,
  );

  return (
    <div className="card card-bordered card-compact my-2 bg-zinc-50">
      <div className="card-body">
        <h3 className="text-xl font-bold">Similar Items</h3>
      </div>
      <div className="carousel w-full">
        {data?.map((product) => (
          <div key={product.id} className="carousel-item w-1/2">
            <ProductCard product={product} hideDescription compact />
          </div>
        ))}
      </div>
    </div>
  );
};

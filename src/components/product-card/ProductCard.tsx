import Link from "next/link";
import { useCurrency } from "~/hooks/useCurrency";
import { type Product } from "~/types/Product";

export const ProductCard = ({
  product,
  hideDescription,
  hideCategory,
  compact,
}: {
  product: Product;
  hideDescription?: boolean;
  hideCategory?: boolean;
  compact?: boolean;
}) => {
  const currency = useCurrency();

  return (
    <div key={product.id} className="card my-8 w-full bg-base-100 shadow-xl">
      {!hideCategory && (
        <div className="badge badge-ghost m-2">{product.category}</div>
      )}
      <Link href={`/product/${product.id}`}>
        <figure>
          <img
            className={`w-3/5 ${compact ? "max-h-10 w-auto" : ""}`}
            src={product.image}
            alt={product.title}
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link href={`/product/${product.id}`}>
          <h2 className={`card-title ${compact ? "text-xs" : ""}`}>
            {product.title}
          </h2>
        </Link>
        {!hideDescription && <p>{product.description}</p>}
        <div className={`card-actions justify-end ${compact ? "mt-auto" : ""}`}>
          <span className="me-auto self-center">{currency(product.price)}</span>
          <button className={`btn btn-primary ${compact ? "btn-xs" : ""}`}>
            <Link href={`/product/${product.id}`}>Buy Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

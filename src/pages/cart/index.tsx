import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "~/components/layout";
import { appContext, selectCart, selectLineitems } from "~/context/AppContext";
import { useContextSelector } from "~/hooks/useContextSelector";
import { useCurrency } from "~/hooks/useCurrency";
import { type Cart } from "~/types/Cart";
import { type Lineitem } from "~/types/Lineitem";

export default function Cart() {
  const router = useRouter();
  const currency = useCurrency();
  const cart = useContextSelector(appContext, selectCart) as Cart;
  const lineitems = useContextSelector(
    appContext,
    selectLineitems,
  ) as Lineitem[];

  useEffect(() => {
    if (!cart || !cart.isActive) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push("/catalog");
    }
  }, [cart, router]);

  return (
    <>
      {cart && cart.isActive ? (
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
                <p>Cart</p>
              </li>
            </ul>
          </div>
          <div className="card card-bordered my-2 bg-zinc-50">
            <h2 className="ps-8 pt-2 text-2xl font-bold">Summary</h2>
            <div className="card-body">
              <div className="flex justify-between">
                <label className="label-text">Sub Total:</label>
                <span className="font-bold">{currency(cart.subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <label className="label-text">Tax:</label>
                <span className="font-bold">{currency(cart.tax)}</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between">
                <label className="label-text">Grand Total:</label>
                <span className="font-bold">{currency(cart.grandTotal)}</span>
              </div>
            </div>
          </div>
          <div className="card card-bordered my-2 bg-zinc-50">
            <h2 className="ps-8 pt-2 text-2xl font-bold">Items</h2>
            <div className="card-body">
              {lineitems.map((item, index) => (
                <Link
                  key={item.product.id}
                  href={`/product/${item.product.id}`}
                >
                  <div
                    className={`flex justify-between ${
                      index === lineitems.length - 1 ? "" : "border-b"
                    }`}
                  >
                    <div className="flex w-3/4 flex-col">
                      <img
                        className="w-1/4"
                        src={item.product?.image}
                        alt={item.product?.title}
                      />
                      <span>{item.product.title}</span>
                    </div>
                    <div className="flex flex-col justify-center text-right">
                      <span className="text-sm">
                        {currency(item.product.price)}
                      </span>
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-bold">
                        {currency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 px-2 pb-8">
            <button className="btn btn-secondary btn-outline">
              <Link href="/catalog">Keep Shopping</Link>
            </button>
            <button className="btn btn-primary">Checkout</button>
          </div>
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
}

import { type Lineitem } from "~/types/Lineitem";

interface CalculateTotalsResult {
  count: number;
  subTotal: number;
  tax: number;
  grandTotal: number;
}

export const calculateTotals = (
  lineitems: Lineitem[],
): CalculateTotalsResult => {
  const count = lineitems.reduce(
    (previous, current) => previous + current.quantity,
    0,
  );
  const subTotal = lineitems.reduce(
    (previous, current) => previous + current.product.price * current.quantity,
    0,
  );
  const tax = subTotal * 0.07;
  const grandTotal = subTotal + tax;

  return {
    count,
    subTotal,
    tax,
    grandTotal,
  };
};

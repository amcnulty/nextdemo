import { useCallback } from "react";

export const useCurrency = () => {
  return useCallback((value: number) => {
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Change to your desired currency code
    });
    return currencyFormatter.format(value);
  }, []);
};

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  type ReactNode,
  createContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { type SmartContext } from "~/hooks/useContextSelector";
import { type Cart } from "~/types/Cart";
import { type Lineitem } from "~/types/Lineitem";
import { calculateTotals } from "~/util/LineItemService";

// Setup the interface for the context which has all the setters plus subscribe and getState
interface AppContext extends SmartContext {
  setSort: Function;
  setCategory: Function;
  setRating: Function;
  setPriceSort: Function;
  addLineitem: (lineitem: Lineitem) => void;
  mergeLineitem: (lineitem: Lineitem) => void;
}

// Initialize the values
export const appContext = createContext<AppContext>({
  setSort: Function.prototype,
  setCategory: Function.prototype,
  setRating: Function.prototype,
  setPriceSort: Function.prototype,
  addLineitem: (lineitem: Lineitem) => {},
  mergeLineitem: (lineitem: Lineitem) => {},
  subscribe: Function.prototype,
  getState: Function.prototype,
});

// Setup the interface for the state that will be read by components
interface AppState {
  sort?: string;
  category?: string;
  rating?: number;
  priceSort?: string;
  cart?: Cart;
}

// Selectors for the state
export const selectSort = (state: AppState) => state.sort;
export const selectCategory = (state: AppState) => state.category;
export const selectRating = (state: AppState) => state.rating;
export const selectPriceSort = (state: AppState) => state.priceSort;
export const selectCart = (state: AppState) => state.cart;
export const selectLineitemCount = (state: AppState) => state.cart?.count;
export const selectLineitems = (state: AppState) => state.cart?.lineitems;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Use state variables for holding local state
  const [sort, setSort] = useState();
  const [category, setCategory] = useState();
  const [rating, setRating] = useState();
  const [priceSort, setPriceSort] = useState();
  const [cart, setCart] = useState<Cart>();

  const addLineitem = useCallback((lineitem: Lineitem) => {
    setCart((cart) => {
      const newLineitems: Lineitem[] = cart
        ? cart?.lineitems.concat(lineitem)
        : [lineitem];
        
      const totals = calculateTotals(newLineitems);

      return {
        isActive: true,
        lineitems: newLineitems,
        count: totals.count,
        subTotal: totals.subTotal,
        tax: totals.tax,
        grandTotal: totals.grandTotal,
      } satisfies Cart;
    });
  }, []);

  const mergeLineitem = useCallback((lineitem: Lineitem) => {
    setCart((cart) => {
      const newLineitems = cart!.lineitems.map((item) => {
        if (item.product.id === lineitem.product.id) {
          return {
            ...lineitem,
            quantity: item.quantity + lineitem.quantity,
          } satisfies Lineitem;
        } else {
          return item;
        }
      });

      const totals = calculateTotals(newLineitems);

      return {
        isActive: true,
        lineitems: newLineitems,
        count: totals.count,
        subTotal: totals.subTotal,
        tax: totals.tax,
        grandTotal: totals.grandTotal,
      } satisfies Cart;
    });
  }, []);

  // Create the store with the state variables
  const storeRef = useRef<AppState>({
    sort,
    category,
    rating,
    priceSort,
    cart,
  });
  storeRef.current = {
    sort,
    category,
    rating,
    priceSort,
    cart,
  };

  const subscribersRef = useRef<Function[]>([]);

  // Call all the subscriptions when the state variables update
  useLayoutEffect(() => {
    subscribersRef.current.forEach((sub) => sub());
  }, [sort, category, rating, priceSort, cart]);

  // Create the memoized store value that never changes and has reference to get the store which does change
  const value = useMemo(
    () => ({
      setSort,
      setCategory,
      setRating,
      setPriceSort,
      addLineitem,
      mergeLineitem,
      subscribe: (cb: Function) => {
        subscribersRef.current.push(cb);
        return () => {
          subscribersRef.current = subscribersRef.current.filter(
            (sub) => sub !== cb,
          );
        };
      },
      getState: () => storeRef.current,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

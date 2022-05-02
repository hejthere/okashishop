import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Dispatch } from "react";
import { Product } from "./Modal";

// @ts-ignore
export const CartContext = createContext<{
  cartItem: Product[] | null;
  setCartItem: Dispatch<SetStateAction<Product[] | null>>;
}>();

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const localStorageItem = null;
  // JSON.parse(localStorage.getItem("cartItem") ?? "") || [];
  const [cartItem, setCartItem] = useState<Product[] | null>(localStorageItem);

  return (
    <CartContext.Provider value={{ cartItem, setCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

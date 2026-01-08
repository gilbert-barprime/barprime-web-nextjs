"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type CustomCheckoutStore,
  createCustomCheckoutStore,
  initCustomCheckoutStore,
} from "../stores/customCheckoutStore";

export type CustomCheckoutStoreApi = ReturnType<
  typeof createCustomCheckoutStore
>;

export const CustomCheckoutStoreContext = createContext<
  CustomCheckoutStoreApi | undefined
>(undefined);

export interface CustomCheckoutStoreProviderProps {
  children: ReactNode;
  initialItems: CustomCheckoutStore["AddOnsItem"];
}

export const CustomCheckoutStoreProvider = ({
  children,
  initialItems,
}: CustomCheckoutStoreProviderProps) => {
  const storeRef = useRef<CustomCheckoutStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCustomCheckoutStore(
      initCustomCheckoutStore(initialItems)
    );
  }

  return (
    <CustomCheckoutStoreContext.Provider value={storeRef.current}>
      {children}
    </CustomCheckoutStoreContext.Provider>
  );
};

export const useCustomCheckoutStore = <T,>(
  selector: (store: CustomCheckoutStore) => T
): T => {
  const customCheckoutStoreContext = useContext(CustomCheckoutStoreContext);

  if (!customCheckoutStoreContext) {
    throw new Error(
      `useCustomCheckoutStore must be used within CustomCheckoutStoreProvider`
    );
  }

  return useStore(customCheckoutStoreContext, selector);
};

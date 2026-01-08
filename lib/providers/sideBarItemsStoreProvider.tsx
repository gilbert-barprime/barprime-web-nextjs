"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type SidebarItemsStore,
  createSidebarItemsStore,
  initSidebarItemsStore,
} from "../stores/sideBarItemsStore";

export type SidebarItemsStoreApi = ReturnType<typeof createSidebarItemsStore>;

export const SidebarItemsStoreContext = createContext<
  SidebarItemsStoreApi | undefined
>(undefined);

export interface SidebarItemsStoreProviderProps {
  children: ReactNode;
  initialItems: SidebarItemsStore["SidebarItem"];
}

export const SidebarItemsStoreProvider = ({
  children,
  initialItems,
}: SidebarItemsStoreProviderProps) => {
  const storeRef = useRef<SidebarItemsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSidebarItemsStore(
      initSidebarItemsStore(initialItems)
    );
  }

  return (
    <SidebarItemsStoreContext.Provider value={storeRef.current}>
      {children}
    </SidebarItemsStoreContext.Provider>
  );
};

export const useSidebarItemsStore = <T,>(
  selector: (store: SidebarItemsStore) => T
): T => {
  const sidebarItemsStoreContext = useContext(SidebarItemsStoreContext);

  if (!sidebarItemsStoreContext) {
    throw new Error(
      `useSidebarItemsStore must be used within SidebarItemsStoreProvider`
    );
  }

  return useStore(sidebarItemsStoreContext, selector);
};

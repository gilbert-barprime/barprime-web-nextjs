import { createStore } from "zustand/vanilla";
import { SidebarItem } from "../../types";

export type SidebarItemsState = {
  SidebarItem: SidebarItem[];
};

export type SidebarItemsActions = {
  update: (items: SidebarItem[]) => void;
};

export type SidebarItemsStore = SidebarItemsState & SidebarItemsActions;

export const initSidebarItemsStore = (
  value: SidebarItem[]
): SidebarItemsState => {
  return { SidebarItem: value };
};

export const defaultInitState: SidebarItemsState = {
  SidebarItem: [],
};

export const createSidebarItemsStore = (
  initState: SidebarItemsState = defaultInitState
) => {
  return createStore<SidebarItemsStore>()((set) => ({
    ...initState,
    update: (items) => set({ SidebarItem: items }),
  }));
};

import { createStore } from "zustand/vanilla";
import { AddOns } from "../../types";

export type CustomCheckoutState = {
  AddOnsItem: AddOns[];
  packageType: string;
};

export type CustomCheckoutActions = {
  update: (AddOnsItem: AddOns[]) => void;
  updatePackageType: (type: string) => void;
};

export type CustomCheckoutStore = CustomCheckoutState & CustomCheckoutActions;

export const initCustomCheckoutStore = (
  value: AddOns[]
): CustomCheckoutState => {
  return { AddOnsItem: value, packageType: "" };
};

export const defaultInitState: CustomCheckoutState = {
  AddOnsItem: [],
  packageType: "",
};

export const createCustomCheckoutStore = (
  initState: CustomCheckoutState = defaultInitState
) => {
  return createStore<CustomCheckoutStore>()((set) => ({
    ...initState,
    update: (items) => set({ AddOnsItem: items }),
    updatePackageType: (type) => set({ packageType: type }),
  }));
};

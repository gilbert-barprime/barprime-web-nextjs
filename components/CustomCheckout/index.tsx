"use client";

import { AddOns } from "../../types";
import { useCustomCheckoutStore } from "../../lib/providers/customCheckoutStore";

type PropsType = {
  addonsTypes: AddOns[] | null;
  addons: AddOns[] | null;
};

export default function CustomCheckout({ addonsTypes, addons }: PropsType) {
  const {
    AddOnsItem: selectedAddons,
    update: selectedAddonsUpdate,
    packageType,
    updatePackageType,
  } = useCustomCheckoutStore((store) => store);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      const alreadySelected = selectedAddons.find(
        (addon) => addon._id === value
      );
      if (!alreadySelected) {
        const newAddons = addons?.filter((addon) => addon._id === value) || [];
        selectedAddonsUpdate([...selectedAddons, ...newAddons]);
      }
    } else {
      const filteredAddons = selectedAddons.filter(
        (addon) => addon._id !== value
      );
      selectedAddonsUpdate(filteredAddons);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {addonsTypes &&
        addonsTypes.map((addonsType, index) => (
          <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              <input
                type="radio"
                name="custom-addon"
                id=""
                className="size-4"
                onChange={() => {
                  const selected =
                    addons?.filter(
                      (addon) => addon.group_type === addonsType.group_type
                    ) || [];
                  selectedAddonsUpdate(selected);
                  updatePackageType(addonsType.group_type);
                }}
              />
              <span>{addonsType.group_name}</span>
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {addonsType.description}
            </p>
            <ul className="list-inside">
              {addons?.map((addon) =>
                addon.group_type === addonsType.group_type ? (
                  <li key={addon._id} className="mb-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex gap-2">
                        {packageType &&
                          addonsType.group_type !== packageType && (
                            <input
                              type="checkbox"
                              name={addon._id}
                              id={addon._id}
                              value={addon._id}
                              onChange={handleCheckboxChange}
                              disabled={addon.subscribed}
                            />
                          )}

                        {addon.name}
                      </span>

                      {packageType && addonsType.group_type !== packageType && (
                        <span className="font-semibold">(₱{addon.price})</span>
                      )}
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        ))}
    </div>
  );
}

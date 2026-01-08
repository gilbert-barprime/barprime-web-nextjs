"use client";

import { ArrowRight } from "lucide-react";
import { AddOns as AddOnsType, Subscription } from "../../types";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

type PropsType = {
  addons: AddOnsType[] | null;
  addonsTypes: AddOnsType[] | null;
  subscription: Subscription | null;
  isLandingPage?: boolean;
};

export default function AddOns({
  addons,
  addonsTypes,
  subscription,
  isLandingPage,
}: PropsType) {
  const [selected_addonsIds, setSelectedAddonsIds] = useState<AddOnsType[]>([]);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (!addons) return;

    if (checked) {
      const selectedAddon = addons.find((addon) => addon._id === value);
      if (selectedAddon) {
        setSelectedAddonsIds((prev) => [...prev, selectedAddon]);
      }
    } else {
      setSelectedAddonsIds((prev) =>
        prev.filter((addon) => addon._id !== value)
      );
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
        Additional Services
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {addonsTypes &&
          addonsTypes.map((addonsType, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-md"
            >
              <h3 className="font-semibold text-gray-900">
                {addonsType.group_name}
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
                          <input
                            type="checkbox"
                            name={addon._id}
                            id={addon._id}
                            value={addon._id}
                            onChange={handleCheckboxChange}
                            disabled={addon.subscribed}
                          />
                          {addon.name}
                        </span>

                        {addon.subscribed ? (
                          <span className="text-green-600">(Paid)</span>
                        ) : (
                          <span className="font-semibold">
                            (₱{addon.price})
                          </span>
                        )}
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-6">
        {isLandingPage ? (
          <Link href="/signup" className="btn btn-primary btn-lg">
            Buy Selected Addons{" "}
            {selected_addonsIds.length > 0 && (
              <>
                (₱
                {selected_addonsIds.reduce(
                  (total, addon) => total + addon.price,
                  0
                )}
                )
              </>
            )}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={`/dashboard/subscription/buy-addons/${encodeURIComponent(
              selected_addonsIds.map((addon) => addon._id).join(",")
            )}`}
            className="btn btn-primary btn-lg"
            onClick={(e) => {
              if (!subscription) {
                e.preventDefault();
                toast.warning("Please subscribe before you can buy addons.");
              }
              if (selected_addonsIds.length === 0) {
                e.preventDefault();
                toast.warning("Please select at least one addon to proceed.");
              }
            }}
          >
            Buy Selected Addons{" "}
            {selected_addonsIds.length > 0 && (
              <>
                (₱
                {selected_addonsIds.reduce(
                  (total, addon) => total + addon.price,
                  0
                )}
                )
              </>
            )}{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { customFetch } from "../../lib/helper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import QR_2499 from "../../public/BarprimeQR/qr_2499.jpg";
import QR_3499 from "../../public/BarprimeQR/qr_3499.jpg";
import QR_3999 from "../../public/BarprimeQR/qr_3999.jpg";
import QR_4999 from "../../public/BarprimeQR/qr_4999.jpg";
import QR_CUSTOM_PRICE from "../../public/BarprimeQR/qr_custom_price.jpg";
import { useCustomCheckoutStore } from "../../lib/providers/customCheckoutStore";

export default function GCashReferenceForm(props: {
  planId: string;
  amount: number;
  is_upgrade: boolean;
  initial_payment: number;
  is_custom_plan: boolean;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ref_number, setRefNumber] = useState("");
  const [amount, setAmount] = useState(props.amount);
  const { AddOnsItem, packageType } = useCustomCheckoutStore((store) => store);

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (amount <= 0) {
      toast.error("Amount must be greater than zero.");
      return;
    }

    setLoading(true);

    if (props.is_upgrade) {
      const result = await customFetch({
        url: `/subscriptions/upgrade`,
        method: "PUT",
        data: JSON.stringify({
          new_planId: props.planId,
          price: amount,
          transaction_id: ref_number,
        }),
        auth_token: session?.user.accessToken,
      });

      if (!result) {
        setLoading(false);
        toast.error("Something went wrong!");
        return;
      }
    } else {
      let payload = {};

      if (AddOnsItem.length > 0) {
        payload = {
          ...payload,
          addons_package_type: packageType,
          addons: AddOnsItem.map((addon) => addon._id),
        };
      }

      payload = {
        ...payload,
        planId: props.planId,
        transaction_id: ref_number,
      };

      const result = await customFetch({
        url: `/subscriptions`,
        method: "POST",
        data: JSON.stringify(payload),
        auth_token: session?.user.accessToken,
      });

      if (!result) {
        setLoading(false);
        toast.error("Something went wrong!");
        return;
      }
    }

    toast.success("Reference number submitted successfully.");
    setRefNumber("");
    router.push(`/dashboard/subscription/payment/${props.planId}/thank-you`);
  };

  useEffect(() => {
    const addonsTotal = AddOnsItem.reduce(
      (total, addon) => total + addon.price,
      0
    );
    setAmount(props.amount + addonsTotal);
  }, [AddOnsItem]);

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Pay with GCash</h2>
      <div className="shadow rounded relative w-64 h-64 mx-auto overflow-hidden">
        {props.is_custom_plan || props.is_upgrade ? (
          <Image src={QR_CUSTOM_PRICE} fill alt="QR Code"></Image>
        ) : (
          <>
            {amount - props.initial_payment === 4999 && (
              <Image src={QR_4999} fill alt="QR Code"></Image>
            )}
            {amount - props.initial_payment === 3999 && (
              <Image src={QR_3999} fill alt="QR Code"></Image>
            )}
            {amount - props.initial_payment === 3499 && (
              <Image src={QR_3499} fill alt="QR Code"></Image>
            )}
            {amount - props.initial_payment === 2499 && (
              <Image src={QR_2499} fill alt="QR Code"></Image>
            )}
          </>
        )}
      </div>
      <br />
      <div className="text-left text-gray-600">
        <h3 className="font-semibold mb-1">Instructions to pay using GCash:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Open your GCash app.</li>
          <li>Tap “Pay QR” on the home screen.</li>
          <li>Scan the QR code displayed above.</li>
          <li>
            Confirm the amount:{" "}
            {props.is_custom_plan ? (
              <strong>₱{amount.toFixed(2)}</strong>
            ) : (
              <strong>₱{(amount - props.initial_payment).toFixed(2)}</strong>
            )}
            .
          </li>
          <li>Confirm the payment and note the transaction reference.</li>
          <li>
            lastly, input the transaction reference number in the input field
            below then click submit.
          </li>
          <li>
            We&apos;ll email you once we confirm the reference number you send.
          </li>
        </ol>
        <br />
        <form onSubmit={handleOnSubmit}>
          <div className="card bg-base-300 shadow p-4">
            <div className="grid gap-1 mb-3">
              <label htmlFor="reference_no">
                Transaction Reference Number:{" "}
                <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                name="reference_no"
                id="reference_no"
                className="input w-full"
                value={ref_number}
                onChange={(e) => setRefNumber(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

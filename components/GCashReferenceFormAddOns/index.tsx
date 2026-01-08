"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { customFetch } from "../../lib/helper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function GCashReferenceFormAddOns(props: {
  addons_ids: string[];
  amount: number;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ref_number, setRefNumber] = useState("");

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const result = await customFetch({
      url: `/subscriptions/buy-addons`,
      method: "POST",
      data: JSON.stringify({
        addons_ids: JSON.stringify(props.addons_ids),
        price: props.amount,
        transaction_id: ref_number,
      }),
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      setLoading(false);
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Reference number submitted successfully.");
    setRefNumber("");
    router.push("/dashboard/subscription");
  };
  
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="card bg-base-300 shadow p-4">
        <div className="grid gap-1 mb-3">
          <label htmlFor="reference_no">
            Transaction Reference Number: <span className="text-error">*</span>
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
  );
}

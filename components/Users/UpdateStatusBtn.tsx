"use client";

import { useSession } from "next-auth/react";
import { customFetch } from "../../lib/helper";
import { toast } from "react-toastify";
import { useState } from "react";
import { Aperture } from "lucide-react";

export default function UpdateStatusBtn({
  id,
  getUserList,
}: {
  id: string;
  getUserList: () => void;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleApprovePayment = async () => {
    setLoading(true);
    const result = await customFetch({
      url: `/admin/subscriptions/approve-payment`,
      method: "PUT",
      data: JSON.stringify({ customer_id: id }),
      auth_token: session?.user?.accessToken,
    });

    if (!result) {
      setLoading(false);
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Approved!");
    setLoading(false);
    getUserList();
  };

  return (
    <button
      className="btn btn-sm btn-primary"
      disabled={loading}
      onClick={handleApprovePayment}
    >
      {loading ? (
        <span className="animate-spin">
          <Aperture className="size-4" />
        </span>
      ) : (
        "Approve"
      )}
    </button>
  );
}

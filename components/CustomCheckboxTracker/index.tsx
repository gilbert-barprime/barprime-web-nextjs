"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { customFetch } from "../../lib/helper";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type PropsType = {
  subject_id: string;
  default_checked: boolean;
  item_id: string;
  refetch_data: () => void;
};

export default function CustomCheckboxTracker(props: PropsType) {
  const { subject_id, default_checked, item_id, refetch_data } = props;
  const { data: session } = useSession();
  const [checked, setChecked] = useState(default_checked);
  const [loading, setLoading] = useState(false);

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setChecked(checked);

    setLoading(true);

    const result = await customFetch({
      url: `/study-tracker/${subject_id}/completed`,
      method: "PUT",
      data: JSON.stringify({
        _id: item_id,
      }),
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
      return;
    }

    refetch_data();
    setLoading(false);
    toast.success(result.message);
  };

  useEffect(() => {
    setChecked(default_checked);
  }, [default_checked]);

  return (
    <>
      <input
        disabled={loading}
        type="checkbox"
        name="syllabus"
        onChange={handleOnChange}
        checked={checked}
        className="checkbox checkbox-sm checkbox-success"
      />
    </>
  );
}

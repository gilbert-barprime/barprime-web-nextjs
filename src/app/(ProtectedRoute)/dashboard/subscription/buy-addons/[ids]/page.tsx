import Image from "next/image";
import qrCode from "../../../../../../../public/BarprimeQR/qr_custom_price.jpg";
import { customFetch } from "../../../../../../../lib/helper";
import { auth } from "../../../../../../../lib/auth";
import { AddOns } from "../../../../../../../types";
import GCashReferenceFormAddOns from "../../../../../../../components/GCashReferenceFormAddOns";

export default async function BuyAddOnsPage(props: {
  params: Promise<{ ids: string }>;
}) {
  const { ids } = await props.params;
  const session = await auth();
  const new_ids = decodeURIComponent(ids);

  const getAddOns = async () => {
    const result = await customFetch({
      url: "/addons",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as AddOns[];
  };

  const addons = await getAddOns();
  const selectedAddons = addons?.filter((addon) =>
    new_ids.split(",").includes(addon._id)
  );

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-base-200 min-h-screen">
      <div className="card bg-base-100 shadow-xl p-6 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Pay with GCash</h2>
        <div className="shadow rounded relative w-56 h-56 mx-auto overflow-hidden">
          <Image src={qrCode} fill alt="QR Code"></Image>
        </div>
        <br />
        <div className="text-left text-gray-600">
          <h3 className="font-semibold mb-1">
            Instructions to pay using GCash:
          </h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open your GCash app.</li>
            <li>Tap “Pay QR” on the home screen.</li>
            <li>Scan the QR code displayed above.</li>
            <li>
              Confirm the amount:{" "}
              <strong>
                ₱
                {selectedAddons
                  ? selectedAddons.reduce(
                      (total, addon) => total + addon.price,
                      0
                    )
                  : 0}
              </strong>
              .
            </li>
            <li>Confirm the payment and note the transaction reference.</li>
            <li>
              lastly, input the transaction reference number in the input field
              below then click submit.
            </li>
            <li>
              We&apos;ll email you once we confirm the reference number you
              send.
            </li>
          </ol>
          <br />
          <GCashReferenceFormAddOns
            addons_ids={new_ids.split(",")}
            amount={
              selectedAddons
                ? selectedAddons.reduce(
                    (total, addon) => total + addon.price,
                    0
                  )
                : 0
            }
          />
        </div>
      </div>
    </div>
  );
}

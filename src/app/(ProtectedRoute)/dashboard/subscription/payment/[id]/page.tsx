import { customFetch } from "../../../../../../../lib/helper";
import {
  AddOns,
  PersonalInformation,
  Plan,
  Subscription,
} from "../../../../../../../types";
import { auth } from "../../../../../../../lib/auth";
import GCashReferenceForm from "../../../../../../../components/GCashReferenceForm";
import CustomCheckout from "../../../../../../../components/CustomCheckout";
import { CustomCheckoutStoreProvider } from "../../../../../../../lib/providers/customCheckoutStore";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const session = await auth();

  const getPersonalInfo = async () => {
    const result = await customFetch({
      url: "/users/profile",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as PersonalInformation;
  };

  const getPlanById = async (planId: string) => {
    const result = await customFetch({
      url: "/plans/" + planId,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as Plan;
  };

  const getAddOns = async () => {
    const result = await customFetch({
      url: "/addons",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as AddOns[] | null;
  };

  const getSubscriptionDetails = async () => {
    const result = await customFetch({
      url: "/subscriptions/detail",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return result.data as Subscription;
  };

  const profile = await getPersonalInfo();
  const subscription = await getSubscriptionDetails();
  const plan = await getPlanById(id);

  const addons = await getAddOns();

  const addonsTypes =
    addons &&
    Array.from(
      new Map(addons.map((addon) => [addon.group_type, addon])).values()
    );

  const amount =
    plan?.level === 4
      ? 0
      : subscription
      ? (plan?.price ?? 0) - subscription.plan.price
      : plan?.price ?? 0;

  if (plan?.level === 4) {
    return (
      <CustomCheckoutStoreProvider initialItems={[]}>
        <div className="grid grid-cols-6 gap-5 p-8 bg-base-200 min-h-screen">
          <div className="col-span-2 card bg-base-100 shadow-xl p-6 w-full max-w-lg text-center">
            <GCashReferenceForm
              planId={id}
              amount={amount}
              is_upgrade={subscription ? true : false}
              initial_payment={profile?.initial_payment ?? 0}
              is_custom_plan={true}
            />
          </div>
          <div className="col-span-4 card bg-base-100 shadow-xl p-6 w-full">
            <h2 className="text-2xl font-bold mb-4">
              Select Services you want to Purchase:
            </h2>

            <CustomCheckout addonsTypes={addonsTypes} addons={addons} />
          </div>
        </div>
      </CustomCheckoutStoreProvider>
    );
  } else {
    return (
      <CustomCheckoutStoreProvider initialItems={[]}>
        <div className="flex flex-col items-center justify-center p-8 bg-base-200 min-h-screen">
          <div className="card bg-base-100 shadow-xl p-6 w-full max-w-lg text-center">
            <GCashReferenceForm
              planId={id}
              amount={amount}
              is_upgrade={subscription ? true : false}
              initial_payment={
                plan?.level === 2 ? 0 : profile?.initial_payment ?? 0
              }
              is_custom_plan={false}
            />
          </div>
        </div>
      </CustomCheckoutStoreProvider>
    );
  }
}

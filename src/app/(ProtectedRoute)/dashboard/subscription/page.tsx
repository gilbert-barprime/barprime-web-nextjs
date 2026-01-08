import { AddOns as AddOnsType, Plan, Subscription } from "../../../../../types";
import { customFetch } from "../../../../../lib/helper";
import Plans from "../../../../../components/Plans";
import { auth } from "../../../../../lib/auth";
import AddOns from "../../../../../components/AddOns";

export default async function Page() {
  const session = await auth();

  const getPlans = async () => {
    const result = await customFetch({
      url: "/plans",
      method: "GET",
    });

    return result.data as Plan[] | null;
  };

  const getAddOns = async () => {
    const result = await customFetch({
      url: "/addons",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    return result.data as AddOnsType[] | null;
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

    return result.data as Subscription | null;
  };

  const subscription = await getSubscriptionDetails();
  const plans = await getPlans();
  const addons = await getAddOns();

  const addonsTypes =
    addons &&
    Array.from(
      new Map(addons.map((addon) => [addon.group_type, addon])).values()
    );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Upgrade your bar exam preparation with our comprehensive plans. Unlock
          premium features, personalized tutoring, and more to help you succeed.
        </p>
      </div>

      {/* Current Plan Status */}
      {subscription && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 capitalize">
                Current Plan:{" "}
                <span className="font-medium uppercase text-xl">
                  {subscription.plan.name}
                </span>
              </h3>
              <div>
                Transaction Reference#:{" "}
                <span className="font-medium">
                  {subscription.transaction_id}
                </span>
              </div>
              <div className="">
                Status:{" "}
                <span className="font-bold uppercase">
                  {subscription.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plans Grid */}
      <Plans plans={plans} subscription={subscription} />

      {/* Add-ons */}
      <AddOns
        addons={addons}
        addonsTypes={addonsTypes}
        subscription={subscription}
      />

      {/* FAQ */}
      {/* <div className="mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately for upgrades and at the end of your
                billing cycle for downgrades.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens to my progress if I downgrade?
              </h3>
              <p className="text-gray-600 text-sm">
                Your progress and completed exams are always saved. However,
                access to premium features will be limited based on your new
                plan.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is there a money-back guarantee?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes, we offer a 14-day money-back guarantee for all paid plans.
                If you&apos;re not satisfied, we&apos;ll refund your payment in
                full.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How do tutoring sessions work?
              </h3>
              <p className="text-gray-600 text-sm">
                Tutoring sessions are conducted via video call with experienced
                attorneys. You can schedule sessions through your dashboard
                based on your needs.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

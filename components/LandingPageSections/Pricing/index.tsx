import { customFetch } from "../../../lib/helper";
import { Plan, AddOns as AddOnsType } from "../../../types";
import AddOns from "../../AddOns";
import Plans from "../../Plans";

export default async function Pricing() {
  const getPlans = async () => {
    try {
      const result = await customFetch({
        url: "/plans",
        method: "GET",
      });
      return result.data as Plan[];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getAddOns = async () => {
    try {
      const result = await customFetch({
        url: "/public-addons",
        method: "GET",
      });
      return result.data as AddOnsType[];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const plans = await getPlans();
  const addons = await getAddOns();
  const addonsTypes =
    addons &&
    Array.from(
      new Map(addons.map((addon) => [addon.group_type, addon])).values()
    );

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Success Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our free plan or upgrade for comprehensive bar exam
            preparation.
          </p>
        </div>
        <Plans plans={plans} subscription={null} isLandingPage={true} />
        <AddOns
          addons={addons}
          addonsTypes={addonsTypes}
          subscription={null}
          isLandingPage={true}
        />
      </div>
    </section>
  );
}

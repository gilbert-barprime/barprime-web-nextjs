"use client";

import { Check, Star } from "lucide-react";
import { Plan, Subscription } from "../../types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CoreBoostImg from "../../public/icons/core-boost.png";
import PracticeEdgeImg from "../../public/icons/practice-edge.png";
import UltimateReviewKitImg from "../../public/icons/ultimate-review-kit.png";
import CustomImg from "../../public/icons/custom.png";
import Image from "next/image";
import { toast } from "react-toastify";

type PropsType = {
  plans: Plan[] | null;
  subscription: Subscription | null;
  isLandingPage?: boolean;
};

export default function Plans(props: PropsType) {
  const { plans, subscription, isLandingPage } = props;
  const router = useRouter();
  const handleUpgrade = (planId: string, planLevel: number) => {
    if (planId === subscription?.plan._id) {
      return;
    }

    if (planLevel > 3 && subscription) {
      toast.warning("You can't upgrade to this plan.");
      return;
    }
    router.push(`/dashboard/subscription/payment/${planId}`);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-8 xl:gap-3 mb-12">
      {plans &&
        plans.map((plan) => (
          <div
            key={plan._id}
            className={`flex flex-col relative bg-white rounded-lg border-2 p-5 ${
              plan.popular
                ? "border-blue-500 shadow-xl sm:scale-105"
                : plan.current
                ? "border-green-500 shadow-lg"
                : "border-gray-200 shadow-md"
            }`}
          >
            <div className="grow">
              {/* Plan Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Current Plan
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  {plan.name.toLowerCase() === "core boost" && (
                    <Image
                      src={CoreBoostImg}
                      width={40}
                      height={40}
                      alt="Core Boost"
                    />
                  )}
                  {plan.name.toLowerCase() === "practice edge" && (
                    <Image
                      src={PracticeEdgeImg}
                      width={40}
                      height={40}
                      alt="Practice Edge"
                    />
                  )}
                  {plan.name.toLowerCase() === "ultimate review kit" && (
                    <Image
                      src={UltimateReviewKitImg}
                      width={40}
                      height={40}
                      alt="Ultimate Review Kit"
                    />
                  )}
                  {plan.name.toLowerCase() === "custom plan" && (
                    <Image
                      src={CustomImg}
                      width={40}
                      height={40}
                      alt="Custom Plan"
                    />
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 uppercase">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  {plan.level === 4 ? (
                    <span className="text-3xl sm:text-4xl   font-medium text-gray-900">
                      Custom
                    </span>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                      ₱{plan.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  {plan.level === 4
                    ? "What you can customized purchase:"
                    : "What's included:"}
                </h4>
                <ul className="space-y-3">
                  {plan.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Button */}
            {isLandingPage ? (
              <Link href="/signup" className="btn w-full btn-primary">
                Subscribe
              </Link>
            ) : (
              <button
                onClick={() => handleUpgrade(plan._id, plan.level)}
                disabled={(subscription?.plan.level || 0) > plan.level}
                className={`btn w-full ${
                  plan._id === subscription?.plan._id
                    ? "btn-success cursor-not-allowed"
                    : ""
                }`}
              >
                {plan._id === subscription?.plan._id
                  ? `Current Plan ${
                      subscription.status === "pending" ? "(pending)" : ""
                    }`
                  : plan.level === 4 && subscription
                  ? "Upgrade Not Available"
                  : "Upgrade Now"}
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

"use client";

import { Fragment, JSX, useState } from "react";
import { MockExamDetail } from "../../../types";
import { useMultiStepForm, useTimer } from "../../../lib/hooks";
import { customFetch } from "../../../lib/helper";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function MockBarForm({
  mockBarExam,
}: {
  mockBarExam: MockExamDetail | null;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleStartTimer = async () => {
    const result = await customFetch({
      url: `/mock-bar-exams/start/${mockBarExam?._id}`,
      method: "PUT",
      auth_token: session?.user?.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Timer Started!");
  };

  const { timeLeft, hasFinished, isRunning, start, stop } = useTimer(
    mockBarExam?.started_at,
    mockBarExam?.time_limit ?? 90,
    handleStartTimer
  );

  const questions: JSX.Element[] = (mockBarExam?.items ?? []).map(
    (item, index) => (
      <Fragment key={index}>
        <div className="text-lg font-medium">Question {index + 1}:</div>
        <p>{item.question}</p>
        <br />
        <div className="text-lg font-medium">Answer:</div>
        <textarea
          name={`answer_${item._id}`}
          id={`answer_${item._id}`}
          rows={8}
          required
          disabled={!isRunning}
          value={formData[item._id] || ""}
          onChange={(e) => {
            setFormData((prev) => {
              return { ...prev, [item._id]: e.target.value };
            });
          }}
          className="w-full border border-gray-300 rounded p-2 outline-none"
        ></textarea>
      </Fragment>
    )
  );
  const { step, next, back, isLastStep, goTo, currentStepIndex, isFirstStep } =
    useMultiStepForm(questions);

  const saveData = async (currentFieldId: string) => {
    const result = await customFetch({
      url: `/mock-bar-exams/take/${mockBarExam?._id}`,
      method: "PUT",
      data: JSON.stringify({
        answer: formData[currentFieldId],
        item_id: currentFieldId,
      }),
      auth_token: session?.user?.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Answer saved successfully!");
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textarea = e.currentTarget.querySelector(
      "textarea"
    ) as HTMLTextAreaElement | null;

    const id = textarea?.id.replace("answer_", "") || "";

    if (!isLastStep) {
      await saveData(id);
      next();
      return;
    }

    // If it's the last step, you can handle final submission here
    await saveData(id);
    const result = await customFetch({
      url: `/mock-bar-exams/complete/${mockBarExam?._id}`,
      method: "PUT",
      auth_token: session?.user?.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    toast.success("Successfully Submitted!");
    stop();
    router.push("/dashboard/mock-bar-exam");
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-4">
        {isRunning ? (
          <div className="text-3xl font-bold bg-amber-200 px-4 py-2 rounded-lg">
            {formatTime(timeLeft)}
          </div>
        ) : (
          !hasFinished && (
            <button className="btn btn-outline btn-accent" onClick={start}>
              Start Mock Bar Timer
            </button>
          )
        )}

        {hasFinished && (
          <p className="text-lg">✅ Timer Done! please wait for the result.</p>
        )}
      </div>
      <div className="grid grid-cols-7 gap-5">
        <div className="col-span-5">
          <form onSubmit={handleOnSubmit} id="questionnaire_form">
            <div className="bg-white rounded shadow p-4">
              {step}
              <div className="flex mt-2 space-x-2">
                {!isFirstStep && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      back();
                    }}
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  disabled={hasFinished && !isRunning}
                  className="btn btn-primary"
                >
                  {isLastStep ? "Submit" : "Save & Next Question"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-2 rounded bg-white shadow p-4">
          <h2 className="text-lg font-bold mb-4">Question Navigation</h2>
          <div className="grid gap-2">
            {mockBarExam?.items.map((item, index) => (
              <div
                key={index}
                className={`shadow rounded p-2 ${
                  index === currentStepIndex ? "bg-primary text-white" : ""
                } hover:bg-primary/50 cursor-pointer`}
                onClick={() => {
                  if (!isRunning) {
                    toast.info(
                      "You can't switch question while the timer is not running!"
                    );
                  } else {
                    goTo(index);
                  }
                }}
              >
                <p className="text-sm line-clamp-2">
                  <span className="font-medium">Q{index + 1}:</span>{" "}
                  {item.question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

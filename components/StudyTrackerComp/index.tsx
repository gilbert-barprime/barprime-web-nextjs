"use client";
import { useState } from "react";
import { StudyTracker, Syllabus } from "../../types";
import CustomCheckboxTracker from "../CustomCheckboxTracker";
import { customFetch } from "../../lib/helper";
import { useSession } from "next-auth/react";
import Topics from "./Topics";
import { toast } from "react-toastify";

type PropsType = {
  data: StudyTracker[] | null;
};

export default function StudyTrackerComp(props: PropsType) {
  const { data } = props;
  const { data: session } = useSession();
  const [study_tracker_data, setStudyTrackerData] = useState(data);

  const getStudyTracker = async () => {
    const result = await customFetch({
      url: "/study-tracker",
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      toast.error("Something went wrong!");
      return;
    }

    const data = result.data as StudyTracker[];
    setStudyTrackerData([...data]);
  };

  const getSubjectProgress = (syllabus: Syllabus[]) => {
    const total_topics = syllabus.reduce(
      (acc, curr) => acc + curr.topics.length,
      0
    );
    const total_sub_topics = syllabus.reduce(
      (acc, curr) =>
        acc +
        curr.topics.reduce(
          (acc1, curr1) =>
            acc1 + (curr1.sub_topics ? curr1.sub_topics?.length : 0),
          0
        ),
      0
    );

    const topics_checked = syllabus.reduce(
      (acc, curr) =>
        acc +
        curr.topics.reduce(
          (acc1, curr1) => acc1 + (curr1.status === "completed" ? 1 : 0),
          0
        ),
      0
    );

    const sub_topics_checked = syllabus.reduce(
      (acc, curr) =>
        acc +
        curr.topics.reduce(
          (acc1, curr1) =>
            acc1 +
            (curr1.sub_topics
              ? curr1.sub_topics.reduce(
                  (acc2, curr2) =>
                    acc2 + (curr2.status === "completed" ? 1 : 0),
                  0
                )
              : 0),
          0
        ),
      0
    );
    const total_checked = topics_checked + sub_topics_checked;
    const total = total_topics + total_sub_topics;

    if (total === 0) return 0; // avoid division by zero

    return ((total_checked / total) * 100).toFixed(1);
  };

  const getTotalPerSyllabus = (syllabus: Syllabus) => {
    const total_sub_topics = syllabus.topics.reduce(
      (acc, curr) => acc + (curr.sub_topics ? curr.sub_topics.length : 0),
      0
    );

    const topic_checked = syllabus.topics.reduce(
      (acc, curr) => acc + (curr.status === "completed" ? 1 : 0),
      0
    );
    const sub_topic_checked = syllabus.topics.reduce(
      (acc, curr) =>
        acc +
        (curr.sub_topics
          ? curr.sub_topics.reduce(
              (acc1, curr1) => acc1 + (curr1.status === "completed" ? 1 : 0),
              0
            )
          : 0),
      0
    );

    const total = total_sub_topics + syllabus.topics.length;
    const total_checked = topic_checked + sub_topic_checked;
    const progress = ((total_checked / total) * 100).toFixed(0);

    return progress;
  };

  return (
    <div className="grid gap-4">
      {study_tracker_data?.map((ele) => (
        <div className="relative shadow rounded bg-white p-4" key={ele._id}>
          <div className="absolute top-4 right-4">
            <div
              className="radial-progress text-success bg-green-100"
              style={
                {
                  "--value": getSubjectProgress(ele.syllabus),
                  "--size": "3.5rem",
                  "--thickness": "6px",
                } as React.CSSProperties
              }
              aria-valuenow={70}
              role="progressbar"
            >
              {getSubjectProgress(ele.syllabus)}%
            </div>
          </div>
          <h1 className="font-medium text-xl mb-1">{ele.title}</h1>
          <div className="font-medium mb-4">Syllabus:</div>
          {ele.syllabus.map((syllabus) => (
            <div
              key={syllabus._id}
              className="collapse collapse-plus bg-base-200 mb-2"
            >
              <input type="checkbox" className="peer" />
              <div className="font-medium collapse-title">
                <div className="flex justify-between items-center">
                  {syllabus.section}
                  <progress
                    className="progress progress-success w-56"
                    value={getTotalPerSyllabus(syllabus)}
                    max={100}
                  ></progress>
                </div>
              </div>
              <div className="collapse-content">
                {syllabus.topics.map((sy_topic) => (
                  <div className="ms-4" key={sy_topic._id}>
                    <div className="flex items-center gap-2 mb-2">
                      <CustomCheckboxTracker
                        subject_id={ele.subjectId}
                        default_checked={
                          sy_topic.status === "completed" ? true : false
                        }
                        item_id={sy_topic._id}
                        refetch_data={async () => await getStudyTracker()}
                      />
                      {sy_topic.sub_section}
                    </div>
                    {sy_topic.sub_topics?.map((sub_topic) => (
                      <div className="ms-6" key={sub_topic._id}>
                        <div className="flex items-center gap-2 mb-2">
                          <CustomCheckboxTracker
                            subject_id={ele.subjectId}
                            default_checked={
                              sub_topic.status === "completed" ? true : false
                            }
                            item_id={sub_topic._id}
                            refetch_data={async () => await getStudyTracker()}
                          />
                          {sub_topic.title}
                        </div>
                        {sub_topic.sub_topics?.map((sub_topic1) => (
                          <div className="ms-6" key={sub_topic1._id}>
                            <div className="flex items-center gap-2 mb-2">
                              <CustomCheckboxTracker
                                subject_id={ele.subjectId}
                                default_checked={
                                  sub_topic1.status === "completed"
                                    ? true
                                    : false
                                }
                                item_id={sub_topic1._id}
                                refetch_data={async () =>
                                  await getStudyTracker()
                                }
                              />
                              {sub_topic1.title}
                            </div>
                            {sub_topic1.sub_topics?.map((sub_topic2) => (
                              <div className="ms-6" key={sub_topic2._id}>
                                <div className="flex items-center gap-2 mb-2">
                                  <CustomCheckboxTracker
                                    subject_id={ele.subjectId}
                                    default_checked={
                                      sub_topic2.status === "completed"
                                        ? true
                                        : false
                                    }
                                    item_id={sub_topic2._id}
                                    refetch_data={async () =>
                                      await getStudyTracker()
                                    }
                                  />
                                  {sub_topic2.title}
                                </div>
                                {sub_topic2.sub_topics?.map((sub_topic3) => (
                                  <div className="ms-6" key={sub_topic3._id}>
                                    <div className="flex items-center gap-2 mb-2">
                                      <CustomCheckboxTracker
                                        subject_id={ele.subjectId}
                                        default_checked={
                                          sub_topic3.status === "completed"
                                            ? true
                                            : false
                                        }
                                        item_id={sub_topic3._id}
                                        refetch_data={async () =>
                                          await getStudyTracker()
                                        }
                                      />
                                      {sub_topic3.title}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

import { Syllabus as SyllabusType } from "../../types";
import Topics from "./Topics";

type PropsType = {
  syllabus: SyllabusType;
  subjectId: string;
};

export default function Syllabus(props: PropsType) {
  const { syllabus, subjectId } = props;
  return (
    <div key={syllabus._id} className="collapse collapse-plus bg-base-200 mb-2">
      <input type="checkbox" className="peer" />
      <div className="font-medium collapse-title">
        <div className="flex justify-between items-center">
          {syllabus.section}
          <progress
            className="progress progress-success w-56"
            // value={getTotalPerSyllabus(syllabus)}
            max={100}
          ></progress>
        </div>
      </div>
      {/* {syllabus.topics.map((sy_topic) => (
        <Topics
          data={sy_topic}
          refetch={async () => await getStudyTracker()}
          subject_id={subjectId}
          key={sy_topic._id}
        />
      ))} */}
    </div>
  );
}

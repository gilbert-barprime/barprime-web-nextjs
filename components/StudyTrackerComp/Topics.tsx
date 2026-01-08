import { Topic } from "../../types";
import CustomCheckboxTracker from "../CustomCheckboxTracker";
import SubTopic1 from "./SubTopic1";

type PropsType = {
  data: Topic;
  subject_id: string;
  refetch: () => void;
};

export default function Topics(props: PropsType) {
  const { data, subject_id, refetch } = props;
  return (
    <div className="ms-4">
      <div className="flex items-center gap-2 mb-2">
        <CustomCheckboxTracker
          subject_id={subject_id}
          default_checked={data.status === "completed" ? true : false}
          item_id={data._id}
          refetch_data={refetch}
        />
        {data.sub_section}
      </div>
      {data.sub_topics?.map((ele) => (
        <SubTopic1
          data={ele}
          refetch={refetch}
          subject_id={subject_id}
          key={ele._id}
        />
      ))}
    </div>
  );
}

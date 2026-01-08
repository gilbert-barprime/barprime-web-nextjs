import { SubTopic } from "../../types";
import CustomCheckboxTracker from "../CustomCheckboxTracker";

type PropsType = {
  data: SubTopic;
  subject_id: string;
  refetch: () => void;
};

export default function SubTopic1(props: PropsType) {
  const { data, refetch, subject_id } = props;

  return (
    <div className="ms-6" key={data?._id}>
      <div className="flex items-center gap-2 mb-2">
        <CustomCheckboxTracker
          subject_id={subject_id}
          default_checked={data?.status === "completed" ? true : false}
          item_id={data._id}
          refetch_data={refetch}
        />
        {data?.title} {data?.status === "completed" ? "true" : "false"}
      </div>
    </div>
  );
}

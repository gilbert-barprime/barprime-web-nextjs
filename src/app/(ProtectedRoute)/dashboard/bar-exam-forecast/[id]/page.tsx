import PDFProtector from "../../../../../../components/PDFProtector";
import PDFViewer from "../../../../../../components/PDFViewer";
import { auth } from "../../../../../../lib/auth";
import { customFetch } from "../../../../../../lib/helper";
import { BarExamForecast } from "../../../../../../types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const getDetail = async () => {
    const result = await customFetch({
      url: `/bar-exam-forecasts/${id}`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return (await result.data) as BarExamForecast;
  };

  const bar_exam_forecast = await getDetail();

  return (
    <PDFProtector>
      <PDFViewer
        callbackURL={`/dashboard/bar-exam-forecast/${id}`}
        file_path={`/api/bar-exam-forecast/secure-pdf/${id}`}
        id={id}
        pageSession={bar_exam_forecast?.session || null}
        subjectId={bar_exam_forecast ? bar_exam_forecast.subjectId : ""}
        enabledDownload={false}
      />
    </PDFProtector>
  );
}

import PDFProtector from "../../../../../../../components/PDFProtector";
import PDFViewer from "../../../../../../../components/PDFViewer";
import { auth } from "../../../../../../../lib/auth";
import { customFetch } from "../../../../../../../lib/helper";
import { BarQandA } from "../../../../../../../types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const getDetail = async () => {
    const result = await customFetch({
      url: `/barqas/${id}`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return (await result.data) as BarQandA;
  };

  const bar_qa = await getDetail();

  return (
    <PDFProtector>
      <PDFViewer
        callbackURL={`/dashboard/bar-qa/viewer/${id}`}
        file_path={`/api/bar-qa/secure-pdf/${id}`}
        id={id}
        pageSession={bar_qa?.session || null}
        subjectId={bar_qa ? bar_qa.subjectId : ""}
        enabledDownload={false}
      />
    </PDFProtector>
  );
}

import PDFProtector from "../../../../../../../components/PDFProtector";
import PDFViewer from "../../../../../../../components/PDFViewer";
import { auth } from "../../../../../../../lib/auth";
import { customFetch } from "../../../../../../../lib/helper";
import { Reviewer } from "../../../../../../../types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const getDetail = async () => {
    const result = await customFetch({
      url: `/reviewers/${id}`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return (await result.data) as Reviewer;
  };

  const reviewer = await getDetail();

  return (
    <PDFProtector>
      <PDFViewer
        callbackURL={`/dashboard/reviewers/viewer/${id}`}
        file_path={`/api/reviewers/secure-pdf/${id}`}
        id={id}
        subjectId={reviewer ? reviewer.subjectId : ""}
        pageSession={reviewer?.session || null}
        enabledDownload={true}
      />
    </PDFProtector>
  );
}

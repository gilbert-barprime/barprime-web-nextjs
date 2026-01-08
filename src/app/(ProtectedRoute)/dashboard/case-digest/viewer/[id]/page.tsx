import PDFProtector from "../../../../../../../components/PDFProtector";
import PDFViewer from "../../../../../../../components/PDFViewer";
import { auth } from "../../../../../../../lib/auth";
import { customFetch } from "../../../../../../../lib/helper";
import { CaseDigest } from "../../../../../../../types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  const getDetail = async () => {
    const result = await customFetch({
      url: `/case-digests/${id}`,
      method: "GET",
      auth_token: session?.user.accessToken,
    });

    if (!result) {
      return null;
    }

    return (await result.data) as CaseDigest;
  };

  const case_digest = await getDetail();

  return (
    <PDFProtector>
      <PDFViewer
        callbackURL={`/dashboard/case-digest/viewer/${id}`}
        file_path={`/api/case-digest/secure-pdf/${id}`}
        id={id}
        pageSession={case_digest?.session || null}
        subjectId={case_digest ? case_digest.subjectId : ""}
        enabledDownload={false}
      />
    </PDFProtector>
  );
}

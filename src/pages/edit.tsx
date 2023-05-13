// pages/edit.tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Editor from "../components/Editor";
import withAuth from "../utils/withAuth";
import { getPdfUrlById, saveEditedPdf } from "../services/pdfService";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const url = await getPdfUrlById(id as string);
        setFileUrl(url);
      })();
    }
  }, [id]);

  const handleEdit = async (newFileUrl: string) => {
    const response = await fetch(newFileUrl);
    const file = new File([await response.blob()], "edited.pdf", { type: "application/pdf" });
    await saveEditedPdf(id as string, file);
    setFileUrl(newFileUrl);
  };

  return (
    <div>
      {fileUrl && (
        <>
          <h1>Edit PDF Document</h1>
          <Editor fileUrl={fileUrl} onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};


export default withAuth(EditPage);

// pages/view.tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Viewer from "../components/Viewer";
import { getPdfUrlById } from "../services/pdfService";


const ViewPage = () => {
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

  return (
    <div>
      {fileUrl && (
        <>
          <h1>View PDF Document</h1>
          <Viewer fileUrl={fileUrl} />
        </>
      )}
    </div>
  );
};

export default ViewPage;

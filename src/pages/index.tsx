import styles from "../styles/Home.module.css";
import { useState } from "react";
import Upload from "../components/Upload";
import Viewer from "../components/Viewer";
import Editor from "../components/Editor";

export default function Home() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  const handleEdit = (newFileUrl: string) => {
    setFileUrl(newFileUrl);
  };

  return (
    <div>
      <Upload onUpload={handleUpload} /> 
      {fileUrl && <Viewer fileUrl={fileUrl} />} 
      {fileUrl && <Editor fileUrl={fileUrl} onEdit={handleEdit} />} 
    </div>
  );
}

import React, { ChangeEvent, useState } from "react";

interface UploadProps {
  onUpload: (file: File) => void;
  className?: string; // Add this line
}

const Upload: React.FC<UploadProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && <p>{file.name}</p>}
    </div>
  );
};

export default Upload;

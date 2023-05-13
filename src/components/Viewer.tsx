import React, { useEffect, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ViewerProps {
  fileUrl: string;
  className?: string; // Add this line
}

const Viewer: React.FC<ViewerProps> = ({ fileUrl }) => {
  return (
    <div>
      <Document file={fileUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default Viewer;

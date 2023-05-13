import React from "react";
import { PDFDocument, rgb } from "pdf-lib"; // Add rgb
import { StandardFonts } from "pdf-lib"; // Add this import

interface EditorProps {
  fileUrl: string;
  onEdit: (newFileUrl: string) => void;
  className?: string; // Add this line
}

const Editor: React.FC<EditorProps> = ({ fileUrl, onEdit }) => {
  const addText = async () => {
    const existingPdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica); // Change this line
    firstPage.drawText("New Text", { x: 50, y: 350, size: 30, font, color: rgb(0, 0, 0) });

    const pdfBytes = await pdfDoc.save();
    const newFileUrl = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }));
    onEdit(newFileUrl);
  };

  return (
    <div>
      <button onClick={addText}>Add Text</button>
    </div>
  );
};

export default Editor;

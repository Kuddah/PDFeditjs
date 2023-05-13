// server/models/PDFDocument.ts
import { Schema, model } from "mongoose";

const PDFDocumentSchema = new Schema({
  _id: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const PDFDocument = model("PDFDocument", PDFDocumentSchema);

export default PDFDocument;

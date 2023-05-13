// server/routes/pdfRoutes.ts
import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "../models/PDFDocument";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload a PDF file
router.post("/api/upload", upload.single("pdf"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Save the file to your storage system and generate a URL for it
  const fileUrl = "https://example.com/your-uploaded-file.pdf"; // Replace with your actual file URL

  const id = uuidv4();
  const pdfDocument = new PDFDocument({ _id: id, fileUrl });
  await pdfDocument.save();

  res.json({ id });
});

// Fetch a PDF file by ID
router.get("/api/pdf/:id", async (req, res) => {
  const id = req.params.id;
  const pdfDocument = await PDFDocument.findById(id);

  if (!pdfDocument) {
    return res.status(404).send("File not found.");
  }

  res.json({ url: pdfDocument.fileUrl });
});

// Save an edited PDF file
router.put("/api/pdf/:id", upload.single("pdf"), async (req, res) => {
  const id = req.params.id;
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Save the edited file to your storage system and generate a URL for it
  const fileUrl = "https://example.com/your-edited-file.pdf"; // Replace with your actual file URL

  await PDFDocument.findByIdAndUpdate(id, { fileUrl });

  res.sendStatus(204);
});

export default router;

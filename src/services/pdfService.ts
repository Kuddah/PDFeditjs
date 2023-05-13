// services/pdfService.ts
import axios from "axios";

export const uploadPdf = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("pdf", file);
  const response = await axios.post("/api/upload", formData);
  return response.data.id;
};

export const getPdfUrlById = async (id: string): Promise<string> => {
  const response = await axios.get(`/api/pdf/${id}`);
  return response.data.url;
};

export const saveEditedPdf = async (id: string, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("pdf", file);
  await axios.put(`/api/pdf/${id}`, formData);
};

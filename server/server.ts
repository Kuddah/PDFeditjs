// server/server.ts
import next from "next";
import express, { Request, Response } from "express";
import pdfRoutes from "./routes/pdfRoutes";
import authRoutes from "./routes/authRoutes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use("/api/pdf", pdfRoutes);
  server.use("/api/auth", authRoutes);

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.use((error: Error, _req: Request, res: Response, _next: any) => {
    res.status(500).json({ error: error.message });
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

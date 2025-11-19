import express from "express";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/upload", upload.single("arquivo"), (req, res) => {
  return res.json({
    message: "Upload concluído!",
    file: req.file
  });
});

export default router;

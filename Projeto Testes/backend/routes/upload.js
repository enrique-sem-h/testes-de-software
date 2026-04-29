import express from "express";
import upload from "../utils/upload.js";
import uploadController from "../controllers/uploadController.js";
import { verifyToken } from "../utils/jwtMiddleware.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("arquivo"), uploadController.uploadFile);

export default router;

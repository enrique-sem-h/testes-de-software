import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads");

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

function fileFilter(req, file, cb) {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Tipo de arquivo não permitido"), false);
  }
  cb(null, true);
}

const limits = {
  fileSize: 50 * 1024 * 1024
};

const upload = multer({ storage, fileFilter, limits });

export default upload;

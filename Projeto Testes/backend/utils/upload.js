import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
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
  fileSize: 2 * 1024 * 1024
};

const upload = multer({ storage, fileFilter, limits });

export default upload;

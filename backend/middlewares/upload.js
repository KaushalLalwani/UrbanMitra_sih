// backend/middlewares/upload.js
import multer from 'multer';
import { storage } from '../utils/cloudinary.js';

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

export default upload;

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// 🔐 Configure cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 📦 Create a Cloudinary storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'civic_issues',
    allowedFormats: ['jpg', 'png', 'jpeg'], // ✅ FIXED: camelCase key
  },
});

export { cloudinary, storage };

// backend/models/Issue.js
import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    location: String,   // user-entered text
    address: String,    // reverse-geocoded full address
    latitude: Number,
    longitude: Number,
    image: String,      // cloudinary url
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;

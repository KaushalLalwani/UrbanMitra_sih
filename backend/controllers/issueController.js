// backend/controllers/issueController.js
import Issue from '../models/Issue.js';

export const createIssue = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      address,
      latitude,
      longitude,
    } = req.body;

    // ✅ Validate required fields
    if (!title || !category) {
      return res.status(400).json({ message: "❌ Title and category are required" });
    }

    // ✅ Parse numbers safely
    const parsedLat = latitude ? parseFloat(latitude) : undefined;
    const parsedLng = longitude ? parseFloat(longitude) : undefined;

    if (latitude && isNaN(parsedLat)) {
      return res.status(400).json({ message: "❌ Invalid latitude" });
    }
    if (longitude && isNaN(parsedLng)) {
      return res.status(400).json({ message: "❌ Invalid longitude" });
    }

    // ✅ Create issue
    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      address,
      latitude: parsedLat,
      longitude: parsedLng,
      image: req.file?.path || '',
    });

    await newIssue.save();

    res.status(201).json({
      message: "✅ Issue submitted successfully",
      issue: newIssue,
    });
  } catch (err) {
    console.error("❌ Error creating issue:", err.message);
    res.status(500).json({ message: "❌ Internal Server Error", error: err.message });
  }
};

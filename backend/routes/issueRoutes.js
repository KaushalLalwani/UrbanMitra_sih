// backend/routes/issueRoutes.js
import express from 'express';
import { createIssue } from '../controllers/issueController.js';
import upload from '../middlewares/upload.js';
import Issue from '../models/Issue.js';

const router = express.Router();

// GET all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    console.error("❌ Error fetching issues:", err);
    res.status(500).json({ message: 'Failed to fetch issues' });
  }
});

// POST new issue with optional image
router.post('/', upload.single('image'), createIssue);

// DELETE issue by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Issue.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Issue not found' });
    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

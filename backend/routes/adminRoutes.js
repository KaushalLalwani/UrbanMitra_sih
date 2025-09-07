import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
  getAllIssues,
  updateIssueStatus,
  deleteIssueByAdmin
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/issues', protect, adminOnly, getAllIssues);
router.put('/issues/:id/status', protect, adminOnly, updateIssueStatus);
router.delete('/issues/:id', protect, adminOnly, deleteIssueByAdmin);

export default router;

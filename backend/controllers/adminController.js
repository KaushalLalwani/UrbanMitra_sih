import Issue from '../models/Issue.js';

// 🧾 Get All Issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch issues', error: err.message });
  }
};

// 🟢 Update Issue Status
export const updateIssueStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Issue.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Issue not found' });

    res.status(200).json({ message: 'Status updated', issue: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};

// 🗑️ Delete Issue by Admin
export const deleteIssueByAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Issue.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Issue not found' });

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete issue', error: err.message });
  }
};

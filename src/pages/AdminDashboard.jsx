import { useEffect, useState } from 'react';
import axios from 'axios';
import IssueAdminCard from '../components/IssueAdminCard';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title as ChartTitle } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {
  MdOutlineAccessTimeFilled,
  MdOutlineTrendingUp,
  MdOutlineBarChart,
} from 'react-icons/md';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartTitle);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/issues`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssues(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setError('❌ Access denied: Admins only.');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError('❌ Failed to load issues.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (updatedIssue) => {
    setIssues((prev) =>
      prev.map((i) => (i._id === updatedIssue._id ? updatedIssue : i))
    );
  };

  const handleDelete = (deletedId) => {
    setIssues((prev) => prev.filter((i) => i._id !== deletedId));
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // --- Start of Analytics Calculations ---
  
  // Total Issues
  const totalIssues = issues.length;

  // Issues by Status (for Pie Chart)
  const issuesByStatus = issues.reduce(
    (acc, issue) => {
      const status = issue.status || 'Pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );
  
  const statusPieData = {
    labels: Object.keys(issuesByStatus),
    datasets: [
      {
        data: Object.values(issuesByStatus),
        backgroundColor: ['#f87171', '#fbbf24', '#34d399'], // Red, Yellow, Green
        borderColor: ['#fca5a5', '#fcd34d', '#6ee7b7'],
        borderWidth: 1,
      },
    ],
  };

  // Issues by Category (for Bar Chart)
  const issuesByCategory = issues.reduce(
    (acc, issue) => {
      const category = issue.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );
  
  const categoryBarData = {
    labels: Object.keys(issuesByCategory),
    datasets: [
      {
        label: '# of Issues',
        data: Object.values(issuesByCategory),
        backgroundColor: '#60a5fa', // Blue
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    ],
  };

  // --- End of Analytics Calculations ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-blue-400">
          🛠️ Admin Dashboard
        </h2>

        {error && (
          <div className="bg-red-400 border border-red-500 text-red-900 px-4 py-2 rounded mb-6 text-center shadow-lg">
            {error}
          </div>
        )}

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-blue-400/50 flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Issues</p>
              <h3 className="text-4xl font-bold text-white mt-1">{totalIssues}</h3>
            </div>
            <MdOutlineBarChart size={48} className="text-blue-400" />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-blue-400/50 flex items-center justify-between">
            <div>
              <p className="text-gray-400">Pending Issues</p>
              <h3 className="text-4xl font-bold text-white mt-1">
                {issuesByStatus['Pending'] || 0}
              </h3>
            </div>
            <MdOutlineAccessTimeFilled size={48} className="text-yellow-500" />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-blue-400/50 flex items-center justify-between">
            <div>
              <p className="text-gray-400">Resolved Issues</p>
              <h3 className="text-4xl font-bold text-white mt-1">
                {issuesByStatus['Resolved'] || 0}
              </h3>
            </div>
            <MdOutlineTrendingUp size={48} className="text-green-500" />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-purple-400/50">
            <h4 className="text-xl font-bold text-center mb-4 text-purple-400">Issues by Status</h4>
            <div className="flex justify-center h-64 md:h-80">
              <Pie data={statusPieData} />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-purple-400/50">
            <h4 className="text-xl font-bold text-center mb-4 text-purple-400">Issues by Category</h4>
            <div className="h-64 md:h-80">
              <Bar data={categoryBarData} />
            </div>
          </div>
        </div>

        {/* Issue Cards Section */}
        <div className="mt-8">
          <h3 className="text-3xl font-bold text-center mb-6 text-blue-400">
            Current Issues
          </h3>
          {issues.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No issues to manage.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue) => (
                <IssueAdminCard
                  key={issue._id}
                  issue={issue}
                  token={token}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
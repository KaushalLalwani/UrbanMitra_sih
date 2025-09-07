import { useEffect, useState } from 'react';
import { getIssues } from '../api/issueApi';
import IssueCard from '../components/IssueCard';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const systemCategories = ['Garbage', 'Water', 'Streetlight', 'Pothole'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getIssues();
        setIssues(res.data);
        setFilteredIssues(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch issues:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.category.toLowerCase().includes(query);

      const isSystemCategory = systemCategories.includes(issue.category);
      const matchesCategory =
        categoryFilter === 'All'
          ? true
          : categoryFilter === 'Other'
          ? !isSystemCategory
          : issue.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    setFilteredIssues(filtered);
  }, [searchQuery, categoryFilter, issues]);

  const handleDelete = (deletedId) => {
    const updated = issues.filter((i) => i._id !== deletedId);
    setIssues(updated);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
        📋 Reported Issues
      </h2>

      {/* 🔍 Search + Category Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search issues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-md border border-cyan-400 bg-[#1e293b] text-white placeholder-cyan-300 focus:outline-none focus:bg-white focus:text-black transition cursor-pointer"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-md border border-cyan-400 bg-[#1e293b] text-white cursor-pointer focus:outline-none focus:bg-white focus:text-black transition"
        >
          <option value="All">🌐 All Categories</option>
          <option value="Garbage">🗑️ Garbage</option>
          <option value="Water">💧 Water</option>
          <option value="Streetlight">💡 Streetlight</option>
          <option value="Pothole">🕳️ Pothole</option>
          <option value="Other">🔧 Other</option>
        </select>
      </div>

      {/* 🧾 Issue Cards */}
      {filteredIssues.length === 0 ? (
        <p className="text-center text-gray-400">No issues found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueList;

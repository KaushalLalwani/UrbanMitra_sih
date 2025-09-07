import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ✅ Set up base API instance using VITE_API_BASE_URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const IssueAdminCard = ({ issue, token, onStatusUpdate, onDelete }) => {
  const [status, setStatus] = useState(issue.status || 'Pending');
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fullscreenMap, setFullscreenMap] = useState(false);

  useEffect(() => {
    if (fullscreenMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [fullscreenMap]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setUpdating(true);

    try {
      const res = await API.put(
        `/admin/issues/${issue._id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`✅ Status updated to "${newStatus}"`);
      onStatusUpdate(res.data.issue);
    } catch (err) {
      toast.error('❌ Failed to update status');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('🗑️ Delete this issue permanently?')) return;
    setDeleting(true);

    try {
      await API.delete(`/admin/issues/${issue._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('🗑️ Issue deleted successfully');
      onDelete(issue._id);
    } catch (err) {
      toast.error('❌ Failed to delete issue');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-[#1a1f2b] text-white shadow-lg rounded p-4 space-y-2 border relative z-10">
        <h3 className="text-lg font-semibold">{issue.title}</h3>
        <p className="text-sm text-gray-400">{issue.description}</p>
        <p className="text-sm">📍 {issue.location}</p>
        <p className="text-sm">📁 {issue.category}</p>

        {issue.image && (
          <img
            src={issue.image}
            alt="Issue"
            className="w-full h-40 object-cover rounded"
          />
        )}

        {/* 🗺️ Mini Map Preview */}
        {issue.latitude && issue.longitude && (
          <div
            className="h-40 mt-2 cursor-pointer rounded overflow-hidden border-2 border-blue-500"
            onClick={() => setFullscreenMap(true)}
            title="Click to view full map"
          >
            <MapContainer
              center={[issue.latitude, issue.longitude]}
              zoom={13}
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[issue.latitude, issue.longitude]} />
            </MapContainer>
          </div>
        )}

        {/* 🔄 Status & Delete Controls */}
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mt-2">
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded p-1 text-sm bg-gray-700 text-white" // <-- Corrected classes
            disabled={updating}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:underline"
            disabled={deleting}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Fullscreen Map */}
      {fullscreenMap && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[9999] flex items-center justify-center">
          <div className="relative w-full max-w-3xl h-[80vh] rounded shadow overflow-hidden">
            <MapContainer
              center={[issue.latitude, issue.longitude]}
              zoom={15}
              scrollWheelZoom={false}
              className="h-full w-full z-10 rounded"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[issue.latitude, issue.longitude]} />
            </MapContainer>

            <button
              onClick={() => setFullscreenMap(false)}
              className="absolute top-3 right-3 z-[10000] bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 shadow-lg"
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueAdminCard;

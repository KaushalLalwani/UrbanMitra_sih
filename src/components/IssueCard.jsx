import React from 'react';
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

const STATUS_STEPS = ['Pending', 'In Progress', 'Resolved'];

const IssueCard = ({ issue }) => {
  const {
    title,
    description,
    category,
    location,
    image,
    latitude,
    longitude,
    status = 'Pending',
    createdAt,
  } = issue;

  const getStepClass = (step) => {
    const stepIndex = STATUS_STEPS.indexOf(step);
    const statusIndex = STATUS_STEPS.indexOf(status);

    if (stepIndex < statusIndex) {
      return 'bg-green-500 text-white';
    }
    if (stepIndex === statusIndex) {
      return 'bg-cyan-400 text-black border-4 border-cyan-300 shadow-xl scale-110 z-10';
    }
    return 'bg-gray-500 text-white';
  };

  return (
    <div
      className="rounded-xl shadow-lg p-4 space-y-4 flex flex-col text-white bg-[#1a1f2b] border border-cyan-400 hover:shadow-cyan-500/40 transition duration-300"
      style={{
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
      }}
    >
      <h3 className="text-2xl font-bold text-cyan-400">📍 {title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <p className="text-sm text-purple-400 font-medium">📂 {category}</p>
      <p className="text-sm text-cyan-300">🗺️ Location: {location}</p>

      {image && (
        <img
          src={image}
          alt="Issue"
          className="w-full h-48 object-cover rounded border border-cyan-600"
        />
      )}

      {latitude && longitude && (
        <div className="h-40 rounded overflow-hidden border border-cyan-500">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            className="h-full w-full"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} />
          </MapContainer>
        </div>
      )}

      {/* 🟢 Status Timeline */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2 text-cyan-300">Status Progress:</h4>
        <div className="relative flex justify-between items-center px-4">
          <div className="absolute top-5 left-0 w-full h-1 bg-cyan-800 z-0 rounded-full"></div>

          {STATUS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center z-10 w-1/3 text-center"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${getStepClass(step)}`}
              >
                {idx + 1}
              </div>
              <span className="text-xs mt-2 text-cyan-200">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        📅 Reported: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default IssueCard;

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icons for all devices
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationSelector = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};

const MapPicker = ({ onClose, onPick, selectedLocation }) => {
  const [marker, setMarker] = useState(selectedLocation || null);

  const handleSelect = (latlng) => {
    setMarker(latlng);
    onPick(latlng);
  };

  useEffect(() => {
    // Prevent body scrolling when map is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[9999]">
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-2xl shadow-xl relative z-[10000]">
        <button
          className="absolute top-2 right-3 text-red-500 text-xl font-bold hover:text-red-700 transition"
          onClick={onClose}
        >
          ❌
        </button>
        <h2 className="text-xl font-bold mb-3 text-center text-gray-800">🗺️ Select Location</h2>
        <MapContainer
          center={[26.8467, 80.9462]} // Default to Lucknow
          zoom={13}
          className="h-80 w-full rounded"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationSelector onSelect={handleSelect} />
          {marker && <Marker position={marker} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPicker;

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import {
  GeoSearchControl,
  OpenStreetMapProvider,
} from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

// 🟢 Modern flat-style marker
const customMarker = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ---------------- Search Control ----------------
const SearchControl = ({ onSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      searchLabel: "🔍 Search location...",
      autoComplete: true,
      autoCompleteDelay: 300,
      showMarker: false,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lng, y: lat, label } = result.location;
      onSelect({ lat, lng, address: label });
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, onSelect]);

  return null;
};

// ---------------- User Location Button ----------------
const LocateControl = ({ onLocate }) => {
  const map = useMap();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          map.flyTo(coords, 15, { animate: true });
          onLocate(coords);
        },
        () => alert("⚠️ Unable to fetch location")
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-4 right-4 bg-white/70 backdrop-blur-md border border-gray-200 rounded-full shadow p-3 hover:bg-white transition z-[1000]"
    >
      📍
    </button>
  );
};

// ---------------- Location Marker ----------------
const LocationMarker = ({ position, setPosition, address, setAddress, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  useMapEvents({
    click: async (e) => {
      const coords = e.latlng;
      setPosition(coords);
      setAddress("");
      setLoading(true);

      try {
        const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
        if (!apiKey) {
          setAddress("⚠️ Missing API key");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${apiKey}`
        );
        setAddress(res.data.results?.[0]?.formatted || "Unknown Location");
      } catch {
        setAddress("❌ Failed to fetch address");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {position && (
        <>
          <Marker position={position} icon={customMarker} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-4 shadow-lg rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center z-[999] gap-3 border border-gray-200 w-[90%] max-w-lg">
            <div className="text-sm text-gray-800">
              📍 {loading ? "Fetching address..." : address}
              <br />
              ({position.lat.toFixed(4)}, {position.lng.toFixed(4)})
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl shadow"
              onClick={() =>
                onConfirm({
                  lat: position.lat,
                  lng: position.lng,
                  address,
                })
              }
            >
              ✅ Confirm
            </button>
          </div>
        </>
      )}
    </>
  );
};

// ---------------- Main Component ----------------
const LocationPicker = ({ onConfirm }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");

  return (
    <div className="relative h-[500px] rounded-2xl shadow-xl border overflow-hidden">
      <MapContainer
        center={[28.6139, 77.209]} // Default Delhi
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        {/* 🌍 Google Maps–like basemap (Carto Voyager) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> & <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />

        {/* 🔍 Search bar */}
        <SearchControl
          onSelect={({ lat, lng, address }) => {
            setPosition({ lat, lng });
            setAddress(address);
          }}
        />

        {/* 📍 User location button */}
        <LocateControl
          onLocate={(coords) => {
            setPosition(coords);
            setAddress("My Location");
          }}
        />

        {/* 📌 Marker */}
        <LocationMarker
          position={position}
          setPosition={setPosition}
          address={address}
          setAddress={setAddress}
          onConfirm={onConfirm}
        />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;

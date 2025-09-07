import { useRef, useState } from 'react';
import { createIssue } from '../api/issueApi';
import LocationPicker from './LocationPicker';

const IssueForm = () => {
  const fileInputRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    customCategory: '',
    image: null,
    location: '',
    coordinates: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const selectedCategory =
    form.category === 'Other' ? form.customCategory : form.category;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', selectedCategory);
    formData.append('location', form.location);

    if (form.coordinates) {
      formData.append('latitude', form.coordinates.lat);
      formData.append('longitude', form.coordinates.lng);
    }

    if (form.location) {
      formData.append('address', form.location);
    }

    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      const res = await createIssue(formData);
      alert('✅ Issue submitted successfully!');
      console.log('✅ Server response:', res.data);

      setForm({
        title: '',
        description: '',
        category: '',
        customCategory: '',
        image: null,
        location: '',
        coordinates: null,
      });
    } catch (err) {
      console.error('❌ Axios error', err);
      alert('❌ Failed to submit issue');
    }
  };

  return (
    <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 rounded-2xl shadow-lg text-white space-y-4 
                  bg-transparent backdrop-blur-none border border-cyan-400/60"
        style={{ boxShadow: "0 0 25px rgba(0, 255, 255, 0.3)" }}
      >


      <h2 className="text-3xl font-bold text-center text-cyan-400 mb-4">
        📝 Report an Issue
      </h2>

      <input
        name="title"
        placeholder="📌 Issue Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded bg-[#0e1522] text-white border border-gray-600 focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-cyan-400 transition"
      />

      <textarea
        name="description"
        placeholder="🧾 Describe the issue..."
        value={form.description}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-[#0e1522] text-white border border-gray-600 focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-cyan-400 transition"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded bg-[#0e1522] text-white border border-gray-600 focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-cyan-400 transition"
      >
        <option value="">Select Category</option>
        <option value="Garbage">🗑️ Garbage</option>
        <option value="Pothole">🕳️ Pothole</option>
        <option value="Streetlight">💡 Streetlight</option>
        <option value="Waterlogging">💧 Waterlogging</option>
        <option value="Other">➕ Other</option>
      </select>

      {form.category === 'Other' && (
        <input
          name="customCategory"
          placeholder="Enter custom category"
          value={form.customCategory}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-[#0e1522] text-white border border-gray-600 focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-cyan-400 transition"
        />
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-cyan-400 rounded-md p-4 cursor-pointer text-center text-cyan-300 hover:bg-[#1f273a] transition"
      >
        {form.image ? (
          <img
            src={URL.createObjectURL(form.image)}
            alt="Preview"
            className="w-full h-auto max-h-60 object-cover rounded"
          />
        ) : (
          <span>📁 Click to upload image</span>
        )}
      </div>

      <input
        name="location"
        placeholder="📍Enter the location manually (or auto-filled)"
        value={form.location}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded bg-[#0e1522] text-white border border-gray-600 focus:outline-none focus:bg-white focus:text-black focus:ring-2 focus:ring-cyan-400 transition"
      />

      <button
        type="button"
        onClick={() => setShowMap(true)}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded font-semibold transition"
      >
        📍 Pick Location on Map
      </button>

      {form.coordinates && (
        <p className="text-sm text-cyan-300 mt-1">
          ✅ Location Selected: Lat {form.coordinates.lat.toFixed(4)}, Lng{' '}
          {form.coordinates.lng.toFixed(4)}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded font-bold transition"
      >
        🚀 Submit Issue
      </button>

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
          <div className="bg-[#1f273a] rounded-lg p-4 shadow-xl w-full max-w-2xl relative border border-cyan-400">
            <button
              className="absolute top-2 right-3 text-red-400 text-xl font-bold hover:text-red-600 transition"
              onClick={() => setShowMap(false)}
            >
              ❌
            </button>
            <h2 className="text-lg font-semibold mb-2 text-center text-cyan-300">
              🗺️ Select Location
            </h2>
            <LocationPicker
              onConfirm={(loc) => {
                setForm((prev) => ({
                  ...prev,
                  coordinates: { lat: loc.lat, lng: loc.lng },
                  location: loc.address 
                    ? loc.address 
                    : `Lat: ${loc.lat.toFixed(4)}, Lng: ${loc.lng.toFixed(4)}`,
                }));
                setShowMap(false);
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default IssueForm;

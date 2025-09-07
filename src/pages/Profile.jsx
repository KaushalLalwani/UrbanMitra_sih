import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [name, setName] = useState(storedUser?.name || '');
  const [email, setEmail] = useState(storedUser?.email || '');
  const [success, setSuccess] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...storedUser, name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      '⚠️ Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/auth/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/register');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete account from server.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-10 flex justify-center items-start sm:items-center">
      <div className="w-full max-w-lg bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 space-y-6 border border-gray-700 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-cyan-400 flex items-center justify-center gap-2">
          👤 Profile
        </h2>

        {success && (
          <div className="bg-green-600 bg-opacity-20 text-green-300 border border-green-500 p-3 rounded text-sm text-center">
            ✅ Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-cyan-300">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <FaUserEdit /> Edit Profile
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleDeleteAccount}
            className="text-red-500 hover:text-red-400 transition flex items-center justify-center gap-2 mx-auto text-sm font-semibold cursor-pointer"
          >
            <FaTrashAlt /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

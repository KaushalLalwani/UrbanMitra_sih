import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "✅ Reset link sent to your email.");
        setEmail("");
      } else {
        setError(data.message || "❌ Something went wrong.");
      }
    } catch (err) {
      setError("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1628] px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-[#1a2238] text-white border border-cyan-400">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300 drop-shadow">
          🔐 Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-cyan-200">
            Enter your registered email:
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded border border-cyan-500 bg-[#0e1628] text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white focus:text-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded shadow-md transition cursor-pointer"
          >
            📧 Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-green-400 text-sm mt-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

// src/pages/ReportIssue.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import IssueForm from "../components/IssueForm";
import raiseIssueBg from "../assets/raiseissue.png"; // Background image

const ReportIssue = () => {
  return (
      <div
        className="min-h-screen text-white py-10 px-4 flex flex-col items-center bg-no-repeat bg-center bg-contain relative overflow-hidden"
        style={{ backgroundImage: `url(${raiseIssueBg})` }}
      >

      {/* ✨ Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>

      {/* 🌌 Floating Glow Orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-teal-500/30 rounded-full blur-3xl -top-20 -left-20"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl bottom-10 -right-20"
        animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* 🏷️ Heading with Animation */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          📤 Submit a Civic Issue
        </motion.h1>

        {/* 📝 Issue Form */}
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <IssueForm />
        </motion.div>

        {/* 📋 Link Button */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/issues"
            className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full shadow-lg shadow-cyan-400/40 transition transform hover:scale-105"
          >
            📋 View Submitted Issues
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportIssue;

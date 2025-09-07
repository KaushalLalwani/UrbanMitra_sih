import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import indianMap from "../assets/indianmap.png"; 
import Unity from "../assets/unity.png"; 

const Home = () => {
  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100 flex flex-col justify-center items-center px-6 py-12">

      
      {/* 🗺️ India Map on Top with Floating Animation */}
      <motion.div 
        className="relative mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <div className="absolute inset-0 bg-blue-500/30 blur-3xl rounded-full"></div>
        <motion.img
          src={indianMap}
          alt="Map of India"
          className="relative w-48 sm:w-56 md:w-72 rounded-2xl border-4 border-blue-500 shadow-lg shadow-blue-500/50"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 🌍 Heading */}
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to UrbanMitra
      </motion.h1>

      {/* 📝 Subtitle */}
      <motion.p 
        className="text-center text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Report civic issues like garbage, streetlights, water supply, and more. 
        Join hands in making your city a better place!
      </motion.p>

      {/* 🔘 Buttons with Hover 3D Effect */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.1, rotate: -3 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full shadow-lg shadow-blue-500/50 transition"
          >
            🔐 Login
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, rotate: 3 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full shadow-lg shadow-green-500/50 transition"
          >
            📝 Register
          </Link>
        </motion.div>
      </motion.div>

      <br /><br />
          {/* 📖 About Section */}
      <motion.section 
        className="w-full bg-white dark:bg-gray-900 py-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          About UrbanMitra
        </h2>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
          
          {/* Left Side - Text with Solid Background */}
          <motion.div 
            className="bg-[#a1472e] text-black p-8 flex flex-col justify-center rounded-xl shadow-lg md:w-1/3"
            whileHover={{ scale: 1.02 }}
          >
            <p className="mb-6 leading-relaxed">
              UrbanMitra is a citizen-driven platform designed to report and track
              common urban issues such as garbage collection, water supply problems,
              streetlight failures, potholes, and other civic concerns. It empowers
              residents to raise complaints easily, collaborate with their community,
              and bring issues to the attention of local authorities.
            </p>
            <p className="leading-relaxed">
              The goal of UrbanMitra is to create cleaner, safer, and more efficient
              cities by bridging the gap between citizens and municipal bodies.
            </p>
          </motion.div>

          {/* Right Side - Background Image with Centered Overlay */}
          <motion.div
            className="relative rounded-xl shadow-lg bg-cover bg-center flex items-center justify-center md:w-2/3 min-h-[300px]"
            style={{ backgroundImage: `url(${Unity})` }}
            whileHover={{ scale: 1.03, rotateY: 5 }}
          >
            <div className="bg-black/60 text-white p-6 rounded-lg max-w-lg text-center">
              <p className="leading-relaxed text-sm md:text-base">
                Together, we can build smarter, more sustainable cities. With the
                power of collaboration and active participation, UrbanMitra transforms
                the way citizens connect with municipal authorities to create lasting
                impact.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>



      {/* 📘 Footer */}
      <footer className="mt-12 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} UrbanMitra | Made with ❤️ in India
      </footer>
    </div>
  );
};

export default Home;

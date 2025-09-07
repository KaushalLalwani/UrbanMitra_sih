# 🏛️ UrbanMitra

> A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to report civic problems like potholes, garbage dumps, broken streetlights, or waterlogging — along with location, image, and category — and enables the admin to manage all issues with a visual map and status tracking system.

---

## 📌 Project Overview

Civic Issue Resolver simplifies citizen-to-government communication by providing:

- 📝 An intuitive **form** for users to report issues.
- 📍 A **Leaflet map** with a search bar and marker to **pick precise locations**.
- 🧠 **Reverse geocoding** (via OpenCage API) to convert coordinates into readable addresses.
- 🔒 **JWT-based authentication** for user and admin.
- 🛠️ An **admin dashboard** with full control: update status, view full map, and delete issues.
- 🌙 Fully styled dark theme with responsive layout using **Tailwind CSS**.
- 📧 Includes **Forgot Password** and **Profile Update/Delete** functionality.

---

## 🚀 Features

- ✅ User and Admin Registration & Secure Login
- 🗺️ Interactive Location Picker (Leaflet)
- 🔁 Real-time Status Timeline (Pending → In Progress → Resolved)
- 🔐 Protected Routes via JWT (for both user & admin)
- 📦 Image Upload via Cloudinary
- 📬 Forgot Password Flow with Email OTP
- 🧭 Reverse Geocoding using OpenCage API
- 🌙 Dark Mode Design + Mobile Responsive
- 🔐 Admin Dashboard with:
  - Map preview on each issue
  - Full-screen interactive map viewer
  - Status management
  - Delete issue

---

---

## 🌍 Live Demo

- 🖥️ Frontend: [https://civic-issue-resolver.vercel.app](https://civic-issue-resolver.vercel.app)
- 🌐 Backend API: [https://civicissue-resolver.onrender.com/api](https://civicissue-resolver.onrender.com/api)

---


## 🧰 Tech Stack

| Layer       | Technologies Used                              |
|-------------|-------------------------------------------------|
| Frontend    | React.js, Tailwind CSS, Axios, React Router     |
| Backend     | Node.js, Express.js, MongoDB, Mongoose          |
| Auth        | JSON Web Tokens (JWT), Bcrypt                   |
| File Upload | Multer, Cloudinary                              |
| Map/Geo     | Leaflet.js, OpenCage Geocoding API              |
| Mail        | Nodemailer + Gmail SMTP                         |
| UI Extras   | Vite, React Hot Toast, Icons, Animation         |

---

## 🌐 APIs Used

### 🗺️ OpenCage Geocoding API
- Used to convert selected map coordinates into a readable address.
- Integrated via Axios on frontend inside `LocationPicker.jsx`.
- API Key stored in `.env` as `VITE_OPENCAGE_API_KEY`.

### ☁️ Cloudinary Image Upload
- Used for uploading issue images from the user’s form.
- Configured via `multer-storage-cloudinary` in backend.
- Cloudinary credentials stored in `backend/.env`.

---

## 🧑‍💻 Installation

```bash
# Clone the repository
git clone https://github.com/ls1073/CivicIssue_Resolver.git
cd CivicIssue_Resolver

# Install frontend dependencies
npm install

# Move into backend and install backend dependencies
cd backend
npm install

# Start backend server (PORT 5000)
npm run dev

# Start frontend (PORT 5173)
cd ..
npm run dev
```

# Project Structure --

CivicIssue_Resolver/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── server.js
│   └── .env                ← Backend env file
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env                    ← VITE_OPENCAGE_API_KEY
├── .gitignore
├── package.json
└── README.md

---

# root .env (Vite)
VITE_OPENCAGE_API_KEY=your_opencage_api_key
VITE_API_BASE_URL=https://civicissue-resolver.onrender.com/api

# backend/.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
FRONTEND_URL=https://civic-issue-resolver.vercel.app



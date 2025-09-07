// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 🔒 Not logged in at all
  if (!user) return <Navigate to="/login" replace />;

  // 🚫 Logged in but not allowed for this role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

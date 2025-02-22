import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/Provider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <progress className="progress w-56"></progress>;
  if (user) return children;

  return <Navigate to="/signIn" state={{ from: location }} />;
};

export default PrivateRoute;
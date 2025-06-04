import { getUser } from '../utils/user';
import { Navigate } from 'react-router';

function ProtectedRoute({ children }) {
  const user = getUser();
  const isLoggedIn = user && user.isLoggedIn === true;
  return isLoggedIn ? children : <Navigate to='/login' replace />;
}

export default ProtectedRoute;

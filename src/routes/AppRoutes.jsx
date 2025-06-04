import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Video from '../pages/VideoPage';
import Registration from '../pages/Register';
import Profile from '../pages/Profile';
import Layout from '../layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import SearchResults from '../components/SearchResults';

function AppRoutes() {
  const AppRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Registration />,
        },        {
          path: 'video/:id',
          element: (
            <ProtectedRoute>
              <Video />
            </ProtectedRoute>
          ),
        },
        {
          path: 'profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        { path: 'search', element: <SearchResults /> },
      ],
    },
  ]);

  return <RouterProvider router={AppRoutes} />;
}

export default AppRoutes;

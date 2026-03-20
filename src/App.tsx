import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { UserManagement } from './pages/admin/UserManagement';
import { AddUser } from './pages/admin/AddUser';
import { UserDetail } from './pages/admin/UserDetail';
import { LocationManagement } from './pages/admin/LocationManagement';
import { AddLocation } from './pages/admin/AddLocation';
import { LocationDetail } from './pages/admin/LocationDetail';
import { ReviewManagement } from './pages/admin/ReviewManagement';
import { ReviewDetail } from './pages/admin/ReviewDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout><Outlet /></AuthLayout>}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          {/* Add other auth routes here */}
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout><Outlet /></AdminLayout>}>
          <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />
          <Route path="/admin/locations" element={<LocationManagement />} />
          <Route path="/admin/locations/add" element={<AddLocation />} />
          <Route path="/admin/locations/:id" element={<LocationDetail />} />
          <Route path="/admin/reviews" element={<ReviewManagement />} />
          <Route path="/admin/reviews/:id" element={<ReviewDetail />} />
        </Route>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { UserManagement } from './pages/admin/UserManagement';
import { UserDetail } from './pages/admin/UserDetail';
import { LocationManagement } from './pages/admin/LocationManagement';
import { LocationDetail } from './pages/admin/LocationDetail';
import { ReviewManagement } from './pages/admin/ReviewManagement';
import { ReviewDetail } from './pages/admin/ReviewDetail';

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/users" replace />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />
          <Route path="/admin/locations" element={<LocationManagement />} />
          <Route path="/admin/locations/:id" element={<LocationDetail />} />
          <Route path="/admin/reviews" element={<ReviewManagement />} />
          <Route path="/admin/reviews/:id" element={<ReviewDetail />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;

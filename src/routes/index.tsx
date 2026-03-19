import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';
import DashboardPage from '../pages/provider/Dashboard';
import LocationsPage from '../pages/provider/Locations';
import LocationEditPage from '../pages/provider/Locations/[id]';
import AddLocationPage from '../pages/provider/AddLocation';
import ProfilePage from '../pages/provider/Profile';
import OrdersPage from '../pages/provider/Orders';
import OrderDetailPage from '../pages/provider/Orders/[id]';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/locations/:id" element={<LocationEditPage />} />
      <Route path="/add-location" element={<AddLocationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Add more routes here, e.g. Admin routes, Provider routes, etc. */}
    </Routes>
  );
};

export default AppRoutes;

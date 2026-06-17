import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts can be statically imported to avoid flashing
import ProviderLayout from '../layouts/ProviderLayout/ProviderLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Auth Routes
const LoginPage = lazy(() => import('../pages/auth/Login'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPassword'));
const AuthCallback = lazy(() => import('../pages/auth/Callback'));

// Provider Routes
const DashboardPage = lazy(() => import('../pages/provider/Dashboard'));
const LocationsPage = lazy(() => import('../pages/provider/Locations'));
const LocationEditPage = lazy(() => import('../pages/provider/Locations/[id]'));
const AddLocationPage = lazy(() => import('../pages/provider/AddLocation'));
const ProfilePage = lazy(() => import('../pages/provider/Profile'));
const OrdersPage = lazy(() => import('../pages/provider/Orders'));
const OrderDetailPage = lazy(() => import('../pages/provider/Orders/[id]'));

// Admin Routes
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard').then(m => ({ default: m.AdminDashboard })));
const UserManagement = lazy(() => import('../pages/admin/UserManagement').then(m => ({ default: m.UserManagement })));
const AddUser = lazy(() => import('../pages/admin/AddUser').then(m => ({ default: m.AddUser })));
const UserDetail = lazy(() => import('../pages/admin/UserDetail').then(m => ({ default: m.UserDetail })));
const LocationManagement = lazy(() => import('../pages/admin/LocationManagement').then(m => ({ default: m.LocationManagement })));
const AddLocation = lazy(() => import('../pages/admin/AddLocation').then(m => ({ default: m.AddLocation })));
const LocationDetail = lazy(() => import('../pages/admin/LocationDetail').then(m => ({ default: m.LocationDetail })));
const ReviewManagement = lazy(() => import('../pages/admin/ReviewManagement').then(m => ({ default: m.ReviewManagement })));
const ReviewDetail = lazy(() => import('../pages/admin/ReviewDetail').then(m => ({ default: m.ReviewDetail })));
const ItineraryReviewDetail = lazy(() => import('../pages/admin/ItineraryReviewDetail').then(m => ({ default: m.ItineraryReviewDetail })));
const AlgorithmSettings = lazy(() => import('../pages/admin/AlgorithmSettings').then(m => ({ default: m.AlgorithmSettings })));
const AlgorithmRunner = lazy(() => import('../pages/admin/AlgorithmRunner').then(m => ({ default: m.AlgorithmRunner })));
const AlgorithmRunHistory = lazy(() => import('../pages/admin/AlgorithmRunHistory').then(m => ({ default: m.AlgorithmRunHistory })));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div>Loading...</div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Provider Routes */}
        <Route element={<ProviderLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:id" element={<LocationEditPage />} />
          <Route path="/add-location" element={<AddLocationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout><Outlet /></AdminLayout>}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/add" element={<AddUser />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />
          <Route path="/admin/locations" element={<LocationManagement />} />
          <Route path="/admin/locations/add" element={<AddLocation />} />
          <Route path="/admin/locations/:id" element={<LocationDetail />} />
          <Route path="/admin/reviews" element={<ReviewManagement />} />
          <Route path="/admin/reviews/:id" element={<ReviewDetail />} />
          <Route path="/admin/itinerary-reviews/:id" element={<ItineraryReviewDetail />} />
          <Route path="/admin/algorithm-settings" element={<AlgorithmSettings />} />
          <Route path="/admin/algorithm-runner" element={<AlgorithmRunner />} />
          <Route path="/admin/algorithm-history" element={<AlgorithmRunHistory />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

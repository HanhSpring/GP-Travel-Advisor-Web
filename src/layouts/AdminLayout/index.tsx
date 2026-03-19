import React from 'react';
import './AdminLayout.css';
import { LayoutDashboard, Users, MapPin, Star, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';



export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isUserActive = location.pathname.startsWith('/admin/users');
  const isLocationActive = location.pathname.startsWith('/admin/locations');
  const isReviewActive = location.pathname.startsWith('/admin/reviews');

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="brand-logo">G</span>
          </div>
          <span className="brand-name">Admin</span>
        </div>

        <div className="sidebar-menu">
          <div className="menu-group">
            <h4 className="menu-title">TỔNG QUAN</h4>
            <a href="#" className="menu-item">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>
          </div>

          <div className="menu-group">
            <h4 className="menu-title">QUẢN LÝ</h4>
            <Link to="/admin/users" className={`menu-item ${isUserActive ? 'active' : ''}`}>
              <Users size={20} />
              <span>Người dùng</span>
              {isUserActive ? <span className="active-indicator">&gt;</span> : <span className="hover-indicator">&gt;</span>}
            </Link>
            <Link to="/admin/locations" className={`menu-item ${isLocationActive ? 'active' : ''}`}>
              <MapPin size={20} />
              <span>Địa điểm</span>
              {isLocationActive ? <span className="active-indicator">&gt;</span> : <span className="hover-indicator">&gt;</span>}
            </Link>
            <Link to="/admin/reviews" className={`menu-item ${isReviewActive ? 'active' : ''}`}>
              <Star size={20} />
              <span>Đánh giá</span>
              {isReviewActive ? <span className="active-indicator">&gt;</span> : <span className="hover-indicator">&gt;</span>}
            </Link>
          </div>
        </div>

        <div className="sidebar-footer">
          <a href="#" className="menu-item logout">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </a>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

import React from 'react';
import { LayoutDashboard, Building2, ShoppingBag, Settings, LogOut, Bell, HelpCircle, Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, badge }) => (
  <NavLink 
    to={to} 
    style={({ isActive }) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      textDecoration: 'none',
      color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
      background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: '4px',
      fontWeight: isActive ? '600' : '400',
      fontSize: '14px',
    })}
  >
    <div style={{ display: 'flex' }}>{icon}</div>
    <span style={{ flex: 1 }}>{label}</span>
    {badge && (
      <span style={{ 
        background: '#f59e0b', 
        color: 'white', 
        fontSize: '11px', 
        fontWeight: '700', 
        padding: '2px 6px', 
        borderRadius: '10px',
        minWidth: '20px',
        textAlign: 'center'
      }}>
        {badge}
      </span>
    )}
  </NavLink>
);

const ProviderLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)', 
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        position: 'fixed',
        height: '100vh',
        zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
          <div style={{ background: 'white', color: '#3b82f6', padding: '6px', borderRadius: '10px', display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: '800', fontSize: '18px', lineHeight: 1 }}>Travel Portal</span>
            <span style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>Quản lý đối tác</span>
          </div>
        </div>

        {/* Menu Section */}
        <nav style={{ flex: 1 }}>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={<Building2 size={20} />} label="Danh sách địa điểm" to="/locations" />
          <SidebarItem icon={<ShoppingBag size={20} />} label="Đơn đặt món" to="/orders" badge={12} />
          <SidebarItem icon={<Settings size={20} />} label="Cài đặt" to="/settings" />
        </nav>
        
        {/* Sidebar Footer */}
        <div style={{ marginTop: 'auto', padding: '0 8px' }}>
          <button 
            style={{ 
              width: '100%',
              background: 'transparent', 
              color: 'white', 
              opacity: 0.8, 
              padding: '12px 16px', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: '12px',
              transition: 'all 0.2s',
              marginBottom: '10px'
            }} 
            onClick={() => navigate('/login')}
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingLeft: '280px', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ 
          height: '70px', 
          background: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          padding: '0 32px',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Tìm kiếm nhanh..." 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px 8px 36px', 
                  borderRadius: '10px', 
                  border: '1px solid #F1F5F9', 
                  background: '#F8FAFC',
                  fontSize: '14px',
                  outline: 'none'
                }} 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{ padding: '8px', color: '#64748b', background: 'transparent' }}><Bell size={20} /></button>
              <button style={{ padding: '8px', color: '#64748b', background: 'transparent' }}><HelpCircle size={20} /></button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '24px', borderLeft: '1px solid #F1F5F9' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Nguyễn Văn A</p>
              </div>
              <div 
                onClick={() => navigate('/profile')}
                style={{ width: '40px', height: '40px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #F1F5F9', cursor: 'pointer' }}
              >
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section style={{ padding: '32px' }}>
          {children}
        </section>
      </main>
    </div>
  );
};

export default ProviderLayout;

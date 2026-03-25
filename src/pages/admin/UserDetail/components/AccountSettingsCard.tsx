import React from 'react';
import { Settings, Lock } from 'lucide-react';
import { Badge } from '../../../../components/Badge';
import { User } from '../../../../types/user';

export const AccountSettingsCard: React.FC<{ user: User }> = ({ user }) => {
  const getStatusBadgeType = (status: string) => {
    return status === 'Hoạt động' ? 'active' : 'locked';
  };

  return (
    <div className="card form-card account-card">
      <div className="card-header">
        <Settings size={18} className="icon-muted" />
        <h3 className="card-title">Cài đặt tài khoản</h3>
      </div>

      {/* Vai trò */}
      <div className="settings-section">
        <label className="section-label">Vai trò hệ thống</label>
        <div className="role-options">
          <label className={`role-radio-btn ${user.role === 'Admin' ? 'active' : ''}`}>
            <input type="radio" name="role" defaultChecked={user.role === 'Admin'} />
            <span className="radio-circle"><span className="radio-dot"></span></span>
            <span>Admin</span>
          </label>
          <label className={`role-radio-btn ${user.role === 'Nhà cung cấp' ? 'active' : ''}`}>
            <input type="radio" name="role" defaultChecked={user.role === 'Nhà cung cấp'} />
            <span className="radio-circle"><span className="radio-dot"></span></span>
            <span>Nhà cung cấp (Partner)</span>
          </label>
          <label className={`role-radio-btn ${user.role === 'Khách du lịch' ? 'active' : ''}`}>
            <input type="radio" name="role" defaultChecked={user.role === 'Khách du lịch'} />
            <span className="radio-circle"><span className="radio-dot"></span></span>
            <span>Khách du lịch (Traveler)</span>
          </label>
        </div>
      </div>

      <div className="divider" />

      {/* Trạng thái tài khoản */}
      <div className="settings-section">
        <label className="section-label text-uppercase">TRẠNG THÁI TÀI KHOẢN</label>
        <div className="status-container">
          <Badge label={user.status.toUpperCase()} type={getStatusBadgeType(user.status)} showDot={true} />
          <button className="btn-danger w-full mt-4">
            <Lock size={16} />
            {user.status === 'Hoạt động' ? 'Khoá tài khoản' : 'Mở khoá tài khoản'}
          </button>
          <p className="danger-helper-text">
            Người dùng sẽ không thể đăng nhập cho đến khi được mở khoá.
          </p>
        </div>
      </div>
    </div>
  );
};

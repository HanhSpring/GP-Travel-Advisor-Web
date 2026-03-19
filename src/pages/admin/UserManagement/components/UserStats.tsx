import React from 'react';
import { Users, UserPlus, ShieldAlert } from 'lucide-react';
import { UserStatsInfo } from '../../../../types/user';

interface UserStatsProps {
  stats: UserStatsInfo | null;
  loading: boolean;
}

export const UserStats: React.FC<UserStatsProps> = ({ stats, loading }) => {
  if (loading || !stats) {
    return <div className="user-stats skeleton">Đang tải thống kê...</div>;
  }

  return (
    <div className="user-stats">
      <div className="stat-card">
        <div className="stat-icon bg-blue-light">
          <Users size={24} className="text-blue" />
        </div>
        <div className="stat-info">
          <span className="stat-label">Tổng người dùng</span>
          <span className="stat-value">{stats.totalUsers.toLocaleString()}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bg-green-light">
          <UserPlus size={24} className="text-green" />
        </div>
        <div className="stat-info">
          <span className="stat-label">Mới tháng này</span>
          <span className="stat-value">+{stats.newThisMonth.toLocaleString()}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon bg-orange-light">
          <ShieldAlert size={24} className="text-orange" />
        </div>
        <div className="stat-info">
          <span className="stat-label">Tài khoản Admin</span>
          <span className="stat-value">{stats.totalAdmins.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

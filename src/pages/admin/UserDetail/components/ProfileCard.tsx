import React from 'react';
import { Badge } from '../../../../components/Badge';
import { Mail } from 'lucide-react';
import { User } from '../../../../types/user';

export const ProfileCard: React.FC<{ user: User }> = ({ user }) => {
  const getRoleBadgeType = (role: string) => {
    switch(role) {
      case 'Admin': return 'admin';
      case 'Nhà cung cấp': return 'provider';
      case 'Khách du lịch': return 'tourist';
      default: return 'default';
    }
  };

  return (
    <div className="card profile-card">
      <div className="profile-card-left">
        <div className="avatar-large">
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--primary-blue)' }}>{user.avatar}</div>
          <button className="edit-avatar-btn">
            <span className="edit-icon">✎</span>
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-header">
            <h2 className="profile-name">{user.name}</h2>
            <Badge label={user.role} type={getRoleBadgeType(user.role)} />
          </div>
          <div className="profile-email-row">
            <Mail size={16} />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

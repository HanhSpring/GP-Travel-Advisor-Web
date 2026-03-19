import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailHeader } from './components/DetailHeader';
import { ProfileCard } from './components/ProfileCard';
import { PersonalInfoCard } from './components/PersonalInfoCard';
import { AccountSettingsCard } from './components/AccountSettingsCard';
import { DetailFooter } from './components/DetailFooter';
import { userAPI } from '../../../services/userAPI';
import { User } from '../../../types/user';
import './UserDetail.css';

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        const fetchedUser = await userAPI.getUserById(id);
        setUser(fetchedUser || null);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Đang tải dữ liệu người dùng...</div>;
  }

  if (!user) {
    return <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Không tìm thấy người dùng.</div>;
  }

  return (
    <div className="detail-page-container">
      <DetailHeader />
      
      <div className="detail-content-wrapper">
        <h1 className="detail-page-title">Chi tiết người dùng: {user.name}</h1>
        
        <div className="profile-section">
          <ProfileCard user={user} />
        </div>

        <div className="details-grid">
          <div className="left-column">
            <PersonalInfoCard user={user} />
          </div>
          
          <div className="right-column">
            <AccountSettingsCard user={user} />
          </div>
        </div>
      </div>
      
      <DetailFooter />
    </div>
  );
};

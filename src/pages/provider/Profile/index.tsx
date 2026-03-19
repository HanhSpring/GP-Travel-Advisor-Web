import React, { useState } from 'react';
import ProviderLayout from '../../../layouts/ProviderLayout/ProviderLayout';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { Upload } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isPasswordChangeEnabled, setIsPasswordChangeEnabled] = useState(true);

  return (
    <ProviderLayout>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '32px' }}>Thông tin cá nhân</h2>

        <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9' }}>
          <div style={{ padding: '32px' }}>
            {/* Avatar Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #F8FAFC' }}>
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&h=240&fit=crop" 
                  alt="Avatar" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Ảnh đại diện</h4>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Tải lên ảnh mới để thay đổi diện mạo hồ sơ của bạn.</p>
                <Button variant="outline" style={{ padding: '8px 16px', fontSize: '13px', borderRadius: '10px', gap: '8px' }}>
                  <Upload size={16} /> Thay đổi ảnh
                </Button>
              </div>
            </div>

            {/* Basic Info Section */}
            <div style={{ marginBottom: '48px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '24px' }}>Thông tin cơ bản</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <Input label="Họ và tên" value="Nguyễn Văn A" />
                <div style={{ opacity: 0.7 }}>
                  <Input label="Email (Không thể thay đổi)" value="nguyenvana@example.com" disabled style={{ background: '#F8FAFC' }} />
                </div>
                <Input label="Số điện thoại" value="0901234567" />
                <Input label="Căn cước công dân" value="012345678901" />
                <Input label="Ngày sinh" value="01/01/1995" />
                <Input label="Địa chỉ" value="123 Đường Lê Lợi, Quận 1, TP. HCM" />
              </div>
            </div>

            {/* Change Password Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>Đổi mật khẩu</h4>
                <div 
                  onClick={() => setIsPasswordChangeEnabled(!isPasswordChangeEnabled)}
                  style={{ 
                    width: '44px', 
                    height: '24px', 
                    background: isPasswordChangeEnabled ? '#3b82f6' : '#E2E8F0', 
                    borderRadius: '12px', 
                    position: 'relative', 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ 
                    position: 'absolute', 
                    left: isPasswordChangeEnabled ? '24px' : '4px', 
                    top: '4px', 
                    width: '16px', 
                    height: '16px', 
                    background: 'white', 
                    borderRadius: '50%',
                    transition: 'all 0.2s ease'
                  }}></div>
                </div>
              </div>

              {isPasswordChangeEnabled && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                  <Input label="Mật khẩu hiện tại" placeholder="********" type="password" />
                  <Input label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" type="password" />
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{ background: '#F8FAFC', padding: '20px 32px', display: 'flex', justifyContent: 'flex-end', gap: '16px', borderTop: '1px solid #F1F5F9' }}>
            <Button variant="outline" style={{ background: 'white', borderColor: '#E2E8F0', color: '#64748b' }}>Hủy bỏ</Button>
            <Button style={{ padding: '12px 32px' }}>Lưu thay đổi</Button>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProfilePage;

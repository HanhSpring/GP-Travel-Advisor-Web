import React from 'react';
import { User as UserIcon, Calendar } from 'lucide-react';
import { User } from '../../../../types/user';

export const PersonalInfoCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="card form-card">
      <div className="card-header">
        <UserIcon size={18} className="icon-muted" />
        <h3 className="card-title">Thông tin cá nhân</h3>
      </div>
      
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Họ và tên</label>
          <input type="text" className="input-field" defaultValue={user.name} />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="input-field" defaultValue={user.email} />
        </div>
        
        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="tel" className="input-field" defaultValue="0987 654 321" />
        </div>
        
        <div className="form-group half-width">
          <label>Ngày sinh</label>
          <div className="date-input-wrapper">
            <input type="text" className="input-field" defaultValue="01/01/1990" />
            <Calendar size={16} className="calendar-icon" />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Địa chỉ</label>
          <textarea 
            className="input-field textarea" 
            rows={3}
            defaultValue="123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM"
          />
        </div>
      </div>
    </div>
  );
};

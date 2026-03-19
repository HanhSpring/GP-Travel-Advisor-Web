import React, { useState } from 'react';
import { Info, Edit3, ChevronDown, Check, X } from 'lucide-react';
import { LocationDetailInfo } from '../../../../types/location';

interface GeneralInfoProps {
  location: LocationDetailInfo;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ location }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: location.name,
    category: location.category,
    description: location.description,
    phone: location.phone || '',
    email: location.email || '',
  });

  const handleSave = () => {
    // Implement save logic here (e.g. call an API)
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Revert form data
    setFormData({
      name: location.name,
      category: location.category,
      description: location.description,
      phone: location.phone || '',
      email: location.email || '',
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="ld-card mb-24">
      <div className="ld-card-header">
        <div className="ld-card-title-group">
          <Info size={18} className="ld-icon-primary" />
          <h3 className="ld-card-title">Thông tin chung</h3>
        </div>
        {!isEditing ? (
          <button className="ld-link-btn flex-center gap-4" onClick={() => setIsEditing(true)}>
            <Edit3 size={14} />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex-center gap-12">
            <button className="ld-link-btn flex-center gap-4 text-red" style={{ color: 'var(--danger-red)' }} onClick={handleCancel}>
              <X size={14} />
              <span>Hủy</span>
            </button>
            <button className="ld-link-btn flex-center gap-4" style={{ color: 'var(--success-green)' }} onClick={handleSave}>
              <Check size={14} />
              <span>Lưu</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="ld-form-grid">
        <div className="ld-form-group">
          <label className="ld-label">TÊN ĐỊA ĐIỂM</label>
          <input 
            type="text" 
            name="name"
            className="ld-input" 
            value={formData.name} 
            onChange={handleChange}
            readOnly={!isEditing} 
          />
        </div>
        
        <div className="ld-form-group">
          <label className="ld-label">DANH MỤC</label>
          <div className="ld-select-wrapper">
            <select 
              name="category"
              className="ld-select" 
              value={formData.category} 
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Khách sạn">Khách sạn</option>
              <option value="Nhà hàng">Nhà hàng</option>
              <option value="Cafe">Cafe</option>
              <option value="Di tích">Di tích</option>
              <option value="Giải trí">Giải trí</option>
              <option value="Ẩm thực">Ẩm thực</option>
              <option value="Mua sắm">Mua sắm</option>
              <option value="Du lịch">Du lịch</option>
              <option value="Khác">Khác</option>
            </select>
            <ChevronDown size={16} className="ld-select-icon" />
          </div>
        </div>
        
        <div className="ld-form-group full-width">
          <label className="ld-label">MÔ TẢ GIỚI THIỆU</label>
          {isEditing ? (
            <textarea 
              name="description"
              className="ld-input" 
              style={{ minHeight: '100px', resize: 'vertical' }}
              value={formData.description}
              onChange={handleChange}
            />
          ) : (
            <div className="ld-textarea-read">{formData.description}</div>
          )}
        </div>
        
        <div className="ld-form-group">
          <label className="ld-label">SỐ ĐIỆN THOẠI</label>
          <div className="ld-input-icon-wrapper">
            <span className="ld-input-icon">📞</span>
            <input 
              type="text" 
              name="phone"
              className="ld-input pl-32" 
              value={formData.phone} 
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
        </div>
        
        <div className="ld-form-group">
          <label className="ld-label">EMAIL LIÊN HỆ</label>
          <div className="ld-input-icon-wrapper">
            <span className="ld-input-icon">✉️</span>
            <input 
              type="email" 
              name="email"
              className="ld-input pl-32" 
              value={formData.email} 
              onChange={handleChange}
              readOnly={!isEditing} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

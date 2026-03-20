import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, MapPin, Clock, ChevronDown, CheckCircle2, ChevronRight } from 'lucide-react';
import './AddLocation.css';

export const AddLocation: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: 'Hà Nội',
    phone: '',
    businessTypes: [] as string[],
    openingHours: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      businessTypes: prev.businessTypes.includes(type)
        ? prev.businessTypes.filter(t => t !== type)
        : [...prev.businessTypes, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      alert('Thêm địa điểm thành công!');
      navigate('/admin/locations');
    }
  };

  const steps = [
    { number: 1, label: 'Thông tin' },
    { number: 2, label: 'Dịch vụ' },
    { number: 3, label: 'Xác nhận' }
  ];

  return (
    <div className="page-container">
      {/* Top Header */}
      <header className="page-header">
        <div className="header-titles">
          <div className="breadcrumb">
            <Link to="/admin/locations" className="text-muted">Quản lý địa điểm</Link>
            <span className="separator">/</span>
            <span className="active-bread">Thêm địa điểm</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn">
            <Bell size={20} />
          </button>
          <div className="user-avatar-small">
            <span className="avatar-text">AD</span>
          </div>
        </div>
      </header>

      <main className="add-location-content">
        <div className="content-header">
          <h1 className="content-title">Thêm địa điểm mới</h1>
          <p className="content-subtitle">
            Vui lòng điền thông tin chi tiết về địa điểm kinh doanh của bạn để bắt đầu.
          </p>
        </div>

        <div className="stepper-wrapper card">
          <div className="stepper">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
              >
                <div className="step-number">
                  {currentStep > step.number ? <CheckCircle2 size={18} /> : step.number}
                </div>
                <span className="step-label">{step.label}</span>
                {step.number < 3 && <div className="step-line"></div>}
              </div>
            ))}
          </div>

          <div className="progress-section">
            <div className="progress-text">
              <span className="text-primary-blue font-bold">TIẾN TRÌNH: BƯỚC {currentStep}</span>
              <span className="progress-percentage">{Math.round((currentStep / 3) * 100)}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form className="add-location-form" onSubmit={handleSubmit}>
            <div className="form-layout-grid">
              {/* Left Column */}
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="name">Tên địa điểm</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ví dụ: Khách sạn Marriott Hà Nội"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Địa chỉ chi tiết</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Số nhà, tên đường..."
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group flex-1">
                    <label htmlFor="city">Tỉnh / Thành</label>
                    <div className="select-wrapper">
                      <select id="city" name="city" value={formData.city} onChange={handleChange}>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                      </select>
                      <ChevronDown className="select-icon" size={18} />
                    </div>
                  </div>
                  <div className="form-group flex-1">
                    <label htmlFor="phone">SĐT Liên hệ</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="09xx xxx xxx"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label>Loại hình kinh doanh</label>
                  <div className="checkbox-grid">
                    {['Khách sạn/Lưu trú', 'Nhà hàng/Ẩm thực', 'Tour du lịch', 'Vận chuyển'].map((type) => (
                      <label key={type} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formData.businessTypes.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                        />
                        <span className="checkmark-label">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="form-column">
                <div className="form-group">
                  <label>Xác vị trí trên bản đồ</label>
                  <div className="map-placeholder">
                    <div className="map-controls">
                      <button type="button" className="map-zoom">+</button>
                      <button type="button" className="map-zoom">-</button>
                    </div>
                    <div className="map-marker">
                      <MapPin size={32} color="red" fill="rgba(255,0,0,0.2)" />
                    </div>
                    <div className="map-info">Kéo thả ghim để chọn vị trí chính xác nhất</div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="openingHours">Giờ mở cửa</label>
                  <div className="input-with-icon">
                    <Clock className="input-icon" size={18} />
                    <input
                      type="text"
                      id="openingHours"
                      name="openingHours"
                      placeholder="Ví dụ: 08:00 - 22:00"
                      value={formData.openingHours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/admin/locations')}>
                Hủy bỏ
              </button>
              <button type="submit" className="btn-continue">
                Tiếp tục <ChevronRight size={18} />
              </button>
            </div>

            <p className="policy-note">
              Bằng cách nhấn tiếp tục, bạn đồng ý với <b>Điều khoản & Chính sách</b> của Travel Portal.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

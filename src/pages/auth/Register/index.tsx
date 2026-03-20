import React, { useState } from 'react';
import './Register.css';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register submitted:', formData);
    
    // Simulate successful registration and navigate to dashboard
    navigate('/admin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="register-wrapper">
      <div className="register-header">
        <h2 className="register-title">Đăng ký đối tác mới</h2>
        <p className="register-sub">
          Vui lòng điền thông tin bên dưới để bắt đầu hợp tác.
        </p>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Họ và tên</label>
          <div className="input-container">
            <User className="input-icon" size={18} />
            <input
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên"
              className="form-input"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Số điện thoại</label>
          <div className="input-container">
            <Phone className="input-icon" size={18} />
            <input
              type="tel"
              name="phone"
              placeholder="Nhập số điện thoại"
              className="form-input"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="input-container">
            <Mail className="input-icon" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Nhập địa chỉ email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <label className="terms-checkbox">
          <input 
            type="checkbox" 
            name="agreeToTerms" 
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
          />
          <span>
            Tôi đồng ý với <Link to="/terms" className="terms-link">Điều khoản & Chính sách</Link> của Travel Partner.
          </span>
        </label>

        <button type="submit" className="btn-primary">
          Đăng ký ngay
        </button>
      </form>

      <div className="divider"><span>HOẶC</span></div>

      <div className="social-buttons">
        <button className="btn-social">
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google" 
            width={20} 
            height={20} 
          />
          Google
        </button>
        <button className="btn-social">
          <img 
            src="https://www.svgrepo.com/show/448225/facebook.svg" 
            alt="Facebook" 
            width={20} 
            height={20} 
          />
          Facebook
        </button>
      </div>

      <div className="footer-text">
        Đã có tài khoản?{' '}
        <Link to="/auth/login" className="login-link">
          Đăng nhập
        </Link>
      </div>

      <div className="register-footer-links">
        <a href="#">Trợ giúp</a>
        <a href="#">Quyền riêng tư</a>
        <a href="#">Liên hệ</a>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import './Login.css';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    
    // Simulate successful login and navigate to dashboard
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
    <div className="login-wrapper">
      <div className="login-header">
        <h2 className="login-title">Đăng nhập</h2>
        <p className="login-sub">
          Chào mừng trở lại! Vui lòng nhập thông tin để truy cập hệ thống quản lý.
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email hoặc Số điện thoại</label>
          <div className="input-container">
            <Mail className="input-icon" size={20} />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@travel.com"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Mật khẩu</label>
          <div className="input-container">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="••••••••"
              className="form-input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div 
              className="input-eye" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input 
              type="checkbox" 
              name="rememberMe" 
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            Ghi nhớ đăng nhập
          </label>
          <Link to="/auth/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </Link>
        </div>

        <button type="submit" className="btn-primary">
          Đăng nhập ngay
        </button>
      </form>

      <div className="divider"><span>Hoặc tiếp tục với</span></div>

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
            src="https://www.svgrepo.com/show/448234/linkedin.svg" 
            alt="LinkedIn" 
            width={20} 
            height={20} 
          />
          LinkedIn
        </button>
      </div>

      <div className="footer-text">
        Chưa có tài khoản dành cho đối tác?{' '}
        <Link to="/auth/register" className="register-link">
          Đăng ký tài khoản mới
        </Link>
      </div>
    </div>
  );
};

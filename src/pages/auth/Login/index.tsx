import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { Mail, Lock, Eye, EyeOff, Chrome, Linkedin } from 'lucide-react';
import loginBg from '../../../assets/login-bg.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Authentication logic would go here
    // Redirect to dashboard on success
    navigate('/dashboard');
  };

  return (
    <AuthLayout bgImage={loginBg}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)' }}>
          Đăng nhập
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
          Chào mừng trở lại! Vui lòng nhập thông tin để truy cập hệ thống quản trị.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <Input 
          label="Email hoặc Số điện thoại"
          placeholder="example@travel.com"
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={<Mail size={18} />}
        />

        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Mật khẩu</label>
            <a href="#" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--secondary-blue)' }}>Quên mật khẩu?</a>
          </div>
          <Input 
            placeholder="********"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            icon={<Lock size={18} />}
            rightIcon={
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            }
            style={{ marginBottom: '0' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            id="remember" 
            checked={formData.remember}
            onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
            style={{ width: '16px', height: '16px', borderRadius: '4px' }}
          />
          <label htmlFor="remember" style={{ fontSize: '14px', color: 'var(--text-secondary)', userSelect: 'none' }}>
            Ghi nhớ đăng nhập
          </label>
        </div>

        <Button type="submit" fullWidth style={{ padding: '14px', fontSize: '16px', marginBottom: '32px' }}>
          Đăng nhập ngay
        </Button>

        <div style={{ position: 'relative', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--medium-gray)', zIndex: 0 }}></div>
          <span style={{ position: 'relative', background: 'white', padding: '0 16px', fontSize: '13px', color: 'var(--text-secondary)', zIndex: 1 }}>
            Hoặc tiếp tục với
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
          <Button variant="secondary" fullWidth style={{ fontWeight: '600' }}>
            <Chrome size={18} fill="currentColor" />
            Google
          </Button>
          <Button variant="secondary" fullWidth style={{ fontWeight: '600' }}>
            <Linkedin size={18} fill="currentColor" />
            LinkedIn
          </Button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Chưa có tài khoản dành cho đối tác? <Link to="/register" style={{ fontWeight: '700', color: 'var(--secondary-blue)' }}>Đăng ký tài khoản mới</Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { Mail, Lock, Eye, EyeOff, Chrome, Linkedin, AlertCircle } from 'lucide-react';
import loginBg from '../../../assets/login-bg.png';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Lấy Base URL từ file .env theo chuẩn của Vite
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const tokenKey = import.meta.env.VITE_TOKEN_KEY || 'access_token';

      // 2. Gọi API Login xuống Backend
      const response = await axios.post(`${apiUrl}/auth/login`, {
        emailOrPhone: formData.email,
        password: formData.password,
      });

      // 3. Lấy dữ liệu BE trả về
      const { accessToken, user } = response.data;

      // 4. Lưu Token và thông tin vào localStorage
      localStorage.setItem(tokenKey, accessToken);
      localStorage.setItem('userInfo', JSON.stringify(user));

      // 5. Kiểm tra Role để phân quyền
      if (user.role === 'BUSINESS') {
        alert('Đăng nhập thành công!');
        navigate('/dashboard');
      } else if (user.role === 'ADMIN') {
        alert('Đăng nhập thành công!');
        navigate('/admin');
      } else {
        setError('Tài khoản của bạn không có quyền truy cập trang dành cho Đối tác!');
        localStorage.removeItem(tokenKey);
        localStorage.removeItem('userInfo');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Sai email hoặc mật khẩu. Vui lòng thử lại!');
      } else {
        setError('Có lỗi xảy ra khi kết nối với máy chủ!');
        console.error('Login error:', err);
      }
    }
  };

  return (
    <AuthLayout bgImage={loginBg}>
      <div style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '32px',
            fontWeight: '800',
            marginBottom: '12px',
            color: 'var(--text-primary)',
          }}>
          Đăng nhập
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            lineHeight: '1.6',
          }}>
          Chào mừng trở lại! Vui lòng nhập thông tin để truy cập hệ thống quản trị.
        </p>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(255, 71, 71, 0.1)',
            color: '#ff4747',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 71, 71, 0.2)',
          }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-primary)',
              }}>
              Mật khẩu
            </label>
            <Link
              to="/forgot-password"
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--secondary-blue)',
              }}>
              Quên mật khẩu?
            </Link>
          </div>
          <Input
            placeholder="********"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            icon={<Lock size={18} />}
            rightIcon={<div onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</div>}
            style={{ marginBottom: '0' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            cursor: 'pointer',
          }}>
          <input
            type="checkbox"
            id="remember"
            checked={formData.remember}
            onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
            style={{ width: '16px', height: '16px', borderRadius: '4px' }}
          />
          <label
            htmlFor="remember"
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              userSelect: 'none',
            }}>
            Ghi nhớ đăng nhập
          </label>
        </div>

        <Button type="submit" fullWidth style={{ padding: '14px', fontSize: '16px', marginBottom: '32px' }}>
          Đăng nhập ngay
        </Button>

        <div
          style={{
            position: 'relative',
            marginBottom: '32px',
            textAlign: 'center',
          }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: 'var(--medium-gray)',
              zIndex: 0,
            }}></div>
          <span
            style={{
              position: 'relative',
              background: 'white',
              padding: '0 16px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              zIndex: 1,
            }}>
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

        <div
          style={{
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--text-secondary)',
          }}>
          Chưa có tài khoản dành cho đối tác?{' '}
          <Link to="/register" style={{ fontWeight: '700', color: 'var(--secondary-blue)' }}>
            Đăng ký tài khoản mới
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

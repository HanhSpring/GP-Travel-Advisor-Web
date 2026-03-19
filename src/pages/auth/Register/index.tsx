import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { User, Mail, Phone, Lock, ShieldCheck, Chrome, Facebook } from 'lucide-react';
import loginBg from '../../../assets/login-bg.png';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
    // Registration logic would go here
  };

  return (
    <AuthLayout bgImage={loginBg}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
          Đăng ký đối tác mới
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Vui lòng điền thông tin bên dưới để bắt đầu hợp tác.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <Input 
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          icon={<User size={18} />}
          style={{ marginBottom: '12px' }}
        />

        <Input 
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          icon={<Phone size={18} />}
          style={{ marginBottom: '12px' }}
        />

        <Input 
          label="Email"
          placeholder="Nhập địa chỉ email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          icon={<Mail size={18} />}
          style={{ marginBottom: '12px' }}
        />

        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1 }}>
            <Input 
              label="Mật khẩu"
              placeholder="********"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              icon={<Lock size={18} />}
              style={{ marginBottom: '0' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input 
              label="Xác nhận"
              placeholder="********"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              icon={<ShieldCheck size={18} />}
              style={{ marginBottom: '0' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <input 
            type="checkbox" 
            id="agree" 
            checked={formData.agree}
            onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
            style={{ width: '16px', height: '16px', borderRadius: '4px' }}
          />
          <label htmlFor="agree" style={{ fontSize: '13px', color: 'var(--text-secondary)', userSelect: 'none' }}>
            Tôi đồng ý với <a href="#" style={{ fontWeight: '600' }}>Điều khoản & Chính sách</a> của Travel Partner.
          </label>
        </div>

        <Button type="submit" fullWidth style={{ padding: '14px', fontSize: '16px', marginBottom: '16px' }}>
          Đăng ký ngay
        </Button>

        <div style={{ position: 'relative', margin: '8px 0 16px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--medium-gray)', zIndex: 0 }}></div>
          <span style={{ position: 'relative', background: 'white', padding: '0 16px', fontSize: '12px', color: 'var(--text-secondary)', zIndex: 1, textTransform: 'uppercase', letterSpacing: '1px' }}>
            HOẶC
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <Button variant="secondary" fullWidth style={{ fontWeight: '600', fontSize: '14px' }}>
            <Chrome size={18} fill="currentColor" />
            Google
          </Button>
          <Button variant="secondary" fullWidth style={{ fontWeight: '600', fontSize: '14px' }}>
            <Facebook size={18} fill="currentColor" />
            Facebook
          </Button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
          Đã có tài khoản? <Link to="/login" style={{ fontWeight: '700', color: 'var(--secondary-blue)' }}>Đăng nhập</Link>
        </div>

        {/* Bottom footer links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px', color: 'var(--text-secondary)', opacity: 0.7 }}>
          <a href="#" style={{ color: 'inherit' }}>Trợ giúp</a>
          <a href="#" style={{ color: 'inherit' }}>Quyền riêng tư</a>
          <a href="#" style={{ color: 'inherit' }}>Liên hệ</a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import thêm useNavigate
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { User, Mail, Phone, Lock, ShieldCheck, Chrome, Facebook } from 'lucide-react';
import loginBg from '../../../assets/login-bg.png';

// 2. Import apiClient
import apiClient from '../../../utils/apiClient';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng
  const [isLoading, setIsLoading] = useState(false); // State để disable nút khi đang gọi API

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  // 3. Nâng cấp hàm handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- BƯỚC 1: VALIDATION CƠ BẢN Ở FRONTEND ---
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      alert('Vui lòng điền đầy đủ các trường thông tin bắt buộc.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu và Xác nhận mật khẩu không khớp nhau!');
      return;
    }

    if (!formData.agree) {
      alert('Bạn phải đồng ý với các Điều khoản & Chính sách để tiếp tục.');
      return;
    }

    // --- BƯỚC 2: CHUẨN BỊ PAYLOAD VÀ GỌI API ---
    setIsLoading(true);
    try {
      // Map dữ liệu FE sang đúng định dạng mà DTO của BE yêu cầu
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        agreeToTerms: formData.agree, // Đổi tên 'agree' thành 'agreeToTerms' cho khớp BE
      };

      // Gọi API xuống Backend (Giả định endpoint của BE là /auth/register/business)
      const response = await apiClient.post('/auth/register/business', payload);

      // --- BƯỚC 3: XỬ LÝ KHI THÀNH CÔNG ---
      // response.data.message sẽ chứa câu: "Đăng ký tài khoản đối tác thành công..." từ BE trả về
      alert(response.data.message || 'Đăng ký thành công!');

      // Chuyển hướng người dùng về trang đăng nhập
      navigate('/login');
    } catch (error: any) {
      // --- BƯỚC 4: XỬ LÝ KHI CÓ LỖI ---
      // Nếu BE ném ra BadRequestException (lỗi 400), ta lấy message ra hiển thị
      if (error.response && error.response.data && error.response.data.message) {
        // Có thể BE trả về mảng các lỗi validation, hoặc chuỗi
        const errorMsg = Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message;
        alert(`Lỗi đăng ký: ${errorMsg}`);
      } else {
        alert('Có lỗi xảy ra khi kết nối với máy chủ. Vui lòng thử lại sau.');
      }
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout bgImage={loginBg}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>Đăng ký đối tác mới</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Vui lòng điền thông tin bên dưới để bắt đầu hợp tác.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* ... Toàn bộ các Input của bạn giữ nguyên ... */}
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
            Tôi đồng ý với{' '}
            <a href="#" style={{ fontWeight: '600' }}>
              Điều khoản & Chính sách
            </a>{' '}
            của Travel Partner.
          </label>
        </div>

        {/* 4. Thêm trạng thái disabled và đổi chữ khi đang load */}
        <Button type="submit" fullWidth style={{ padding: '14px', fontSize: '16px', marginBottom: '16px' }} disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Đăng ký ngay'}
        </Button>

        {/* ... Phần Footer Hoặc Đăng nhập bằng Google, Facebook giữ nguyên ... */}
        <div style={{ position: 'relative', margin: '8px 0 16px', textAlign: 'center' }}>
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
              fontSize: '12px',
              color: 'var(--text-secondary)',
              zIndex: 1,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
            HOẶC
          </span>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <Button variant="secondary" fullWidth style={{ fontWeight: '600', fontSize: '14px' }} type="button">
            <Chrome size={18} fill="currentColor" />
            Google
          </Button>
          <Button variant="secondary" fullWidth style={{ fontWeight: '600', fontSize: '14px' }} type="button">
            <Facebook size={18} fill="currentColor" />
            Facebook
          </Button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
          Đã có tài khoản?{' '}
          <Link to="/login" style={{ fontWeight: '700', color: 'var(--secondary-blue)' }}>
            Đăng nhập
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            opacity: 0.7,
          }}>
          <a href="#" style={{ color: 'inherit' }}>
            Trợ giúp
          </a>
          <a href="#" style={{ color: 'inherit' }}>
            Quyền riêng tư
          </a>
          <a href="#" style={{ color: 'inherit' }}>
            Liên hệ
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

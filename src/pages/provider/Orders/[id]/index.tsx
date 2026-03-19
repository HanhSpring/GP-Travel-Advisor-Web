import React from 'react';
import ProviderLayout from '../../../../layouts/ProviderLayout/ProviderLayout';
import Button from '../../../../components/UI/Button';
import { Mail, MapPin, CheckCircle, XCircle, Printer } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockOrders } from '../../../../mocks/orders';

const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const orderData = mockOrders.find(o => o.id === id) || mockOrders[0];

  return (
    <ProviderLayout>
      <div style={{ padding: '0 20px' }}>
        {/* Breadcrumb & Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>Đơn đặt món</span>
              <span>/</span>
              <span style={{ color: '#1e293b', fontWeight: '700' }}>#{orderData.id}</span>
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>#{orderData.id}</h2>
            <p style={{ fontSize: '15px', color: '#64748b' }}>Chi tiết đơn hàng {orderData.statusText.toLowerCase()}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#F0F9FF', borderRadius: '12px', color: orderData.status === 'confirm' ? '#3b82f6' : '#f59e0b', fontSize: '13px', fontWeight: '700' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: orderData.status === 'confirm' ? '#3b82f6' : '#f59e0b' }}></div>
            {orderData.statusText}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Left: Customer Info */}
          <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
              <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left', marginBottom: '24px' }}>Thông tin khách hàng</h5>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', border: '4px solid #F8FAFC' }}>
                <img src={orderData.customer.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' }}>{orderData.customer.name}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Số điện thoại: {orderData.customer.phone}</p>
              <span style={{ display: 'inline-block', padding: '6px 16px', background: '#EFF6FF', color: '#3b82f6', borderRadius: '20px', fontSize: '11px', fontWeight: '800', marginBottom: '32px' }}>{orderData.customer.label}</span>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', borderTop: '1px solid #F1F5F9', paddingTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                  <Mail size={16} /> {orderData.customer.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '14px' }}>
                  <MapPin size={16} /> {orderData.customer.location}
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Order Items */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #F1F5F9' }}>
               <div style={{ padding: '24px 32px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#1e293b' }}>CHI TIẾT MÓN ĐÃ ĐẶT</h5>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{orderData.items.length} món</span>
               </div>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#FCFCFD', textAlign: 'left' }}>
                      <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Tên món</th>
                      <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center' }}>Số lượng</th>
                      <th style={{ padding: '16px 32px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'right' }}>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
                        <td style={{ padding: '20px 32px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{item.name}</td>
                        <td style={{ padding: '20px 32px', fontSize: '14px', color: '#64748b', textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ padding: '20px 32px', fontSize: '14px', fontWeight: '700', color: '#1e293b', textAlign: 'right' }}>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
               <div style={{ padding: '32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px', background: '#F8FAFC' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#64748b' }}>Tổng cộng:</span>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6' }}>{orderData.total}</span>
               </div>
            </div>
          </div>

          {/* Right: Notes & Actions */}
          <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Customer Note */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #F1F5F9' }}>
               <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '16px' }}>Ghi chú của khách</h5>
               <div style={{ padding: '16px', background: '#FEFCE8', borderRadius: '16px', border: '1px solid #FEF9C3', color: '#854d0e', fontSize: '14px', fontWeight: '600', fontStyle: 'italic' }}>
                {orderData.note}
               </div>
            </div>

            {/* Actions */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Thao tác đơn hàng</h5>
               <Button fullWidth style={{ borderRadius: '12px', gap: '8px', padding: '14px' }}>
                 <CheckCircle size={18} /> Xác nhận đơn
               </Button>
               <Button variant="outline" fullWidth style={{ borderRadius: '12px', gap: '8px', padding: '14px', color: '#ef4444', borderColor: '#FEE2E2', background: 'transparent' }}>
                 <XCircle size={18} /> Hủy đơn
               </Button>
               <Button variant="ghost" fullWidth style={{ borderRadius: '12px', gap: '8px', padding: '14px', background: '#F1F5F9', color: '#1e293b' }}>
                 <Printer size={18} /> In hóa đơn
               </Button>
            </div>

            {/* Time Info */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '20px' }}>
               <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Thời gian</h5>
               <div style={{ position: 'relative', paddingLeft: '24px' }}>
                  <div style={{ position: 'absolute', left: '2px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                  <div style={{ position: 'absolute', left: '5px', top: '13px', width: '2px', height: '24px', background: '#F1F5F9' }}></div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Đã đặt lúc:</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{orderData.timeInfo.ordered}</p>
               </div>
               <div style={{ position: 'relative', paddingLeft: '24px' }}>
                  <div style={{ position: 'absolute', left: '2px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Dự kiến thời gian khách hàng đến:</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{orderData.timeInfo.expected}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default OrderDetailPage;

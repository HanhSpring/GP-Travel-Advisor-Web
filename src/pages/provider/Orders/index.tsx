import React, { useState } from 'react';
import Button from '../../../components/UI/Button';
import { ChevronRight, ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockOrders } from '../../../mocks/orders';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const orders = mockOrders;
  const pendingCount = orders.filter(o => o.status === 'confirm').length;
  const [activeTab, setActiveTab] = useState(`Chờ xác nhận (${pendingCount})`);
  const tabs = ['Tất cả', `Chờ xác nhận (${pendingCount})`, 'Đang chuẩn bị'];

  return (
    <>
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>Đơn đặt món (Nhà hàng)</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <select style={{ padding: '10px 36px 10px 16px', borderRadius: '12px', border: '1px solid #F1F5F9', background: 'white', outline: 'none', fontSize: '13px', color: '#64748b', appearance: 'none', minWidth: '180px' }}>
                <option>Tất cả nhà hàng</option>
              </select>
              <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <ChevronRight size={16} style={{ transform: 'rotate(90deg)', color: '#94a3b8' }} />
              </div>
            </div>
            <button style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid #F1F5F9', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}>
              <Bell size={20} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', marginBottom: '32px', gap: '40px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 0',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '700' : '600',
                color: activeTab === tab ? '#ef4444' : '#64748b',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #ef4444' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '-1px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Mã đơn</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Thời gian</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Khách hàng</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Món ăn</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Tổng tiền</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => navigate(`/orders/${order.id}`)}
                  style={{ 
                    borderBottom: idx < orders.length - 1 ? '1px solid #F1F5F9' : 'none', 
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '24px', color: '#3b82f6', fontWeight: '700' }}>#{order.id}</td>
                  <td style={{ padding: '24px', color: '#64748b' }}>{order.time}</td>
                  <td style={{ padding: '24px' }}>
                    <p style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{order.customer.name}</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>{order.customer.detail}</p>
                  </td>
                  <td style={{ padding: '24px', color: '#64748b', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.items.map(i => i.name).join(', ')}...
                  </td>
                  <td style={{ padding: '24px', fontWeight: '800', color: '#1e293b' }}>{order.total}</td>
                  <td style={{ padding: '24px' }}>
                    {order.status === 'confirm' ? (
                      <Button style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '8px' }}>Xác nhận</Button>
                    ) : order.status === 'completed' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '12px', fontWeight: '700' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                        Hoàn thành
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '12px', fontWeight: '700' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
                        Đang chuẩn bị
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: '20px 24px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #F1F5F9', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E2E8F0', cursor: 'not-allowed' }}>
                <ChevronLeft size={16} />
              </button>
              <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #F1F5F9', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;

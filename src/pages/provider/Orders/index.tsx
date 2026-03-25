import React, { useState } from 'react';
import ProviderLayout from '../../../layouts/ProviderLayout/ProviderLayout';
import Button from '../../../components/UI/Button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockOrders } from '../../../mocks/orders';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');
  
  const pendingCount = mockOrders.filter(o => o.status === 'confirm').length;
  const tabs = ['Tất cả', `Chờ xác nhận (${pendingCount})`, 'Đang chuẩn bị'];

  const filteredOrders = mockOrders.filter(order => {
    // Tab filtering
    if (activeTab.includes('Chờ xác nhận') && order.status !== 'confirm') return false;
    if (activeTab === 'Đang chuẩn bị' && order.status !== 'cooking') return false;
    
    // Status dropdown filtering
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;

    // Restaurant dropdown filtering
    if (restaurantFilter !== 'all' && order.restaurantName !== restaurantFilter) return false;
    
    return true;
  });

  const restaurants = Array.from(new Set(mockOrders.map(o => o.restaurantName)));

  return (
    <ProviderLayout>
      <div style={{ padding: '0 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', fontFamily: "'Times New Roman', Times, serif" }}>Đơn đặt món</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '40px' }}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '8px' }}>
            <div style={{ position: 'relative' }}>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '8px 32px 8px 12px', borderRadius: '10px', border: '1px solid #E2E8F0', background: 'white', outline: 'none', fontSize: '13px', color: '#475569', appearance: 'none', minWidth: '140px' }}
              >
                <option value="all">Mọi trạng thái</option>
                <option value="confirm">Chờ xác nhận</option>
                <option value="cooking">Đang chuẩn bị</option>
                <option value="completed">Hoàn thành</option>
              </select>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <ChevronRight size={14} style={{ transform: 'rotate(90deg)', color: '#94a3b8' }} />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <select 
                value={restaurantFilter}
                onChange={(e) => setRestaurantFilter(e.target.value)}
                style={{ padding: '8px 32px 8px 12px', borderRadius: '10px', border: '1px solid #E2E8F0', background: 'white', outline: 'none', fontSize: '13px', color: '#475569', appearance: 'none', minWidth: '160px' }}
              >
                <option value="all">Tất cả địa điểm</option>
                {restaurants.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <ChevronRight size={14} style={{ transform: 'rotate(90deg)', color: '#94a3b8' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Mã đơn</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Thời gian</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Nhà hàng</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Khách hàng</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Món ăn</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Tổng tiền</th>
                <th style={{ padding: '20px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => navigate(`/orders/${order.id}`)}
                  style={{ 
                    borderBottom: idx < filteredOrders.length - 1 ? '1px solid #F1F5F9' : 'none', 
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
                    <span style={{ fontWeight: '600', color: '#475569', fontSize: '13px' }}>{order.restaurantName}</span>
                  </td>
                  <td style={{ padding: '24px' }}>
                    <p style={{ fontWeight: '700', color: '#1e293b' }}>{order.customer.name}</p>
                  </td>
                  <td style={{ padding: '24px', color: '#64748b', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8' }}>Không có đơn hàng nào phù hợp với bộ lọc.</td>
                </tr>
              )}
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
    </ProviderLayout>
  );
};

export default OrdersPage;

import React, { useState } from 'react';
import ProviderLayout from '../../../layouts/ProviderLayout/ProviderLayout';
import { Building2, Utensils, BookOpen, Star, Plus, Edit3, MoreVertical, CheckCircle2, Clock } from 'lucide-react';
import Button from '../../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: string;
  badge?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, badge, color = '#3b82f6' }) => (
  <div style={{ 
    flex: 1, 
    background: 'white', 
    padding: '24px', 
    borderRadius: '24px', 
    display: 'flex', 
    flexDirection: 'column',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #F1F5F9',
    position: 'relative',
    minWidth: '240px'
  }}>
    {badge && (
      <span style={{ 
        position: 'absolute', 
        top: '12px', 
        right: '12px', 
        background: '#f59e0b', 
        color: 'white', 
        fontSize: '10px', 
        fontWeight: '800', 
        padding: '3px 8px', 
        borderRadius: '6px',
        textTransform: 'uppercase'
      }}>
        {badge}
      </span>
    )}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div style={{ background: `${color}10`, color: color, padding: '10px', borderRadius: '12px', display: 'flex' }}>
        {icon}
      </div>
      <span style={{ fontSize: '12px', fontWeight: '700', color: '#10B981' }}>{change}</span>
    </div>
    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '4px' }}>{label}</span>
    <span style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>{value}</span>
  </div>
);

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const allData = [
    { id: 1, name: 'Nhà hàng Biển Đông', address: '24 Trần Phú, Nha Trang', type: 'NHÀ HÀNG', status: 'Đã duyệt', rating: 4.9, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop' },
    { id: 2, name: 'Khách sạn Mường Thanh', address: '60 Võ Nguyên Giáp, Đà Nẵng', type: 'LƯU TRÚ', status: 'Đã duyệt', rating: 4.7, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop' },
    { id: 3, name: 'Dịch vụ Thuê xe máy', address: 'Quận Ngũ Hành Sơn, Đà Nẵng', type: 'THUÊ XE', status: 'Đang chờ', rating: null, img: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=100&h=100&fit=crop' },
    // Mocking second page
    { id: 4, name: 'Quán Coffee Sky', address: '12 Bạch Đằng, Đà Nẵng', type: 'NHÀ HÀNG', status: 'Đã duyệt', rating: 4.5, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop' },
    { id: 5, name: 'Resort Hòa Bình', address: 'Bãi biển Mỹ Khê, Đà Nẵng', type: 'LƯU TRÚ', status: 'Đã duyệt', rating: 4.8, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=100&h=100&fit=crop' },
  ];

  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const currentData = allData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'NHÀ HÀNG': return { background: '#DBEAFE', color: '#2563EB' };
      case 'LƯU TRÚ': return { background: '#F3E8FF', color: '#9333EA' };
      case 'THUÊ XE': return { background: '#F1F5F9', color: '#64748B' };
      default: return { background: '#E2E8F0', color: '#475569' };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Đã duyệt': return { color: '#10B981', icon: <CheckCircle2 size={16} /> };
      case 'Đang chờ': return { color: '#3B82F6', icon: <Clock size={16} /> };
      default: return { color: '#64748B', icon: <Clock size={16} /> };
    }
  };

  return (
    <ProviderLayout>
      {/* Stats Grid */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <StatCard icon={<Building2 size={24} />} label="Tổng địa điểm" value={allData.length} change="+2%" />
        <StatCard icon={<Utensils size={24} />} label="Đơn đặt món mới" value="12" change="+12%" badge="CẦN XỬ LÝ" color="#f59e0b" />
        <StatCard icon={<BookOpen size={24} />} label="Món ăn đang bán" value="45" change="+5" color="#6366f1" />
        <StatCard icon={<Star size={24} />} label="Đánh giá trung bình" value="4.8" change="★★★★★" color="#eab308" />
      </div>

      {/* Main Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' }}>Địa điểm quản lý</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Quản lý và theo dõi trạng thái các dịch vụ của bạn.</p>
        </div>
        <Button 
          onClick={() => navigate('/add-location')}
          style={{ padding: '12px 20px', fontSize: '14px', gap: '8px', borderRadius: '12px' }}
        >
          <Plus size={18} />
          Đăng ký địa điểm mới
        </Button>
      </div>

      {/* Table Section */}
      <div style={{ 
        background: 'white', 
        borderRadius: '24px', 
        padding: '8px 0', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        border: '1px solid #F1F5F9'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Tên địa điểm</th>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Loại hình</th>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Trạng thái</th>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Đánh giá</th>
              <th style={{ textAlign: 'center', padding: '20px 24px', fontSize: '12px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => {
              const statusStyle = getStatusStyle(item.status);
              const typeStyle = getTypeStyle(item.type);
              
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={item.img} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{item.name}</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.address}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '8px', 
                      fontSize: '11px', 
                      fontWeight: '800',
                      background: typeStyle.background,
                      color: typeStyle.color
                    }}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: statusStyle.color }}>
                      {statusStyle.icon}
                      {item.status}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {item.rating ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                        {item.rating}
                        <Star size={14} fill="#EAB308" color="#EAB308" />
                      </div>
                    ) : (
                      <span style={{ color: '#CBD5E1' }}>--</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      <button style={{ padding: '8px', background: 'transparent', color: '#64748b' }}><Edit3 size={18} /></button>
                      <button style={{ padding: '8px', background: 'transparent', color: '#64748b' }}><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer info & Pagination */}
        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Hiển thị {currentData.length} trên {allData.length} địa điểm
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
              style={{ 
                background: 'transparent', 
                color: page === 1 ? '#CBD5E1' : '#2563EB', 
                fontSize: '14px', 
                fontWeight: '700', 
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                transition: 'color 0.2s'
              }}
            >
              Trước
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
              style={{ 
                background: 'transparent', 
                color: page === totalPages ? '#CBD5E1' : '#2563EB', 
                fontSize: '14px', 
                fontWeight: '700', 
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                transition: 'color 0.2s'
              }}
            >
              Tiếp theo
            </button>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default DashboardPage;

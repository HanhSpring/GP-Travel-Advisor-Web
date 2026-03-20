import React from 'react';
import ProviderLayout from '../../../layouts/ProviderLayout/ProviderLayout';
import { Building2, Utensils, BookOpen, Star } from 'lucide-react';


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
    <span style={{ fontSize: '32px', fontWeight: '800', color: '#000000', fontFamily: "'Times New Roman', Times, serif" }}>{value}</span>
  </div>
);

const DashboardPage: React.FC = () => {
  const allData = [
    { id: 1, name: 'Nhà hàng Biển Đông', address: '24 Trần Phú, Nha Trang', type: 'NHÀ HÀNG', status: 'Đã duyệt', rating: 4.9, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop' },
    { id: 2, name: 'Khách sạn Mường Thanh', address: '60 Võ Nguyên Giáp, Đà Nẵng', type: 'LƯU TRÚ', status: 'Đã duyệt', rating: 4.7, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop' },
    { id: 3, name: 'Dịch vụ Thuê xe máy', address: 'Quận Ngũ Hành Sơn, Đà Nẵng', type: 'THUÊ XE', status: 'Đang chờ', rating: null, img: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=100&h=100&fit=crop' },
    // Mocking second page
    { id: 4, name: 'Quán Coffee Sky', address: '12 Bạch Đằng, Đà Nẵng', type: 'NHÀ HÀNG', status: 'Đã duyệt', rating: 4.5, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop' },
    { id: 5, name: 'Resort Hòa Bình', address: 'Bãi biển Mỹ Khê, Đà Nẵng', type: 'LƯU TRÚ', status: 'Đã duyệt', rating: 4.8, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=100&h=100&fit=crop' },
  ];

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
          <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#000000', fontFamily: "'Times New Roman', Times, serif", marginBottom: '4px' }}>Top 5 Món ăn / Dịch vụ Hot nhất</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Thống kê các dịch vụ có lượt đặt cao nhất trong tháng này.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
            <select style={{ 
                padding: '10px 16px', 
                borderRadius: '12px', 
                border: '1px solid #E2E8F0', 
                background: 'white',
                fontSize: '14px',
                fontWeight: '600',
                outline: 'none',
                color: '#1e293b',
                cursor: 'pointer'
            }}>
                <option>Tháng 03/2024</option>
                <option>Tháng 02/2024</option>
                <option>Tháng 01/2024</option>
            </select>
        </div>
      </div>

      {/* Top 5 Table Section */}
      <div style={{ 
        background: 'white', 
        borderRadius: '24px', 
        padding: '8px 0', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #F1F5F9'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '15px', color: '#000000', fontWeight: '800', fontFamily: "'Times New Roman', Times, serif" }}>Sản phẩm / Dịch vụ</th>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '15px', color: '#000000', fontWeight: '800', fontFamily: "'Times New Roman', Times, serif" }}>Địa điểm</th>
              <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: '15px', color: '#000000', fontWeight: '800', fontFamily: "'Times New Roman', Times, serif" }}>Phân loại</th>
              <th style={{ textAlign: 'center', padding: '20px 24px', fontSize: '15px', color: '#000000', fontWeight: '800', fontFamily: "'Times New Roman', Times, serif" }}>Giá bán</th>
              <th style={{ textAlign: 'center', padding: '20px 24px', fontSize: '15px', color: '#000000', fontWeight: '800', fontFamily: "'Times New Roman', Times, serif" }}>Lượt đặt tháng</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Lẩu hải sản đặc biệt', location: 'Nhà hàng Biển Đông', category: 'Món ăn', price: '350.000đ', orders: 156, rating: 4.9, img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=200&q=80' },
              { id: 2, name: 'Cua rang me', location: 'Nhà hàng Biển Đông', category: 'Món ăn', price: '450.000đ', orders: 128, rating: 4.8, img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=200&q=80' },
              { id: 3, name: 'Gỏi cá mai', location: 'Nhà hàng Biển Đông', category: 'Món ăn', price: '120.000đ', orders: 95, rating: 4.7, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80' },
              { id: 4, name: 'Tôm hùm nướng bơ tỏi', location: 'Nhà hàng Biển Đông', category: 'Món ăn', price: '850.000đ', orders: 82, rating: 5.0, img: 'https://images.unsplash.com/photo-1559742811-824289511f48?auto=format&fit=crop&w=200&q=80' },
              { id: 5, name: 'Thuê xe máy SH', location: 'Dịch vụ Thuê xe máy', category: 'Dịch vụ', price: '250.000đ', orders: 64, rating: 4.6, img: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&w=200&q=80' },
            ].sort((a, b) => b.orders - a.orders).map((item, index) => (
              <tr key={item.id} style={{ borderBottom: index === 4 ? 'none' : '1px solid #F8FAFC' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                        position: 'relative', 
                        width: '52px', 
                        height: '52px', 
                        background: '#F1F5F9', 
                        borderRadius: '14px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'visible'
                    }}>
                        <img 
                            src={item.img} 
                            alt="" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '14px', 
                                objectFit: 'cover',
                                display: 'block'
                            }} 
                        />
                        <span style={{ 
                            position: 'absolute', 
                            top: '-8px', 
                            left: '-8px', 
                            background: index === 0 ? '#F59E0B' : index === 1 ? '#94A3B8' : index === 2 ? '#B45309' : '#F1F5F9',
                            color: index < 3 ? 'white' : '#64748B',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '800',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {index + 1}
                        </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{item.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={12} fill="#EAB308" color="#EAB308" />
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>{item.location}</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    fontSize: '11px', 
                    fontWeight: '800',
                    background: item.category === 'Món ăn' ? '#DBEAFE' : '#F3E8FF',
                    color: item.category === 'Món ăn' ? '#2563EB' : '#9333EA',
                    textTransform: 'uppercase'
                  }}>
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{item.price}</span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>{item.orders}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProviderLayout>
  );
};

export default DashboardPage;

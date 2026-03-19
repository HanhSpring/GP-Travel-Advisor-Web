import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Review } from '../../../../types/review';
import { Star } from 'lucide-react';

interface ReviewTableProps {
  reviews: Review[];
  loading: boolean;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const ReviewTable: React.FC<ReviewTableProps> = ({
  reviews,
  loading,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return (
      <div className="rv-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? '#facc15' : 'none'}
            color={i < rating ? '#facc15' : '#d1d5db'}
          />
        ))}
      </div>
    );
  };

  const renderBadge = (status: string) => {
    let dotColor = '#64748b';
    let bg = '#f1f5f9';
    let text = '#64748b';

    if (status === 'Đã duyệt') {
      dotColor = '#0f766e'; bg = '#ccfbf1'; text = '#0f766e';
    } else if (status === 'Vi phạm') {
      dotColor = '#ef4444'; bg = '#fef2f2'; text = '#ef4444';
    }

    return (
      <span className="rv-badge" style={{ backgroundColor: bg, color: text }}>
        <span className="rv-badge-dot" style={{ backgroundColor: dotColor }}></span>
        {status}
      </span>
    );
  };

  const renderClassification = (classification: string) => {
    let dotColor = '#64748b';
    let bg = '#f1f5f9';
    let text = '#64748b';

    if (classification === 'Ngắn hạn') {
      dotColor = '#2563eb'; bg = '#dbeafe'; text = '#2563eb';
    } else if (classification === 'Dài hạn') {
      dotColor = '#7c3aed'; bg = '#ede9fe'; text = '#7c3aed';
    } else if (classification === 'Cần xử lý') {
      dotColor = '#b45309'; bg = '#fef3c7'; text = '#b45309';
    } else if (classification === 'Chưa phân loại') {
      dotColor = '#64748b'; bg = '#f1f5f9'; text = '#64748b';
    }

    return (
      <span className="rv-badge" style={{ backgroundColor: bg, color: text }}>
        <span className="rv-badge-dot" style={{ backgroundColor: dotColor }}></span>
        {classification}
      </span>
    );
  };

  const avatarColors = [
    { bg: '#dbeafe', text: '#2563eb' },
    { bg: '#fce7f3', text: '#be185d' },
    { bg: '#d1fae5', text: '#059669' },
    { bg: '#e0e7ff', text: '#4338ca' },
    { bg: '#fee2e2', text: '#dc2626' },
    { bg: '#fef3c7', text: '#b45309' },
    { bg: '#ede9fe', text: '#7c3aed' },
    { bg: '#ccfbf1', text: '#0d9488' },
    { bg: '#ffedd5', text: '#c2410c' },
    { bg: '#f1f5f9', text: '#475569' },
  ];

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  return (
    <div className="table-container">
      <table className="rv-table">
        <thead>
          <tr>
            <th>NGƯỜI ĐÁNH GIÁ</th>
            <th>ĐỊA ĐIỂM</th>
            <th>NỘI DUNG ĐÁNH GIÁ</th>
            <th>RATING</th>
            <th>NGÀY GỬI</th>
            <th>PHÂN LOẠI</th>
            <th>TRẠNG THÁI</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-muted">Đang tải dữ liệu...</td>
            </tr>
          ) : (
            reviews.map((review, idx) => {
              const color = avatarColors[idx % avatarColors.length];
              return (
                <tr key={review.id} className="table-row-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/reviews/${review.id}`)}>
                  <td data-label="Người dùng">
                    <div className="rv-user-cell">
                      <div className="rv-avatar" style={{ backgroundColor: color.bg, color: color.text }}>
                        {review.userAvatar}
                      </div>
                      <span className="rv-user-name">{review.userName}</span>
                    </div>
                  </td>
                  <td data-label="Địa điểm">
                    <a href="#" className="rv-location-link" onClick={(e) => e.preventDefault()}>{review.locationName}</a>
                  </td>
                  <td data-label="Nội dung">
                    <span className="rv-content-preview">{review.content}</span>
                  </td>
                  <td data-label="Đánh giá">{renderStars(review.rating)}</td>
                  <td data-label="Ngày gửi"><span className="rv-date">{review.date}</span></td>
                  <td data-label="Phân loại">{renderClassification(review.classification)}</td>
                  <td data-label="Trạng thái">{renderBadge(review.status)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-wrapper">
        <span className="pagination-info">
          Hiển thị <b>{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}</b> trong <b>{totalItems.toLocaleString()}</b> kết quả
        </span>
        <div className="pagination">
          <button
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            if (totalPages > 7) {
              if (pageNumber === 1 || pageNumber === 2 || pageNumber === 3 || pageNumber === totalPages) {
                return (
                  <button
                    key={pageNumber}
                    className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => onPageChange(pageNumber)}
                  >{pageNumber}</button>
                );
              }
              if (pageNumber === 4) return <span key={pageNumber} className="page-dots">...</span>;
              return null;
            }
            return (
              <button
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => onPageChange(pageNumber)}
              >{pageNumber}</button>
            );
          })}

          <button
            className="page-nav"
            disabled={currentPage === totalPages || totalItems === 0}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

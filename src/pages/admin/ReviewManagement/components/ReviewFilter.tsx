import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export const ReviewFilter: React.FC = () => {
  return (
    <div className="location-filter-bar">
      <div className="filter-left">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm nội dung, địa điểm..."
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-right">
        <div className="dropdown">
          <span>Phân loại (Tất cả)</span>
          <ChevronDown size={14} />
        </div>
        <div className="dropdown">
          <span>Ngày gửi (Tất cả)</span>
          <ChevronDown size={14} />
        </div>
        <div className="dropdown">
          <span>Trạng thái (Tất cả)</span>
          <ChevronDown size={14} />
        </div>
        <div className="dropdown">
          <span>Rating (Tất cả)</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Search, ChevronDown, CheckSquare } from 'lucide-react';

interface LocationFilterProps {
  selectedCount: number;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({ selectedCount }) => {
  return (
    <div className="location-filter-bar">
      <div className="filter-left">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm tên địa điểm..."
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-right">
        <button 
          className={`btn-bulk-approve ${selectedCount > 0 ? 'active' : ''}`}
          disabled={selectedCount === 0}
        >
          <CheckSquare size={16} />
          <span>Duyệt tất cả ({selectedCount})</span>
        </button>
        <div className="dropdown">
          <span>Trạng thái (Tất cả)</span>
          <ChevronDown size={14} />
        </div>

        <div className="dropdown">
          <span>Phân loại (Tất cả)</span>
          <ChevronDown size={14} />
        </div>

        <div className="dropdown">
          <span>Người đăng (Tất cả)</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
};

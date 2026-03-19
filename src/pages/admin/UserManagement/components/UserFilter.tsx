import { Search, Download, ChevronDown, Trash2 } from 'lucide-react';

interface UserFilterProps {
  selectedCount: number;
  onBulkDelete: () => void;
}

export const UserFilter: React.FC<UserFilterProps> = ({ selectedCount, onBulkDelete }) => {
  return (
    <div className="table-filter-bar">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email..."
          className="search-input"
        />
      </div>

      <div className="filter-actions">
        <button 
          className={`btn-bulk-delete ${selectedCount > 0 ? 'active' : ''}`}
          onClick={onBulkDelete}
          disabled={selectedCount === 0}
        >
          <Trash2 size={16} />
          <span>Xóa tất cả ({selectedCount})</span>
        </button>
        
        <div className="dropdown">
          <span>Tất cả vai trò</span>
          <ChevronDown size={16} />
        </div>

        <div className="dropdown">
          <span>Trạng thái</span>
          <ChevronDown size={16} />
        </div>

        <button className="btn-export">
          <Download size={16} />
          <span>Xuất</span>
        </button>
      </div>
    </div>
  );
};

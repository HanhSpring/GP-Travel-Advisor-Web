import React, { useState } from 'react';
import { Review } from '../../../../types/review';
import { Clock, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

interface ReviewActionsProps {
  status: Review['status'];
  classification: Review['classification'];
  onUpdateClassification: (newType: 'Ngắn hạn' | 'Dài hạn') => void;
  onUpdateStatus: (newStatus: Review['status']) => void;
}

/** Footer actions: Chọn phân loại & Trạng thái */
export const ReviewActions: React.FC<ReviewActionsProps> = ({ 
  status,
  classification, 
  onUpdateClassification,
  onUpdateStatus
}) => {
  const [selectedType, setSelectedType] = useState<'Ngắn hạn' | 'Dài hạn' | null>(
    (classification === 'Ngắn hạn' || classification === 'Dài hạn') ? classification : null
  );

  const handleTypeSelect = (type: 'Ngắn hạn' | 'Dài hạn') => {
    setSelectedType(type);
    onUpdateClassification(type);
  };

  return (
    <div className="rd-actions-container">
      {/* Cập nhật Trạng thái */}
      <div className="rd-classification-selector" style={{ background: '#f8fafc', borderStyle: 'solid', borderColor: 'var(--border-color)' }}>
        <p className="rd-selector-label" style={{ color: 'var(--text-secondary)' }}>Thay đổi trạng thái:</p>
        <div className="rd-selector-options">
          <button 
            className={`rd-opt-btn ${status === 'Đã duyệt' ? 'active' : ''}`}
            onClick={() => onUpdateStatus('Đã duyệt')}
          >
            <CheckCircle size={16} />
            <span>Đã duyệt</span>
          </button>
          <button 
            className={`rd-opt-btn ${status === 'Vi phạm' ? 'active' : ''}`}
            onClick={() => onUpdateStatus('Vi phạm')}
            style={status === 'Vi phạm' ? { background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)' } : {}}
          >
            <AlertTriangle size={16} />
            <span>Vi phạm</span>
          </button>
        </div>
      </div>

      {/* Cập nhật Phân loại (nếu cần) */}
      {(classification === 'Cần xử lý' || classification === 'Chưa phân loại') && (
        <div className="rd-classification-selector">
          <p className="rd-selector-label">Phân loại đánh giá:</p>
          <div className="rd-selector-options">
            <button 
              className={`rd-opt-btn ${selectedType === 'Ngắn hạn' ? 'active' : ''}`}
              onClick={() => handleTypeSelect('Ngắn hạn')}
            >
              <Clock size={16} />
              <span>Ngắn hạn</span>
            </button>
            <button 
              className={`rd-opt-btn ${selectedType === 'Dài hạn' ? 'active' : ''}`}
              onClick={() => handleTypeSelect('Dài hạn')}
            >
              <Calendar size={16} />
              <span>Dài hạn</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

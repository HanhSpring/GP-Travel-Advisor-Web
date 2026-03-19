import React, { useState } from 'react';
import { Review } from '../../../../types/review';
import { Clock, Calendar } from 'lucide-react';

interface ReviewActionsProps {
  classification: Review['classification'];
  onUpdateClassification: (newType: 'Ngắn hạn' | 'Dài hạn') => void;
}

/** Footer actions: Chọn phân loại */
export const ReviewActions: React.FC<ReviewActionsProps> = ({ 
  classification, 
  onUpdateClassification 
}) => {
  const [selectedType, setSelectedType] = useState<'Ngắn hạn' | 'Dài hạn' | null>(
    (classification === 'Ngắn hạn' || classification === 'Dài hạn') ? classification : null
  );

  const handleTypeSelect = (type: 'Ngắn hạn' | 'Dài hạn') => {
    setSelectedType(type);
    onUpdateClassification(type);
  };

  if (classification !== 'Cần xử lý') return null;

  return (
    <div className="rd-actions-container">
      <div className="rd-classification-selector">
        <p className="rd-selector-label">Đánh giá này chưa được phân loại. Vui lòng chọn:</p>
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
    </div>
  );
};

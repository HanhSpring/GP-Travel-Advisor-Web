import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { reviewAPI } from '../../../services/reviewAPI';
import { ReviewDetailInfo } from '../../../types/review';
import { ReviewHeader } from './components/ReviewHeader';
import { ReviewContent } from './components/ReviewContent';
import { ReportSection } from './components/ReportSection';
import { ReviewActions } from './components/ReviewActions';
import './ReviewDetail.css';

export const ReviewDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [review, setReview] = useState<ReviewDetailInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await reviewAPI.getReviewById(id);
        setReview(data);
      } catch (error) {
        console.error('Failed to load review detail', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  /** Đóng modal quay lại trang quản lý đánh giá */
  const handleClose = () => {
    navigate('/admin/reviews');
  };

  /** Xử lý cập nhật phân loại (ngắn hạn / dài hạn) */
  const handleUpdateClassification = (newType: 'Ngắn hạn' | 'Dài hạn') => {
    if (!review) return;
    // Cập nhật local state (mock)
    setReview({ ...review, classification: newType });
    console.log(`Cập nhật phân loại cho ${id}: ${newType}`);
  };

  return (
    <div className="rd-overlay" onClick={handleClose}>
      <div className="rd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Title */}
        <div className="rd-modal-header">
          <h2 className="rd-modal-title">Chi tiết đánh giá</h2>
          <button className="rd-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="rd-modal-body">
          {loading ? (
            <div className="rd-loading">Đang tải chi tiết đánh giá...</div>
          ) : !review ? (
            <div className="rd-loading">Không tìm thấy đánh giá.</div>
          ) : (
            <>
              <ReviewHeader review={review} />
              <ReviewContent content={review.content} images={review.images} />
              <ReportSection
                reportCount={review.reportCount}
                reportReasons={review.reportReasons}
                adminNote={review.adminNote}
              />
              <ReviewActions 
                classification={review.classification}
                onUpdateClassification={handleUpdateClassification}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

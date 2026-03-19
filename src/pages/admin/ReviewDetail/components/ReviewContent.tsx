import React from 'react';

interface ReviewContentProps {
  content: string;
  images: string[];
}

/** Hiển thị nội dung chi tiết đánh giá + hình ảnh đính kèm */
export const ReviewContent: React.FC<ReviewContentProps> = ({ content, images }) => {
  return (
    <div className="rd-content-section">
      {/* Nội dung đánh giá */}
      <div className="rd-content-box">
        <p className="rd-content-text">{content}</p>
      </div>

      {/* Hình ảnh đính kèm */}
      {images.length > 0 && (
        <div className="rd-images-section">
          <div className="rd-images-label">
            <span className="rd-images-icon">📷</span>
            <span>HÌNH ẢNH ĐÍNH KÈM ({images.length})</span>
          </div>
          <div className="rd-images-grid">
            {images.map((img, idx) => (
              <div key={idx} className="rd-image-item">
                <img src={img} alt={`Ảnh đánh giá ${idx + 1}`} className="rd-image" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

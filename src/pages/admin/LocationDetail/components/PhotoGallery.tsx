import React from 'react';
import { Expand } from 'lucide-react';

interface PhotoGalleryProps {
  photos: string[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return (
      <div className="ld-card mb-24">
        <div className="ld-card-header">
          <h3 className="ld-card-title">Thư viện ảnh</h3>
          <span className="ld-photo-count">0 ảnh</span>
        </div>
        <div className="ld-no-photo">Không có ảnh</div>
      </div>
    );
  }

  const mainPhoto = photos[0];
  const thumbPhotos = photos.slice(1, 5);
  const extraPhotosCount = photos.length > 5 ? photos.length - 5 : 0;

  return (
    <div className="ld-card mb-24">
      <div className="ld-card-header">
        <h3 className="ld-card-title">Thư viện ảnh</h3>
        <span className="ld-photo-count">{photos.length} ảnh</span>
      </div>
      
      <div className="ld-gallery">
        <div className="ld-main-photo">
          <img src={mainPhoto} alt="Main view" className="ld-img" />
          <button className="ld-expand-btn">
            <Expand size={20} />
          </button>
        </div>
        
        {thumbPhotos.length > 0 && (
          <div className="ld-thumb-grid">
            {thumbPhotos.map((photo, index) => {
              const isLast = index === 3;
              const showOverlay = isLast && extraPhotosCount > 0;
              
              return (
                <div key={index} className="ld-thumb-item">
                  <img src={photo} alt={`Thumbnail ${index + 1}`} className="ld-img" />
                  {showOverlay && (
                    <div className="ld-thumb-overlay">
                      <span>+{extraPhotosCount}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

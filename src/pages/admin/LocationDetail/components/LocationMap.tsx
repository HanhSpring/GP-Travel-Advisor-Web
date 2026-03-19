import React from 'react';
import { MapPin } from 'lucide-react';
import { LocationDetailInfo } from '../../../../types/location';

interface LocationMapProps {
  location: LocationDetailInfo;
}

export const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  return (
    <div className="ld-card">
      <div className="ld-card-header">
        <div className="ld-card-title-group">
          <MapPin size={18} className="ld-icon-danger" color="#ef4444" />
          <h3 className="ld-card-title">Vị trí & Bản đồ</h3>
        </div>
      </div>
      
      <div className="ld-form-grid">
        <div className="ld-form-group full-width">
          <label className="ld-label">ĐỊA CHỈ CHI TIẾT</label>
          <input type="text" className="ld-input" value={location.address} readOnly />
        </div>
        
        <div className="ld-form-group">
          <label className="ld-label">VĨ ĐỘ (LAT)</label>
          <input type="text" className="ld-input" value={location.lat || ''} readOnly />
        </div>
        
        <div className="ld-form-group">
          <label className="ld-label">KINH ĐỘ (LONG)</label>
          <input type="text" className="ld-input" value={location.lng || ''} readOnly />
        </div>
        
        <div className="ld-form-group full-width">
          <div className="ld-map-placeholder">
            <div className="ld-map-stripes"></div>
            <div className="ld-map-marker-box">
              <MapPin size={24} color="var(--primary-blue)" />
              <div className="ld-map-label">Bản đồ Google Maps</div>
              <div className="ld-map-coords">{location.lat}, {location.lng}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

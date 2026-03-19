import React from 'react';

import { useNavigate } from 'react-router-dom';

export const DetailFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed-footer">
      <div className="footer-actions">
        <button className="btn-ghost" onClick={() => navigate('/admin/users')}>
          Huỷ bỏ
        </button>
        <button className="btn-primary">Lưu thay đổi</button>
      </div>
    </div>
  );
};

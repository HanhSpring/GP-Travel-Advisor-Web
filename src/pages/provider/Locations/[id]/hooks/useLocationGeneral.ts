import { useState, useEffect } from 'react';
import { businessLocationAPI } from '../../../../../services/businessLocationAPI';
import { getPlaceDetail } from '../../../../../services/order.service';
import { PlaceSummary, PlaceDraft } from '../types';
import { normalizePlaceDetail, mergeWithLocationListItem } from '../utils';

export const useLocationGeneral = (id: string | undefined, vendorId: string) => {
  const [place, setPlace] = useState<PlaceSummary | null>(null);
  const [draft, setDraft] = useState<PlaceDraft>({
    name: '', address: '', city: '', district: '', openTime: '', closeTime: '', description: '', latitude: '', longitude: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [generalMessage, setGeneralMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      if (!id) {
        setError('Không tìm thấy địa điểm cần hiển thị.');
        setLoading(false);
        return;
      }
      if (!vendorId) {
        setError('Không tìm thấy thông tin business. Vui lòng đăng nhập lại.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [rawDetail, listResult] = await Promise.all([
          getPlaceDetail(id),
          businessLocationAPI.getLocations({ vendorId }, { page: 1, limit: 200 })
        ]);

        const fromList = listResult.locations.find((item) => item.id === id) || null;
        const normalized = normalizePlaceDetail(rawDetail);
        const merged = mergeWithLocationListItem(normalized, fromList);
        
        setPlace(merged.summary);
        setDraft(merged.draft);
        setIsActive(merged.summary.isActive);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tải thông tin địa điểm');
      } finally {
        setLoading(false);
      }
    };

    void fetchPlaceDetail();
  }, [id, vendorId]);

  const savedGeneralInfo = () => {
    setPlace((current) => current ? { ...current, name: draft.name || current.name } : current);
    setGeneralMessage('Đã lưu thay đổi trên giao diện.');
    window.setTimeout(() => setGeneralMessage(null), 1800);
  };

  return { place, setPlace, draft, setDraft, loading, error, isActive, setIsActive, generalMessage, savedGeneralInfo };
};

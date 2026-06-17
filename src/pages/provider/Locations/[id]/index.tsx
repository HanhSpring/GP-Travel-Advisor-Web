import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../../components/UI/Input';
import Button from '../../../../components/UI/Button';
import {
  Clock,
  MapPin,
  Upload,
  Wifi,
  Car,
  Wind,
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  Star,
  Waves,
} from 'lucide-react';

import { TabKey, ReviewSort, ServiceKind, PlaceSummary, PlaceDraft, PlaceServiceItem, ReviewSummary, ServiceEditorState } from './types';
import { useLocationGeneral } from './hooks/useLocationGeneral';
import { useLocationReviews } from './hooks/useLocationReviews';
import { useLocationServices } from './hooks/useLocationServices';

const LocationEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = localStorage.getItem('userInfo');
  const parsedUser = useMemo(() => {
    if (!userInfo) {
      return null;
    }

    try {
      return JSON.parse(userInfo);
    } catch {
      return null;
    }
  }, [userInfo]);
  const vendorCandidates = useMemo(
    () =>
      [
        parsedUser?.businessId,
        parsedUser?.business_id,
        parsedUser?.vendorId,
        parsedUser?.vendor_id,
        parsedUser?.id,
      ].filter((value): value is string => typeof value === 'string' && value.trim().length > 0),
    [parsedUser],
  );
  const vendorId = vendorCandidates[0] || '';

  const [activeTab, setActiveTab] = useState<TabKey>('Thông tin chung');

  const { place, setPlace, draft, setDraft, loading, error, isActive, setIsActive, generalMessage, savedGeneralInfo } = useLocationGeneral(id, vendorId);
  const { reviewRating, setReviewRating, reviewSort, setReviewSort, reviewHasImages, setReviewHasImages, reviewLoading, reviewError, replyingToId, setReplyingToId, locationData } = useLocationReviews(id, place?.id, vendorCandidates, activeTab);
  const { freeServices, paidServices, menuItems, setMenuItems, servicesLoading, servicesError, serviceEditor, serviceDraft, setServiceDraft, openServiceEditor, closeServiceEditor, saveService, deleteService, togglePaidService } = useLocationServices(id, place?.id, activeTab);

  const pageTitle = draft.name || place?.name || 'Đang tải...';
  const statusMeta = place
    ? { label: place.statusLabel, color: place.statusColor }
    : { label: 'Chờ duyệt', color: '#f59e0b' };

  
  
  
  
  
  
  const renderGeneralInfo = () => (
    <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      {generalMessage && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', fontSize: '14px', fontWeight: '600' }}>
          {generalMessage}
        </div>
      )}

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        <div style={{ flex: 1.2 }}>
          <Input label="Tên địa điểm" value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} />
          <Input label="Địa chỉ chi tiết" value={draft.address} onChange={(event) => setDraft((current) => ({ ...current, address: event.target.value }))} />

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Tỉnh/Thành phố"
                value={draft.city}
                onChange={(event) => setDraft((current) => ({ ...current, city: event.target.value }))}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>SĐT liên hệ</label>
              <input
                value={draft.district}
                onChange={(event) => setDraft((current) => ({ ...current, district: event.target.value }))}
                style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#fcfcfc', outline: 'none', fontSize: '15px', color: '#1e293b' }}
                placeholder="Số điện thoại liên hệ..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Giờ mở cửa"
                value={draft.openTime}
                onChange={(event) => setDraft((current) => ({ ...current, openTime: event.target.value }))}
                icon={<Clock size={16} />}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Input
                label="Giờ đóng cửa"
                value={draft.closeTime}
                onChange={(event) => setDraft((current) => ({ ...current, closeTime: event.target.value }))}
                icon={<Clock size={16} />}
                style={{ marginBottom: 0 }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>Mô tả địa điểm</label>
            <textarea
              style={{ width: '100%', minHeight: '160px', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#fcfcfc', outline: 'none', fontSize: '15px', color: '#1e293b', lineHeight: '1.6', resize: 'vertical' }}
              value={draft.description}
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              placeholder="Nhập mô tả địa điểm..."
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>Vị trí trên bản đồ</label>
          <div style={{ width: '100%', height: '240px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', position: 'relative', marginBottom: '24px' }}>
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=400&fit=crop"
              alt="Map"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', color: '#ef4444' }}>
              <MapPin size={32} fill="#ef444433" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <div style={{ flex: 1 }}>
              <Input label="Kinh độ (Latitude)" value={draft.latitude} onChange={(event) => setDraft((current) => ({ ...current, latitude: event.target.value }))} style={{ marginBottom: 0 }} />
            </div>
            <div style={{ flex: 1 }}>
              <Input label="Vĩ độ (Longitude)" value={draft.longitude} onChange={(event) => setDraft((current) => ({ ...current, longitude: event.target.value }))} style={{ marginBottom: 0 }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Hình ảnh địa điểm ({place?.gallery.length ?? 0})</label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px' }}>
              {(place?.gallery.length ? place.gallery : ['https://picsum.photos/seed/location/200/200']).map((image, index) => (
                <div key={`${image}-${index}`} style={{ aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', border: '1px solid #F1F5F9' }}>
                  <img src={image} alt={`Gallery ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              <div style={{ aspectRatio: '1', borderRadius: '12px', border: '2px dashed #E2E8F0', background: '#F8FAFC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', color: '#94a3b8' }}>
                <Upload size={20} />
                <span style={{ fontSize: '10px', fontWeight: '800' }}>TẢI LÊN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
        <span onClick={() => navigate('/locations')} style={{ color: '#64748b', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Hủy bỏ</span>
        <Button onClick={savedGeneralInfo} style={{ padding: '12px 32px', borderRadius: '12px' }}>Lưu thay đổi</Button>
      </div>
    </div>
  );

  const renderReviews = () => {
    const reviews = locationData.reviews.list;
    const displayAverageRating = locationData.reviews.average;
    const displayTotalReviews = locationData.reviews.total;
    const displayBreakdown = locationData.reviews.distribution.reduce((accumulator, item) => {
      accumulator[item.score as 1 | 2 | 3 | 4 | 5] = {
        count: 0,
        percent: item.percentage,
      };
      return accumulator;
    }, {
      5: { count: 0, percent: 0 },
      4: { count: 0, percent: 0 },
      3: { count: 0, percent: 0 },
      2: { count: 0, percent: 0 },
      1: { count: 0, percent: 0 },
    } as Record<1 | 2 | 3 | 4 | 5, { count: number; percent: number }>);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #F1F5F9', display: 'flex', gap: '48px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', paddingRight: '48px', borderRight: '1px solid #F1F5F9' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{displayAverageRating}</h1>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', color: '#fbbf24', marginBottom: '8px' }}>
              {[1, 2, 3, 4, 5].map((score) => (
                <Star key={score} size={20} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>{displayTotalReviews} đánh giá</p>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[5, 4, 3, 2, 1].map((score) => {
              const item = displayBreakdown[score as 1 | 2 | 3 | 4 | 5];
              return (
                <div key={score} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', minWidth: '12px' }}>{score}</span>
                  <div style={{ flex: 1, height: '8px', background: '#F8FAFC', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.percent}%`, background: '#3b82f6' }} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#94a3b8', minWidth: '32px' }}>{item.percent}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h5 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', marginBottom: '20px', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Bộ lọc đánh giá</h5>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={reviewRating ?? ''}
              onChange={(event) => setReviewRating(event.target.value ? Number(event.target.value) : undefined)}
              style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '13px', background: 'white' }}>
              <option value="">Tất cả sao</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>

            <Button
              variant="outline"
              onClick={() => setReviewSort('newest')}
              style={{
                borderRadius: '10px',
                fontSize: '13px',
                padding: '8px 20px',
                background: reviewSort === 'newest' ? '#EFF6FF' : 'white',
                borderColor: reviewSort === 'newest' ? '#3b82f6' : '#E2E8F0',
                color: reviewSort === 'newest' ? '#3b82f6' : '#64748b',
                fontWeight: '700',
              }}>
              Mới nhất
            </Button>
            <Button
              variant="outline"
              onClick={() => setReviewHasImages((current) => !current)}
              style={{
                borderRadius: '10px',
                fontSize: '13px',
                padding: '8px 20px',
                color: reviewHasImages ? '#3b82f6' : '#64748b',
                borderColor: reviewHasImages ? '#3b82f6' : '#E2E8F0',
                background: reviewHasImages ? '#EFF6FF' : 'white',
              }}>
              Có hình ảnh
            </Button>
          </div>
        </div>

        {reviewLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9' }}>Đang tải đánh giá...</div>
        ) : reviewError ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444', background: 'white', borderRadius: '24px', border: '1px solid #FEE2E2' }}>{reviewError}</div>
        ) : reviews.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', background: 'white', borderRadius: '24px', border: '1px solid #F1F5F9' }}>Chưa có đánh giá nào cho địa điểm này</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reviews.map((review) => (
              <div key={review.id} style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={`https://picsum.photos/seed/${review.id}/100/100`} alt="Avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' }}>{review.user}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8' }}>Đã ghé thăm ngày {review.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', color: '#fbbf24' }}>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <Star key={score} size={16} fill={score <= review.rating ? '#fbbf24' : 'none'} color="#fbbf24" />
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '20px' }}>{review.content}</p>

                {review.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {review.images.map((image, index) => (
                      <img key={`${review.id}-${index}`} src={image} alt="Review" style={{ width: '120px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {review.tags.map((tag) => (
                      <span key={`${review.id}-${tag.name}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: '#F1F5F9', color: tag.color, borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setReplyingToId((current) => (current === review.id ? null : review.id))}
                    style={{ borderRadius: '10px', fontSize: '13px', padding: '6px 20px', color: '#3b82f6', borderColor: '#EFF6FF', background: '#EFF6FF' }}>
                    {replyingToId === review.id ? 'Hủy' : 'Trả lời'}
                  </Button>
                </div>

                {replyingToId === review.id && (
                  <div style={{ marginTop: '24px', padding: '24px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '12px' }}>Nội dung phản hồi khách hàng</label>
                    <textarea
                      placeholder="Cảm ơn bạn đã phản hồi, chúng tôi sẽ sớm cải thiện..."
                      style={{ width: '100%', minHeight: '100px', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                      <Button variant="outline" onClick={() => setReplyingToId(null)} style={{ padding: '8px 20px', borderRadius: '8px', fontSize: '13px' }}>
                        Hủy bỏ
                      </Button>
                      <Button onClick={() => setReplyingToId(null)} style={{ padding: '8px 24px', borderRadius: '8px', fontSize: '13px' }}>
                        Gửi phản hồi
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderServiceEditor = (kind: ServiceKind) => {
    if (!serviceEditor || serviceEditor.kind !== kind) {
      return null;
    }

    return (
      <div style={{ marginBottom: '24px', padding: '24px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '20px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <Input
              label="Tên dịch vụ"
              value={serviceDraft.name}
              onChange={(event) => setServiceDraft((current) => ({ ...current, name: event.target.value }))}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ flex: '1 1 360px' }}>
            <Input
              label="Mô tả"
              value={serviceDraft.description}
              onChange={(event) => setServiceDraft((current) => ({ ...current, description: event.target.value }))}
              style={{ marginBottom: 0 }}
            />
          </div>
          {kind === 'paid' && (
            <div style={{ flex: '1 1 180px' }}>
              <Input
                label="Giá dịch vụ"
                value={serviceDraft.price}
                onChange={(event) => setServiceDraft((current) => ({ ...current, price: event.target.value }))}
                style={{ marginBottom: 0 }}
                placeholder="Ví dụ: 200000"
              />
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
          <Button variant="outline" onClick={closeServiceEditor}>Hủy</Button>
          <Button onClick={saveService}>Lưu</Button>
        </div>
      </div>
    );
  };

  const isRestaurant = (place?.category ?? '').toLowerCase().includes('nhà hàng') || (place?.category ?? '').toLowerCase().includes('restaurant');

  const renderServicesMenu = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Tiện ích miễn phí</h5>
          <Button variant="outline" onClick={() => openServiceEditor('free')} style={{ borderRadius: '10px', fontSize: '13px', gap: '8px', padding: '8px 16px' }}>
            <Plus size={16} /> Thêm tiện ích
          </Button>
        </div>

        {renderServiceEditor('free')}

        {servicesLoading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', background: 'white', borderRadius: '20px', border: '1px solid #F1F5F9' }}>Đang tải tiện ích...</div>
        ) : servicesError ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#ef4444', background: 'white', borderRadius: '20px', border: '1px solid #FEE2E2' }}>{servicesError}</div>
        ) : (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {freeServices.map((service) => (
              <div key={service.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155', borderRadius: '20px', fontSize: '13px', fontWeight: '600', minWidth: '220px' }}>
                <div style={{ marginTop: '2px', color: '#64748b' }}>{getServiceIcon(service.name)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                  <span>{service.name}</span>
                  {service.description && <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '400' }}>{service.description}</span>}
                </div>
                <div style={{ display: 'flex', gap: '8px', color: '#94a3b8' }}>
                  <Edit2 size={16} style={{ cursor: 'pointer' }} onClick={() => openServiceEditor('free', service)} />
                  <Trash2 size={16} style={{ cursor: 'pointer' }} onClick={() => deleteService('free', service.id)} />
                </div>
              </div>
            ))}

            <div
              onClick={() => openServiceEditor('free')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', border: '1px solid #E2E8F0', borderStyle: 'dashed', color: '#94a3b8', borderRadius: '20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', background: 'transparent' }}>
              <Plus size={16} /> <span>Thêm tiện ích</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Dịch vụ tính phí ({paidServices.length})</h5>
          <Button variant="outline" onClick={() => openServiceEditor('paid')} style={{ borderRadius: '10px', fontSize: '13px', gap: '8px', padding: '8px 16px' }}>
            <Plus size={16} /> Thêm dịch vụ
          </Button>
        </div>

        {renderServiceEditor('paid')}

        <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          {servicesLoading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Đang tải dịch vụ...</div>
          ) : paidServices.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', background: '#FCFCFD', borderBottom: '1px solid #F1F5F9' }}>
                  <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Tên dịch vụ</th>
                  <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif', textAlign: 'center' }}>Giá dịch vụ</th>
                  <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif', textAlign: 'center' }}>Trạng thái</th>
                  <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif', textAlign: 'center' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {paidServices.map((service, index) => (
                  <tr key={service.id} style={{ borderBottom: index < paidServices.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                    <td style={{ padding: '24px 32px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{service.name}</td>
                    <td style={{ padding: '24px 32px', fontSize: '15px', fontWeight: '800', color: '#3b82f6', textAlign: 'center', textDecoration: 'underline' }}>{formatPrice(service.price)}</td>
                    <td style={{ padding: '24px 32px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => togglePaidService(service.id)}
                        style={{ width: '44px', height: '24px', background: service.isActive ? '#3b82f6' : '#E2E8F0', borderRadius: '20px', position: 'relative', cursor: 'pointer', display: 'inline-block', verticalAlign: 'middle', border: 'none' }}>
                        <span style={{ position: 'absolute', right: service.isActive ? '4px' : 'auto', left: service.isActive ? 'auto' : '4px', top: '4px', width: '16px', height: '16px', background: 'white', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
                      </button>
                    </td>
                    <td style={{ padding: '24px 32px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '16px', color: '#94a3b8', justifyContent: 'center' }}>
                        <Edit2 size={18} style={{ cursor: 'pointer' }} onClick={() => openServiceEditor('paid', service)} />
                        <Trash2 size={18} style={{ cursor: 'pointer' }} onClick={() => deleteService('paid', service.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Chưa có dịch vụ tính phí nào</div>
          )}
        </div>
      </div>

      {isRestaurant && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Quản lý thực đơn món ăn ({menuItems.length})</h5>
            <Button variant="outline" onClick={() => openServiceEditor('paid')} style={{ borderRadius: '10px', fontSize: '13px', gap: '8px', padding: '8px 16px' }}>
              <Plus size={16} /> Thêm món
            </Button>
          </div>

          <div style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            {servicesLoading ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Đang tải thực đơn...</div>
            ) : menuItems.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', background: '#FCFCFD', borderBottom: '1px solid #F1F5F9' }}>
                    <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Tên món</th>
                    <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif' }}>Mô tả</th>
                    <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif', textAlign: 'center' }}>Giá</th>
                    <th style={{ padding: '20px 32px', fontSize: '15px', fontWeight: '800', color: '#000000', fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif', textAlign: 'center' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item, index) => (
                    <tr key={item.id} style={{ borderBottom: index < menuItems.length - 1 ? '1px solid #F8FAFC' : 'none' }}>
                      <td style={{ padding: '24px 32px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{item.name}</td>
                      <td style={{ padding: '24px 32px', fontSize: '14px', color: '#64748b' }}>{item.description || '—'}</td>
                      <td style={{ padding: '24px 32px', fontSize: '15px', fontWeight: '800', color: '#3b82f6', textAlign: 'center' }}>{formatPrice(item.price)}</td>
                      <td style={{ padding: '24px 32px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '16px', color: '#94a3b8', justifyContent: 'center' }}>
                          <Edit2 size={18} style={{ cursor: 'pointer' }} onClick={() => openServiceEditor('paid', item)} />
                          <Trash2 size={18} style={{ cursor: 'pointer' }} onClick={() => setMenuItems((current) => current.filter((m) => m.id !== item.id))} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Chưa có món ăn nào trong thực đơn</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Đang tải dữ liệu địa điểm...</div>
      ) : error ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>{error}</div>
      ) : (
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>
                <span style={{ cursor: 'pointer' }} onClick={() => navigate('/locations')}>Danh sách địa điểm</span>
                <span>/</span>
                <span style={{ color: '#1e293b', fontWeight: '700' }}>{pageTitle}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b' }}>{pageTitle}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: `${statusMeta.color}10`, borderRadius: '8px', color: statusMeta.color, fontSize: '12px', fontWeight: '700' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusMeta.color }} />
                  {statusMeta.label}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>
                Trạng thái: <span style={{ color: '#3b82f6' }}>{isActive ? 'Đang hoạt động' : 'Tạm ngưng'}</span>
              </span>
              <div
                onClick={() => setIsActive((current) => !current)}
                style={{ width: '44px', height: '22px', background: isActive ? '#3b82f6' : '#E2E8F0', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: '0.2s' }}>
                <div style={{ position: 'absolute', left: isActive ? '24px' : '4px', top: '3px', width: '16px', height: '16px', background: 'white', borderRadius: '50%', transition: '0.2s' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', borderBottom: '1px solid #F1F5F9' }}>
            {(['Thông tin chung', 'Đánh giá', 'Dịch vụ'] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 0',
                  fontSize: '14px',
                  fontWeight: activeTab === tab ? '700' : '600',
                  color: activeTab === tab ? '#3b82f6' : '#64748b',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: '-1px',
                }}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Dịch vụ' ? renderServicesMenu() : activeTab === 'Đánh giá' ? renderReviews() : renderGeneralInfo()}
        </div>
      )}
    </>
  );
};

export default LocationEditPage;

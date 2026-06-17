import { Review } from '../types/review';

export type BackendReviewStatus = 'pending' | 'approved' | 'violation';
export type BackendReviewClassification = 'short-term' | 'long-term' | 'need-action' | 'unclassified';
export type BackendReviewDateSent = 'all' | 'today' | 'yesterday' | 'last_7_days' | 'last_30_days';

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
};

export const formatDateTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return `${date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })} - ${date.toLocaleDateString('vi-VN')}`;
};

export const mapStatus = (status: BackendReviewStatus): Review['status'] => {
  if (status === 'approved') {
    return 'Đã duyệt';
  }
  if (status === 'violation') {
    return 'Vi phạm';
  }
  return 'Chờ duyệt';
};

export const toBackendStatus = (status: Review['status'] | string): 'approved' | 'violation' => {
  return status === 'Vi phạm' ? 'violation' : 'approved';
};

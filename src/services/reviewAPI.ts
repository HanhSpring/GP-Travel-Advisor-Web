import { apiClient } from './apiClient';
import { Review, ReviewDetailInfo, ReviewStatsInfo } from '../types/review';
import { BackendReviewStatus, BackendReviewClassification, BackendReviewDateSent, formatDateTime, getInitials, mapStatus, toBackendStatus } from './reviewShared';

export interface BackendReviewItem {
  id: string;
  reviewer_name: string;
  place_name: string;
  rating: number;
  review_content: string | null;
  main_topic: string | null;
  time_label: string | null;
  status: BackendReviewStatus;
  created_at: string;
}

export interface BackendReviewListResponse {
  data: BackendReviewItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  summary: {
    total_reviews: number;
    pending_count: number;
    approved_count: number;
    violation_count: number;
  };
}

export interface BackendReviewDetailResponse {
  id: string;
  user: {
    id: string;
    name: string;
    review_count: number;
    report_count: number;
  };
  place: {
    id: string;
    name: string;
    address: string;
  };
  rating: number;
  main_topic: string | null;
  time_label: string | null;
  review_content: string | null;
  images: Array<{ url: string }>;
  status: BackendReviewStatus;
  created_at: string;
}

export interface ReviewFilterParams {
  search?: string;
  status?: BackendReviewStatus | 'all';
  classification?: BackendReviewClassification | 'all';
  dateSent?: BackendReviewDateSent;
  dateExact?: string;
  rating?: number;
  sort?: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating';
}

const mapClassification = (
  timeLabel: string | null,
): 'Ngắn hạn' | 'Dài hạn' | 'Cần xử lý' | 'Chưa phân loại' => {
  if (timeLabel === 'short-term') {
    return 'Ngắn hạn';
  }
  if (timeLabel === 'long-term') {
    return 'Dài hạn';
  }
  if (timeLabel === 'amb') {
    return 'Cần xử lý';
  }
  return 'Chưa phân loại';
};

const mapReview = (item: BackendReviewItem): Review => ({
  id: item.id,
  userAvatar: getInitials(item.reviewer_name || 'N A'),
  userName: item.reviewer_name || 'Người dùng ẩn danh',
  locationName: item.place_name,
  content: item.review_content || '(Không có nội dung)',
  rating: item.rating,
  date: formatDateTime(item.created_at),
  status: mapStatus(item.status),
  classification: mapClassification(item.time_label),
});

const mapReviewDetail = (item: BackendReviewDetailResponse): ReviewDetailInfo => ({
  id: item.id,
  userAvatar: getInitials(item.user.name || 'N A'),
  userName: item.user.name,
  totalReviews: item.user.review_count,
  totalReports: item.user.report_count,
  locationName: item.place.name,
  locationAddress: item.place.address,
  rating: item.rating,
  datetime: formatDateTime(item.created_at),
  content: item.review_content || '(Không có nội dung)',
  images: item.images.map((image) => image.url),
  status: mapStatus(item.status),
  classification: mapClassification(item.time_label),
  reportCount: item.status === 'violation' ? Math.max(item.user.report_count, 1) : 0,
  reportReasons: item.status === 'violation' ? ['Nội dung bị đánh dấu vi phạm'] : [],
  adminNote: item.status === 'violation' ? 'Đánh giá đã được hệ thống gắn nhãn vi phạm.' : '',
});

export const reviewAPI = {
  getReviews: async (
    page = 1,
    limit = 10,
    filters: ReviewFilterParams = {},
  ): Promise<{ data: Review[]; total: number }> => {
    const response = await apiClient.get<BackendReviewListResponse>('/admin/reviews', {
      params: {
        page,
        limit,
        search: filters.search || undefined,
        status: filters.status && filters.status !== 'all' ? filters.status : undefined,
        sort: filters.sort || 'newest',
        classification:
          filters.classification && filters.classification !== 'all'
            ? filters.classification
            : undefined,
        date_sent: filters.dateSent || 'all',
        date_exact: filters.dateExact || undefined,
        rating: filters.rating || undefined,
      },
    });

    return {
      data: response.data.data.map(mapReview),
      total: response.data.pagination.total,
    };
  },

  getReviewStats: async (): Promise<ReviewStatsInfo> => {
    const response = await apiClient.get<BackendReviewListResponse>('/admin/reviews', {
      params: {
        page: 1,
        limit: 1,
      },
    });

    return {
      totalReviews: response.data.summary.total_reviews,
      pendingReviews: response.data.summary.pending_count,
      violationReviews: response.data.summary.violation_count,
    };
  },

  getReviewById: async (id: string): Promise<ReviewDetailInfo> => {
    const response = await apiClient.get<BackendReviewDetailResponse>(`/admin/reviews/${id}`);
    return mapReviewDetail(response.data);
  },

  updateReviewStatus: async (
    id: string,
    status: Review['status'],
    reason?: string,
  ): Promise<void> => {
    const backendStatus = toBackendStatus(status);

    if (backendStatus === 'approved') {
      await apiClient.put(`/admin/reviews/${id}/approve`);
      return;
    }

    await apiClient.put(`/admin/reviews/${id}/reject`, {
      status: 'violation',
      reason: reason || 'Đánh giá vi phạm chính sách nội dung.',
    });
  },
};

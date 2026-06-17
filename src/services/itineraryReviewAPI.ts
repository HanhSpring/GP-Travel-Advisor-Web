import { apiClient } from './apiClient';
import { ItineraryReview, ItineraryReviewStatsInfo, ItineraryReviewDetailInfo } from '../types/review';
import { BackendReviewStatus, BackendReviewDateSent, formatDateTime, getInitials, mapStatus, toBackendStatus } from './reviewShared';

export interface BackendItineraryReviewItem {
  id: string;
  reviewer_id: string;
  reviewer_name: string;
  reviewer_review_count: number;
  reviewer_report_count: number;
  itinerary_id: string;
  itinerary_name: string;
  itinerary_start_date?: string | null;
  itinerary_end_date?: string | null;
  rating: number;
  review_content: string | null;
  status: BackendReviewStatus;
  created_at: string;
  has_images: boolean;
}

export interface BackendItineraryReviewDetailResponse {
  id: string;
  reviewer: {
    id: string;
    name: string;
    review_count: number;
    report_count: number;
  };
  itinerary: {
    id: string;
    name: string;
    start_date?: string | null;
    end_date?: string | null;
  };
  rating: number;
  review_content: string | null;
  images: Array<{ url: string }>;
  status: BackendReviewStatus;
  created_at: string;
}

export interface BackendItineraryReviewListResponse {
  data: BackendItineraryReviewItem[];
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

export interface ItineraryReviewFilterParams {
  search?: string;
  status?: BackendReviewStatus | 'all';
  dateSent?: BackendReviewDateSent;
  dateExact?: string;
  rating?: number;
  sort?: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating';
}

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('vi-VN');
};

const mapItineraryReviewDetail = (item: BackendItineraryReviewDetailResponse): ItineraryReviewDetailInfo => ({
  id: item.id,
  userAvatar: getInitials(item.reviewer.name || 'N A'),
  userName: item.reviewer.name,
  totalReviews: item.reviewer.review_count,
  totalReports: item.reviewer.report_count,
  itineraryName: item.itinerary.name,
  itineraryStartDate: item.itinerary.start_date ? formatDate(item.itinerary.start_date) : undefined,
  itineraryEndDate: item.itinerary.end_date ? formatDate(item.itinerary.end_date) : undefined,
  rating: item.rating,
  datetime: formatDateTime(item.created_at),
  content: item.review_content || '(Không có nội dung)',
  images: item.images.map((img) => img.url),
  status: mapStatus(item.status),
  reportCount: item.status === 'violation' ? Math.max(item.reviewer.report_count, 1) : 0,
  reportReasons: item.status === 'violation' ? ['Nội dung bị đánh dấu vi phạm'] : [],
  adminNote: item.status === 'violation' ? 'Đánh giá đã được hệ thống gắn nhãn vi phạm.' : '',
});

export const itineraryReviewAPI = {
  getItineraryReviews: async (
    page = 1,
    limit = 10,
    filters: ItineraryReviewFilterParams = {},
  ): Promise<{ data: ItineraryReview[]; total: number }> => {
    try {
      const response = await apiClient.get<BackendItineraryReviewListResponse>('/admin/itinerary-reviews', {
        params: {
          page,
          limit,
          search: filters.search || undefined,
          status: filters.status && filters.status !== 'all' ? filters.status : undefined,
          sort: filters.sort || 'newest',
          date_sent: filters.dateSent || 'all',
          date_exact: filters.dateExact || undefined,
          rating: filters.rating || undefined,
        },
      });

      return {
        data: response.data.data.map((item) => ({
          id: item.id,
          userAvatar: getInitials(item.reviewer_name || 'N A'),
          userName: item.reviewer_name || 'Người dùng ẩn danh',
          itineraryName: item.itinerary_name,
          content: item.review_content || '(Không có nội dung)',
          rating: item.rating,
          date: formatDateTime(item.created_at),
          status: mapStatus(item.status),
        })),
        total: response.data.pagination.total,
      };
    } catch {
      return { data: [], total: 0 };
    }
  },

  getItineraryReviewStats: async (): Promise<ItineraryReviewStatsInfo> => {
    try {
      const response = await apiClient.get<BackendItineraryReviewListResponse>('/admin/itinerary-reviews', {
        params: { page: 1, limit: 1 },
      });

      return {
        totalReviews: response.data.summary.total_reviews,
        pendingReviews: response.data.summary.pending_count,
        violationReviews: response.data.summary.violation_count,
      };
    } catch {
      return { totalReviews: 0, pendingReviews: 0, violationReviews: 0 };
    }
  },

  getItineraryReviewById: async (id: string): Promise<ItineraryReviewDetailInfo> => {
    try {
      const response = await apiClient.get<BackendItineraryReviewDetailResponse>(`/admin/itinerary-reviews/${id}`);
      return mapItineraryReviewDetail(response.data);
    } catch {
      return {} as any;
    }
  },

  updateItineraryReviewStatus: async (
    id: string,
    status: ItineraryReview['status'],
    reason?: string,
  ): Promise<void> => {
    const backendStatus = toBackendStatus(status);

    if (backendStatus === 'approved') {
      await apiClient.put(`/admin/itinerary-reviews/${id}/approve`);
      return;
    }

    await apiClient.put(`/admin/itinerary-reviews/${id}/reject`, {
      status: 'violation',
      reason: reason || 'Đánh giá vi phạm chính sách nội dung.',
    });
  },
};

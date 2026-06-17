export interface Review {
  id: string;
  userAvatar: string;
  userName: string;
  locationName: string;
  content: string;
  rating: number;
  date: string;
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Vi phạm';
  classification?: 'Ngắn hạn' | 'Dài hạn' | 'Cần xử lý' | 'Chưa phân loại';
}

export interface ItineraryReview {
  id: string;
  userAvatar: string;
  userName: string;
  itineraryName: string;
  content: string;
  rating: number;
  date: string;
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Vi phạm';
}

export interface ItineraryReviewStatsInfo {
  totalReviews: number;
  pendingReviews: number;
  violationReviews: number;
}

export interface ReviewDetailInfo {
  id: string;
  userAvatar: string;
  userName: string;
  totalReviews: number;
  totalReports: number;
  locationName: string;
  locationAddress: string;
  rating: number;
  datetime: string;
  content: string;
  images: string[];
  status?: 'Chờ duyệt' | 'Đã duyệt' | 'Vi phạm';
  classification: 'Ngắn hạn' | 'Dài hạn' | 'Cần xử lý' | 'Chưa phân loại';
  reportCount: number;
  reportReasons: string[];
  adminNote: string;
}

export interface ReviewStatsInfo {
  totalReviews: number;
  pendingReviews: number;
  violationReviews: number;
}

export interface ItineraryReviewDetailInfo {
  id: string;
  // Reviewer info
  userAvatar: string;
  userName: string;
  totalReviews: number;
  totalReports: number;
  // Itinerary info
  itineraryName: string;
  itineraryStartDate?: string;
  itineraryEndDate?: string;
  // Review content
  rating: number;
  datetime: string;
  content: string;
  images: string[];
  // Status / violations
  status?: 'Chờ duyệt' | 'Đã duyệt' | 'Vi phạm';
  reportCount: number;
  reportReasons: string[];
  adminNote: string;
}

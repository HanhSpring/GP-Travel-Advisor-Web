export type TabKey = 'Thông tin chung' | 'Đánh giá' | 'Dịch vụ';

export type ReviewSort = 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating';

export type ServiceKind = 'free' | 'paid';

export interface PlaceSummary {
  id: string;
  name: string;
  statusLabel: string;
  statusColor: string;
  isActive: boolean;
  category: string;
  rating: number;
  reviewCount: number;
  gallery: string[];
}

export interface PlaceDraft {
  name: string;
  address: string;
  city: string;
  district: string;
  openTime: string;
  closeTime: string;
  description: string;
  latitude: string;
  longitude: string;
}

export interface PlaceServiceItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  isActive: boolean;
}

export interface ReviewSummary {
  stats: {
    averageRating: number;
    totalReviews: number;
    breakdown: Record<1 | 2 | 3 | 4 | 5, { count: number; percent: number }>;
    aiInsight: string;
  };
  reviews: Array<{
    id: string;
    userName: string;
    rating: number;
    content: string;
    topic: string | null;
    images: string[];
    createdAt: string;
  }>;
  availableTopics: string[];
}

export interface ServiceEditorState {
  kind: ServiceKind;
  mode: 'create' | 'edit';
}

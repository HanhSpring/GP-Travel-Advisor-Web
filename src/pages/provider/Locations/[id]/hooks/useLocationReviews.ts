import { useState, useEffect, useMemo } from 'react';
import { businessReviewAPI } from '../../../../../services/businessReviewAPI';
import { ReviewSummary, ReviewSort, TabKey } from '../types';

export const useLocationReviews = (
  id: string | undefined,
  placeId: string | undefined,
  vendorCandidates: string[],
  activeTab: TabKey
) => {
  const [reviewRating, setReviewRating] = useState<number | undefined>(undefined);
  const [reviewSort, setReviewSort] = useState<ReviewSort>('newest');
  const [reviewHasImages, setReviewHasImages] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewSummary | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (activeTab !== 'Đánh giá') return;

      const placeCandidates = [placeId, id, id ? decodeURIComponent(id) : undefined]
        .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
        .filter((value, index, array) => array.indexOf(value) === index);

      if (placeCandidates.length === 0 || vendorCandidates.length === 0) return;

      try {
        setReviewLoading(true);
        setReviewError(null);
        let loaded = false;
        let lastError: unknown = null;

        for (const placeIdCandidate of placeCandidates) {
          for (const vendorIdCandidate of vendorCandidates) {
            try {
              const response = await businessReviewAPI.getReviews(
                {
                  vendorId: vendorIdCandidate,
                  placeId: placeIdCandidate,
                  rating: reviewRating,
                  sort: reviewSort,
                  hasImages: reviewHasImages || undefined,
                },
                1,
                20
              );

              setReviewData({
                stats: response.stats,
                reviews: response.reviews,
                availableTopics: response.availableTopics,
              });
              loaded = true;
              break;
            } catch (error) {
              lastError = error;
            }
          }
          if (loaded) break;
        }

        if (!loaded) throw lastError || new Error('Không thể tải đánh giá');
      } catch (err) {
        setReviewData(null);
        setReviewError(err instanceof Error ? err.message : 'Không thể tải đánh giá');
      } finally {
        setReviewLoading(false);
      }
    };

    void fetchReviews();
  }, [activeTab, id, placeId, reviewHasImages, reviewRating, reviewSort, vendorCandidates]);

  const locationData = useMemo(() => ({
    reviews: {
      average: reviewData?.stats.averageRating || 0,
      total: reviewData?.stats.totalReviews || 0,
      distribution: [5, 4, 3, 2, 1].map((score) => ({
        score,
        percentage: reviewData?.stats.breakdown[score as 1 | 2 | 3 | 4 | 5]?.percent || 0,
      })),
      aiInsight: reviewData?.stats.aiInsight || 'Chưa có dữ liệu phân tích AI.',
      list: (reviewData?.reviews || []).map((review) => ({
        id: review.id,
        user: review.userName,
        date: new Date(review.createdAt).toLocaleDateString('vi-VN'),
        avatar: `https://picsum.photos/seed/${review.id}/100/100`,
        rating: review.rating,
        content: review.content,
        images: review.images,
        tags: review.topic ? [{ name: review.topic, color: '#3b82f6' }] : [],
      })),
    },
  }), [reviewData]);

  return {
    reviewRating, setReviewRating,
    reviewSort, setReviewSort,
    reviewHasImages, setReviewHasImages,
    reviewLoading, reviewError,
    replyingToId, setReplyingToId,
    locationData
  };
};

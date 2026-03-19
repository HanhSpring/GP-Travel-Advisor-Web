import { Review, ReviewDetailInfo, ReviewStatsInfo } from '../types/review';
import reviewPhoto1 from '../assets/images/reviews/review_photo_1.png';
import reviewPhoto2 from '../assets/images/reviews/review_photo_2.png';

const reviewers = [
  { name: 'User Vô Danh', avatar: 'UD' },
  { name: 'Tran Thi B', avatar: 'TB' },
  { name: 'Le Van C', avatar: 'LC' },
  { name: 'Vu Thanh', avatar: 'VT' },
  { name: 'Bot Account 1', avatar: 'BA' },
  { name: 'Pham D', avatar: 'PD' },
  { name: 'Mai Linh', avatar: 'ML' },
  { name: 'Hoang Tuan', avatar: 'HT' },
  { name: 'Alice Nguyen', avatar: 'AN' },
  { name: 'Unknown User', avatar: 'UU' },
];

const locations = [
  'Khách sạn Luxury', 'Nhà hàng Biển Đông', 'Coffee House 24h',
  'Khu nghỉ dưỡng Suối Mơ', 'Shop Quà Lưu Niệm', 'Bảo tàng Lịch sử',
  'Spa Hoa Sen', 'Bánh Mì Phố', 'Trung tâm Thương mại', 'Resort 5 Sao'
];

const locationAddresses = [
  'Quận 1, TP.HCM', 'Quận 3, TP.HCM', 'Quận 7, TP.HCM',
  'Đà Lạt, Lâm Đồng', 'Quận 5, TP.HCM', 'Quận 1, TP.HCM',
  'Quận Bình Thạnh, TP.HCM', 'Quận 10, TP.HCM', 'Quận 2, TP.HCM', 'Phú Quốc, Kiên Giang'
];

const fullContents = [
  'Dịch vụ quá tệ, lừa đảo, đừng tin vào quảng cáo. Phòng ốc bẩn thỉu không dọn dẹp, nhân viên lễ tân thái độ lỗi lõm khi khách phàn nàn về nước nóng. Tôi đặt phòng view biển giá cao nhưng lại nhận được phòng view tường. Yêu cầu hoàn tiền thì bị từ chối thẳng thừng. Tránh xa chỗ này ra!',
  'Món ăn rất ngon, hải sản tươi sống. Phục vụ hết sức chuyên nghiệp và nhanh chóng. Giá cả hợp lý cho chất lượng nhận được. Sẽ quay lại lần sau!',
  'Không gian yên tĩnh, nhạc nhẹ nhàng, cà phê ngon. Thích hợp để làm việc hoặc đọc sách. Wifi mạnh, ổ cắm điện nhiều. Nhân viên thân thiện.',
  'Phòng ốc sạch sẽ nhưng giá hơi cao so với mặt bằng chung. View đẹp, có hồ bơi riêng. Dịch vụ spa tốt nhưng phải đặt trước.',
  'CLICK HERE FOR FREE MONEY http://scam-link.xyz. Totally legit not a scam. Buy now and get 50% off premium watches.',
  'Một trải nghiệm văn hóa thú vị. Nên đi sớm để tránh đông. Hướng dẫn viên nhiệt tình, kiến thức sâu rộng. Giá vé hợp lý.',
  'Nhân viên nhiệt tình, tay nghề tốt. Sẽ quay lại lần sau. Không gian sạch sẽ, thư giãn. Giá cả phải chăng cho dịch vụ massage 60 phút.',
  'Bánh mì giòn, nhân đầy đặn. Giá cả hợp lý cho một bữa ăn nhanh. Quán nhỏ nhưng đông khách, phải xếp hàng chờ.',
  'Bãi gửi xe quá xa, tháng này chờ đợi lâu. Không gian shopping rộng rãi nhưng điều hòa không đủ mát vào giờ cao điểm.',
  'buy cheap watches at watchstore.xyz totally legit. Best prices guaranteed. Free shipping worldwide. Contact us now!',
];

const reportReasonsMap = [
  ['Spam', 'Nội dung không phù hợp', 'Cáo buộc sai sự thật'],
  [],
  [],
  [],
  ['Spam', 'Quảng cáo', 'Lừa đảo'],
  [],
  [],
  [],
  ['Nội dung không phù hợp'],
  ['Spam', 'Quảng cáo', 'Lừa đảo'],
];

const adminNotes = [
  'Đánh giá này nhận được báo cáo lặp lại về ngôn từ tiêu cực và nội dung không xác thực. Cần đối chiếu với lịch sử đặt phòng của khách hàng trước khi quyết định.',
  '', '', '',
  'Nội dung spam rõ ràng, chứa link lừa đảo. Khuyến nghị xóa ngay lập tức.',
  '', '', '',
  'Đánh giá có nội dung tiêu cực nhưng cần xác minh thêm.',
  'Tài khoản bot, nội dung quảng cáo spam rõ ràng.',
];

const contents = [
  'Dịch vụ quá tệ, lừa đảo, đóng tiền vào quảng...',
  'Món ăn rất ngon, hải sản tươi sống. Phục vụ h...',
  'Không gian yên tĩnh, mác nhẹ nhàng, cà phê...',
  'Phòng ốc sạch sẽ nhưng giá hơi cao so với m...',
  'CLICK HERE FOR FREE MONEY http://scam-...',
  'Một trải nghiệm văn hóa thú vị. Nên đi sớm để...',
  'Nhân viên nhiệt tình, tay nghề tốt. Sẽ quay lạ...',
  'Bánh mì giòn, nhân đầy đặn. Giá cả hợp lý ch...',
  'Bãi gửi xe quá xa, tháng này chờ đâu. Không...',
  'buy cheap watches at watchstore.xyz totally...',
];

const dates = [
  'Vừa xong', '10 phút trước', '1 giờ trước', '08:30 AM',
  'Hôm qua', 'Hôm qua', '2 ngày trước', '3 ngày trước',
  '4 ngày trước', '5 ngày trước'
];

const statusPattern = [
  'Vi phạm', 'Đã duyệt', 'Đã duyệt', 'Đã duyệt',
  'Vi phạm', 'Đã duyệt', 'Đã duyệt', 'Đã duyệt',
  'Đã duyệt', 'Vi phạm'
] as Review['status'][];

const classificationPattern: Review['classification'][] = [
  'Chưa phân loại', 'Ngắn hạn', 'Dài hạn', 'Ngắn hạn',
  'Chưa phân loại', 'Cần xử lý', 'Dài hạn', 'Ngắn hạn',
  'Cần xử lý', 'Chưa phân loại'
];

const ratingPattern = [2, 5, 4, 3, 1, 4, 2, 5, 3, 1];

const mockReviews: Review[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  userAvatar: reviewers[i % reviewers.length].avatar,
  userName: reviewers[i % reviewers.length].name,
  locationName: locations[i % locations.length],
  content: contents[i % contents.length],
  rating: ratingPattern[i % ratingPattern.length],
  date: dates[i % dates.length],
  status: statusPattern[i % statusPattern.length],
  classification: classificationPattern[i % classificationPattern.length],
}));

export const reviewAPI = {
  getReviews: async (page: number = 1, limit: number = 10): Promise<{ data: Review[]; total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        resolve({
          data: mockReviews.slice(start, end),
          total: mockReviews.length
        });
      }, 400);
    });
  },

  getReviewStats: async (): Promise<ReviewStatsInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalReviews: 45600,
          pendingReviews: 85,
          violationReviews: 12
        });
      }, 300);
    });
  },

  /** Lấy chi tiết một đánh giá theo ID */
  getReviewById: async (id: string): Promise<ReviewDetailInfo> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = parseInt(id, 10) - 1;
        if (idx < 0 || idx >= 50) {
          reject(new Error('Review not found'));
          return;
        }
        const i = idx % reviewers.length;
        const reviewDetail: ReviewDetailInfo = {
          id,
          userAvatar: reviewers[i].avatar,
          userName: reviewers[i].name,
          totalReviews: 12 + (idx * 3) % 20,
          totalReports: (idx * 2) % 5,
          locationName: locations[idx % locations.length],
          locationAddress: locationAddresses[idx % locationAddresses.length],
          rating: ratingPattern[idx % ratingPattern.length],
          datetime: `14:30 - 20/10/2023`,
          content: fullContents[idx % fullContents.length],
          images: reportReasonsMap[idx % reportReasonsMap.length].length > 0
            ? [reviewPhoto1, reviewPhoto2]
            : [],
          classification: classificationPattern[idx % classificationPattern.length],
          reportCount: reportReasonsMap[idx % reportReasonsMap.length].length > 0
            ? 3 + (idx % 5)
            : 0,
          reportReasons: reportReasonsMap[idx % reportReasonsMap.length],
          adminNote: adminNotes[idx % adminNotes.length],
        };
        resolve(reviewDetail);
      }, 400);
    });
  }
};

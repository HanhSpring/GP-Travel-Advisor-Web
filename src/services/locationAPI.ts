import { Location, LocationStatsInfo, LocationDetailInfo } from '../types/location';

const categories = ['Khách sạn', 'Nhà hàng', 'Cafe', 'Di tích', 'Giải trí', 'Ẩm thực', 'Mua sắm', 'Du lịch', 'Khác'];
const statuses: ('Đã duyệt' | 'Chờ duyệt' | 'Từ chối')[] = ['Đã duyệt', 'Chờ duyệt', 'Từ chối'];
const users = ['Metro Group', 'Sen Group', 'Le Van C', 'Admin System', 'Minh Hoang', 'Hoang Anh', 'Viet Tourist', 'Linh Dan', 'Travel Corp'];

const mockLocations: Location[] = Array.from({ length: 2540 }).map((_, i) => ({
  id: `${i + 1}`,
  image: `L${i % 5 + 1}`, // Mocks an image or icon
  name: `Địa điểm Mẫu số ${i + 1}`,
  address: `${Math.floor(Math.random() * 100) + 1} Đường Mẫu, Quận C, HN`,
  category: categories[i % categories.length],
  userName: users[i % users.length],
  userAvatar: users[i % users.length][0].toUpperCase(),
  publishDate: i < 5 ? 'Hôm nay' : `1${Math.floor(i % 9) + 1}/03/2023`,
  status: statuses[i % statuses.length],
  rejectionReason: statuses[i % statuses.length] === 'Từ chối' ? 'Thông tin hình ảnh không rõ ràng và thiếu minh bạch về giá cả.' : undefined,
}));

// Set fixed entries for the first 10 for consistency with the design
const initialData: Partial<Location>[] = [
  { name: 'Khách sạn Metropole', address: '15 Ngô Quyền, Hoàn Kiếm, HN', category: 'Khách sạn', userName: 'Metro Group', publishDate: '12/01/2023', status: 'Đã duyệt' },
  { name: 'Nhà hàng Sen Tây Hồ', address: '614 Lạc Long Quân, Tây Hồ, HN', category: 'Nhà hàng', userName: 'Sen Group', publishDate: 'Hôm nay', status: 'Chờ duyệt' },
  { name: 'Quán Cà phê Cũ', address: 'Ngõ nhỏ, Phố nhỏ, HN', category: 'Cafe', userName: 'Le Van C', publishDate: '20/05/2023', status: 'Từ chối', rejectionReason: 'Địa điểm đã ngừng hoạt động hoặc thông tin cung cấp bị sai lệch so với thực tế.' },
  { name: 'Bảo tàng Dân tộc học', address: 'Nguyễn Văn Huyên, Cầu Giấy', category: 'Di tích', userName: 'Admin System', publishDate: '22/06/2023', status: 'Đã duyệt' },
  { name: 'Homestay Đà Lạt Phố', address: 'Phường 3, Đà Lạt, Lâm Đồng', category: 'Khách sạn', userName: 'Minh Hoang', publishDate: 'Hôm qua', status: 'Chờ duyệt' },
  { name: 'Công viên Thống Nhất', address: 'Trần Nhân Tông, Hai Bà Trưng', category: 'Giải trí', userName: 'Admin System', publishDate: '10/02/2023', status: 'Đã duyệt' },
  { name: 'Tiệm Bánh Mì Dân Tổ', address: 'Cao Thắng, Hoàn Kiếm, HN', category: 'Ẩm thực', userName: 'Hoang Anh', publishDate: '01/07/2023', status: 'Đã duyệt' },
  { name: 'Test Location #99', address: 'N/A', category: 'Khác', userName: 'Viet Tourist', publishDate: '14/06/2023', status: 'Từ chối', rejectionReason: 'Thiếu thông tin liên hệ và hình ảnh minh họa thực tế.' },
  { name: 'Lotte Center Hanoi', address: '54 Liễu Giai, Ba Đình', category: 'Mua sắm', userName: 'Linh Dan', publishDate: '18/06/2023', status: 'Đã duyệt' },
  { name: 'Phố đi bộ Hồ Gươm', address: 'Hoàn Kiếm, Hà Nội', category: 'Du lịch', userName: 'Travel Corp', publishDate: 'Vừa xong', status: 'Chờ duyệt' },
];

initialData.forEach((data, i) => {
  mockLocations[i] = { ...mockLocations[i], ...data };
});

export const locationAPI = {
  getLocations: async (page = 1, limit = 10): Promise<{ data: Location[], total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        resolve({
          data: mockLocations.slice(startIndex, endIndex),
          total: mockLocations.length
        });
      }, 500);
    });
  },

  getLocationStats: async (): Promise<LocationStatsInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalLocations: mockLocations.length,
          pendingApproval: mockLocations.filter(loc => loc.status === 'Chờ duyệt').length,
          newThisMonth: 15
        });
      }, 500);
    });
  },

  getLocationById: async (id: string): Promise<LocationDetailInfo | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const baseLocation = mockLocations.find(loc => loc.id === id);
        if (!baseLocation) return resolve(null);
        
        const detail: LocationDetailInfo = {
          ...baseLocation,
          description: 'Tọa lạc tại trung tâm Quận 1, Spa Hoa Sen mang đến một không gian thư giãn tuyệt vời, tách biệt khỏi sự ồn ào náo nhiệt của thành phố. Với thiết kế lấy cảm hứng từ thiên nhiên và hương thơm thảo mộc dịu nhẹ, chúng tôi cam kết mang lại trải nghiệm phục hồi sức khỏe và tinh thần tốt nhất cho quý khách. Các dịch vụ bao gồm massage toàn thân, trị liệu da mặt, và xông hơi thảo dược.',
          phone: '0901234567',
          email: 'contact@hoasenspa.vn',
          lat: 10.7769,
          lng: 106.7009,
          photos: [
            'https://picsum.photos/seed/loc_1/800/400',
            'https://picsum.photos/seed/loc_2/200/200',
            'https://picsum.photos/seed/loc_3/200/200',
            'https://picsum.photos/seed/loc_4/200/200',
            'https://picsum.photos/seed/loc_5/200/200'
          ],
          senderStats: {
            totalLocations: 3,
            joinedDate: '12/05/2023',
            role: 'Nhà cung cấp'
          }
        };
        resolve(detail);
      }, 500);
    });
  }
};

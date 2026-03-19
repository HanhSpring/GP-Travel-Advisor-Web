export type Role = 'Admin' | 'Nhà cung cấp' | 'Khách du lịch';

export type Status = 'Hoạt động' | 'Đã khóa';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: Status;
  joinedDate: string;
}

export interface UserStatsInfo {
  totalUsers: number;
  newThisMonth: number;
  totalAdmins: number;
}

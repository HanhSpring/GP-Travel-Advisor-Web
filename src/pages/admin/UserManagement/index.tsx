import React, { useEffect, useState } from 'react';
import { User, UserStatsInfo } from '../../../types/user';
import { userAPI } from '../../../services/userAPI';
import { UserStats } from './components/UserStats';
import { UserFilter } from './components/UserFilter';
import { UserTable } from './components/UserTable';
import { Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserManagement.css';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStatsInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 10;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(users.map(u => u.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(r => r !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedRows.length} người dùng đã chọn?`)) {
      alert(`Đã xóa thành công ${selectedRows.length} tài khoản.`);
      setSelectedRows([]);
    }
  };

  // Using useEffect to mimic React Query/RTK query per conventions for fetching mock data
  useEffect(() => {
    const fetchUserPageData = async () => {
      setLoading(true);
      try {
        const [statsData, usersData] = await Promise.all([
          userAPI.getUserStats(),
          userAPI.getUsers(currentPage, itemsPerPage)
        ]);
        setStats(statsData);
        setUsers(usersData.data);
        setTotalItems(usersData.total);
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPageData();
  }, [currentPage]);

  return (
    <div className="page-container">
      {/* Top Header */}
      <header className="page-header">
        <div className="header-titles">
          <h1 className="page-title">Quản lý người dùng</h1>
          <div className="breadcrumb">
            <span className="text-muted">Quản lý</span> / <Link to="/admin/users" className="active-bread">Người dùng</Link>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-btn">
            <Bell size={20} />
          </button>
          <div className="user-avatar-small">
            <span className="avatar-text">AD</span>
          </div>
          <Link to="/admin/users/add" className="btn-primary">
            <Plus size={18} />
            <span>Thêm người dùng</span>
          </Link>
        </div>
      </header>

      <div className="page-content">
        <UserStats stats={stats} loading={loading} />

        <div className="card tab-container">
          <UserFilter
            selectedCount={selectedRows.length}
            onBulkDelete={handleBulkDelete}
          />
          <UserTable
            users={users}
            loading={loading}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

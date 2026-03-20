import React from 'react';
import { User } from '../../../../types/user';
import { Badge } from '../../../../components/Badge';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserTableProps {
  users: User[];
  loading: boolean;
  selectedRows: string[];
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  selectedRows,
  onSelectRow,
  onSelectAll,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const navigate = useNavigate();

  const getRoleBadgeType = (role: string) => {
    switch (role) {
      case 'Admin': return 'admin';
      case 'Nhà cung cấp': return 'provider';
      case 'Khách du lịch': return 'tourist';
      default: return 'default';
    }
  };

  const getStatusBadgeType = (status: string) => {
    return status === 'Hoạt động' ? 'active' : 'locked';
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th className="th-checkbox">
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedRows.length === users.length && users.length > 0}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th className="th-user">NGƯỜI DÙNG</th>
            <th className="th-role">VAI TRÒ</th>
            <th className="th-status">TRẠNG THÁI</th>
            <th className="th-date">NGÀY THAM GIA</th>
            <th className="th-actions">THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-muted">Đang tải dữ liệu...</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} onClick={() => navigate(`/admin/users/${user.id}`)} style={{ cursor: 'pointer' }} className="table-row-hover">
                <td className="td-checkbox" data-label="" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      onSelectRow(user.id, e.target.checked);
                    }}
                  />
                </td>
                <td className="td-user" data-label="Người dùng">
                  <div className="user-profile">
                    <div className="avatar">{user.avatar}</div>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="td-role" data-label="Vai trò">
                  <Badge label={user.role} type={getRoleBadgeType(user.role)} />
                </td>
                <td className="td-status" data-label="Trạng thái">
                  <Badge
                    label={user.status}
                    type={getStatusBadgeType(user.status)}
                    showDot={true}
                  />
                </td>
                <td className="td-date" data-label="Ngày tham gia">
                  <span className="date-text">{user.joinedDate}</span>
                </td>
                <td className="td-actions" data-label="Thao tác" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="action-btn text-blue"
                    title="Chỉnh sửa"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button className="action-btn text-red" title="Xóa">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-wrapper">
        <span className="pagination-info">
          Hiển thị <b>{totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}</b> trong <b>{totalItems}</b> kết quả
        </span>
        <div className="pagination">
          <button
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: Math.ceil(totalItems / itemsPerPage) || 1 }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            className="page-nav"
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage) || totalItems === 0}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip, Button, Input, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { layDanhSachNguoiDung, xoaNguoiDung } from '../../redux/action/movieAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';

const { Search } = Input;

const UserAdmin = () => {
  const { listUsers } = useSelector(state => state.movieReducer);
  const dispatch = useDispatch();
  const [userToDelete, setUserToDelete] = useState(null);

  const handleClickSearch = (e) => {
    dispatch(layDanhSachNguoiDung(e));
  };

  const handleDelete = (taiKhoan) => {
    setUserToDelete(taiKhoan);
    // Hiển thị modal xác nhận xóa
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa người dùng này?',
      showDenyButton: true,
      confirmButtonText: 'Xóa',
      denyButtonText: `Hủy`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(xoaNguoiDung(taiKhoan))
          .then((result) => {
            if (result.success) {
              // Xóa thành công, hiển thị thông báo thành công
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xóa Thành Công !',
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              // Xóa thất bại, hiển thị thông báo lỗi
              Swal.fire('Lỗi', result.error.response.data.content, 'error');
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setUserToDelete(null);
          });
      } else if (result.isDenied) {
        setUserToDelete(null);
        Swal.fire('Hủy xóa', '', 'info');
      }
    });
  };
  

  useEffect(() => {
    const action = layDanhSachNguoiDung();
    dispatch(action);
  }, []);

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Họ tên',
      dataIndex: "hoTen"
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
    },
    {
      title: "Loại người dùng",
      dataIndex: "maLoaiNguoiDung"
    },
    {
      title: 'Hành động',
      render: (_, user) => (
        <>
          <Tooltip title="Edit" color="green">
            <NavLink to={`/admin/user/edit/${user.taiKhoan}`}>
              <Button style={{ border: 'none' }} className="text-success font-size-xl">
                <EditOutlined />
              </Button>
            </NavLink>
          </Tooltip>
          <Tooltip title="Delete" color="red">
            <Button
              style={{ border: 'none' }}
              className="text-danger font-size-xl"
              onClick={() => handleDelete(user.taiKhoan)}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div className='text-center'>
      <h4 className='py-3'>Tài Khoản Người Dùng</h4>
      <div className='d-flex justify-content-center mb-4'>
        <NavLink to="/admin/user/add-new">
          <button className='btn btn-outline-danger mr-4 rounded-lg btn-sm'>
            Thêm tài khoản
          </button>
        </NavLink>
        <div className="d-flex input-group-sm">
          <Search
            placeholder="Nhập từ khoá tìm kiếm"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={handleClickSearch}
          />
        </div>
      </div>

      <Table dataSource={listUsers} columns={columns} rowKey="taiKhoan" />
    </div>
  );
};

export default UserAdmin;

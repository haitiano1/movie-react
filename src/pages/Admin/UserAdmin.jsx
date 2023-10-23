import { Table, Tooltip, Button, Input } from 'antd';
import React, { useEffect } from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung, xoaPhim } from '../../redux/action/movieAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const { Search } = Input;


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
    render: (_, user) => ( // Sử dụng record thay vì dataIndex
      <>
        <Tooltip title="Edit" color="green">
          <NavLink to={`/admin/user/edit/${user.taiKhoan}`}>
            <Button style={{ border: 'none' }}
              className="text-success font-size-xl"
            >
              <EditOutlined />
            </Button>
          </NavLink>
        </Tooltip>
        <Tooltip title="Delete" color="red">
          <Button style={{ border: 'none' }}
            className="text-danger font-size-xl" onClick={() => {
              // dispatch(xoaNguoiDung(user.taiKhoan))
            }}
          >
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </>
    ),
  },

]
export default function UserAdmin() {
  let { listUsers } = useSelector(state => state.movieReducer)
  const data = listUsers;
  const handleClickSearch = (e) => {
    dispatch(layDanhSachNguoiDung(e));
  };
  let dispatch = useDispatch()
  useEffect(() => {
    const action = layDanhSachNguoiDung()
    dispatch(action)
  }, [])


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

      <Table dataSource={data} columns={columns} rowKey="taiKhoan" />
    </div>
  )
}

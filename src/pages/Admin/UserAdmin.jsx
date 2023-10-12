import { Table, Tooltip, Button } from 'antd';
import React, { useEffect } from 'react'
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung } from '../../redux/action/movieAction';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


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
    render: (_, record) => ( // Sử dụng record thay vì dataIndex
      <>
        <Tooltip title="Edit" color="green">
          <Button style={{ border: 'none' }}
            className="text-success font-size-xl"
          >
            <EditOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" color="red">
          <Button style={{ border: 'none' }}
            className="text-danger font-size-xl"
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
          <input
            className="form-control p-0 pl-3 py-1 rounded-start text-sm"
            style={{ border: "1px solid #999" }}
            placeholder="Nhập từ khóa tìm kiếm"
          />
          <button className="btn btn-primary px-3 border-0 rounded-end btn-sm ml-2 " style={{ backgroundColor: '#ff7733' }}>
            <SearchOutlined />
          </button>
        </div>
      </div>

      <Table dataSource={data} columns={columns} rowKey="taiKhoan" />
    </div>
  )
}

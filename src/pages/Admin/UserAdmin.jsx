import {Table, Tooltip, Button } from 'antd';
import React, { useEffect } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung } from '../../redux/action/movieAction';


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
            <Button  style={{border:'none'}}
              className="text-success font-size-xl"
            >
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" color="red">
            <Button  style={{border:'none'}}
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
            <Table dataSource={data} columns={columns} rowKey="taiKhoan" />
        </div>
    )
}

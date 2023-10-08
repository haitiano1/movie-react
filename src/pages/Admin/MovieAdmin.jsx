import { Button, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhim } from '../../redux/action/movieAction';
import { NavLink } from 'react-router-dom';

const columns = [
  {
    title: 'Mã phim',
    dataIndex: 'maPhim',
    sorter: (a, b) => b.maPhim - a.maPhim
  },
  {
    title: 'Hình ảnh',
    dataIndex: "hinhAnh",
    render: (text, data) => {
      return <img src={text} width={50} />;
    }
  },
  {
    title: "Tên Phim",
    dataIndex: "tenPhim",
    sorter: (a, b) => {
      let tenPhimA = a.tenPhim.toLowerCase().trim();
      let tenPhimB = b.tenPhim.toLowerCase().trim();
      if (tenPhimA > tenPhimB) {
        return 1;
      }
      return -1;
    },
    sortDirections: ['descend', 'ascend'],
    render: (text) => {
      if (text.length > 45) {
        return <span>{text.slice(0, 45)}...</span>;
      }
      return <span>{text}</span>;
    }
  },
  {
    title: "Sắp chiếu",
    dataIndex: "sapChieu",
    render: (text, data) => <div>
      {text ? <CheckCircleOutlined className='text-success' /> : <CloseCircleOutlined className='text-danger' />}
    </div>

  },
  {
    title: "Đang chiếu",
    dataIndex: "dangChieu",
    render: (text, data) => <div>
      {text ? <CheckCircleOutlined className='text-success' /> : <CloseCircleOutlined className='text-danger' />}
    </div>
  },
  {
    title: "Phim hot",
    dataIndex: "hot",
    render: (text, data) => <div>
      {text ? <CheckCircleOutlined className='text-success' /> : <CloseCircleOutlined className='text-danger' />}
    </div>
  },
  {
    title: "Ngày chiếu",
    dataIndex: "ngayKhoiChieu",
    render: (text, data) => {
      return moment(text).format("DD/MM/YYYY");
    }
  },
  {
    title: 'Hành động',
    render: (text, film) => (
      <div className='d-flex '>
        <Tooltip title="Sửa phim" color="blue">
          <NavLink to={`/admin/movie/edit/${film.maPhim}`}>
            <Button className="d-flex align-items-center bg-primary text-white">
              <EditOutlined />
            </Button>
          </NavLink>
        </Tooltip>
        <Tooltip title="Xoá phim" color="red">
          <Button
            className="d-flex align-items-center bg-danger text-white ml-1 mr-1"
          >
            <DeleteOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="Tạo lịch chiếu" color="green">
          <Button
            className="d-flex align-items-center bg-success text-white"
          >
            <CalendarOutlined />
          </Button>
        </Tooltip>
      </div>
    ),
  },

]
export default function MovieAdmin() {
  let { listMovies } = useSelector(state => state.movieReducer)
  const data = listMovies;
  let dispatch = useDispatch()
  useEffect(() => {
    const action = layDanhSachPhim()
    dispatch(action)
  }, [])
  // console.log(data)


  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="maPhim" />
    </div>
  )
}

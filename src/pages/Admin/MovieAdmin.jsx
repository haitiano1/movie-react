import { Button, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhim, xoaPhim } from '../../redux/action/movieAction';
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
            className="d-flex align-items-center bg-danger text-white ml-1 mr-1" onClick={() => xoaPhim(film.maPhim)}
          >
            <DeleteOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="Tạo lịch chiếu" color="green">
          <NavLink onClick={() => {
            localStorage.setItem('film', JSON.stringify(film))
          }}
            to={`/admin/showtimes/${film.maPhim}`}>
            <Button
              className="d-flex align-items-center bg-success text-white"
            >
              <CalendarOutlined />
            </Button>
          </NavLink>
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
    <div className='text-center'>
      <h4 className='py-3'>Danh sách phim</h4>
      <div className='d-flex justify-content-center mb-4'>
        <NavLink to="/admin/add-new">
          <button className='btn btn-outline-danger mr-4 rounded-lg btn-sm'>
            Thêm phim mới
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
      <Table dataSource={data} columns={columns} rowKey="maPhim" />
    </div>
  )
}

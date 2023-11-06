import { Button, Table, Tooltip, Input, Modal } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, CalendarOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhim, xoaPhim } from '../../redux/action/movieAction';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
const { Search } = Input;


const MovieAdmin = () => {
  let { listMovies } = useSelector(state => state.movieReducer)
  const [filmToDelete, setFilmToDelete] = useState(null);
  const data = listMovies;
  const handleClickSearch = (e) => {
    dispatch(layDanhSachPhim(e));
  };
  const handleDelete = (film) => {
    setFilmToDelete(film);
  
    // Hiển thị Swal.confirm để xác nhận xóa
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa phim này?',
      showDenyButton: true,
      confirmButtonText: 'Xóa',
      denyButtonText: `Hủy`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Gọi action để xóa phim
        dispatch(xoaPhim(film));
        setFilmToDelete(null);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Xóa Thành Công !',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.isDenied) {
        setFilmToDelete(null);
        Swal.fire('Hủy xóa', '', 'info');
      }
    });
  };
  let dispatch = useDispatch()
  useEffect(() => {
    const action = layDanhSachPhim()
    dispatch(action)
  }, [])

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
              className="d-flex align-items-center bg-danger text-white ml-1 mr-1" onClick={() => handleDelete(film.maPhim)}
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
          <Search
            placeholder="Nhập từ khoá tìm kiếm"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={handleClickSearch}
          />
        </div>
      </div>
      <Table dataSource={data} columns={columns} rowKey="maPhim" />
    </div>
  )
}
export default MovieAdmin;

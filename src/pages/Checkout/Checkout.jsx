import React, { Fragment, useEffect } from 'react'
import { userMovie } from '../../ulti/setting'
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import style from './seats.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { datVe, layDanhSachPhongVe } from '../../redux/action/movieAction';

export default function Checkout() {

  let { listTicket, userLogin, listChooseSeat} = useSelector(state => state.movieReducer)
  
  let dispatch = useDispatch()

  let { id } = useParams()

  useEffect(() => {
    const action = layDanhSachPhongVe(id);
    dispatch(action);
  }, []);

const renderSeats = () =>{
    return listTicket.danhSachGhe?.map((item, index)=>{

      let myReservedSeat = userLogin.taiKhoan === item.taiKhoanNguoiDat ? 'myReservedSeat' : ''
      let vipSeat = item.loaiGhe == 'Vip' ? 'vipSeat' : '';
      let reservedSeat = item.daDat ? 'reservedSeat' : '';	
      let currentChooseSeat = '';


      return <Fragment key={index}>
        <button onClick={()=>{
          alert(item.loaiGhe)
        }} disabled={item.daDat} className={`normalSeat ${vipSeat} ${reservedSeat} ${myReservedSeat} ${currentChooseSeat}`}></button>
      </Fragment>
    })
}

  return (
    <div className='row'>
      <div className="col-12 col-lg-8">
        <div className={style.screen}></div>                                                  
        <div className={style.trapezoid}><b>MÀN HÌNH</b></div>
        <div className='text-center mt-3'>{renderSeats()}</div>
      </div>
      <div className="col-12 col-lg-4 billTicket">
        <div className="d-flex flex-column p-4 shadow-lg border border-warning" style={{borderRadius: '20px'}}>
          <h4 className="font-weight-bold text-center mb-2">HÓA ĐƠN</h4>
          <div>
            <hr />
            <div className="mt-1 mb-2">
              <h6 className="font-weight-bold" style={{color:"#ea7246"}}>{listTicket.thongTinPhim?.tenPhim}</h6>
              <p>{listTicket.thongTinPhim?.diaChi}</p>
              <p>{listTicket.thongTinPhim?.tenCumRap}</p>
              <p>
               {listTicket.thongTinPhim?.ngayChieu} - {listTicket.thongTinPhim?.gioChieu}
              </p>
              <p></p>
            </div>
            <hr />
            <div className="mt-1 mb-2">
              <p className="text-muted">Ghế</p>
              <div className="d-flex flex-wrap">
                <span className="me-2 text-success font-weight-bold">
                  vcl
                </span>
              </div>
            </div>
            <hr />
            <div className="mt-1 mb-2">
              <p className="text-muted text-sm">Email</p>
              <p>{userLogin.email}</p>
            </div>
            <hr />
            <div className="mt-1 mb-2">
              <p className="text-muted text-sm">Số điện thoại</p>
              <p>{userLogin.soDT}</p>
            </div>
            <hr />
            <div className="mt-1 mb-2 d-flex justify-content-between align-items-center">
              <p className="text-muted text-sm">Tổng tiền</p>
              <p className="font-weight-bold text-success" style={{fontSize: "25px"}}> 7373đ</p>
            </div>
            <hr />
            <div style={{ fontSize: 12 }} className="mt-1 mb-3">
              <p className="text-danger d-flex align-items-center">
                <ExclamationCircleOutlined className="mr-1" />
                Lưu ý : Vé đã mua không thể đổi hoặc hoàn tiền.
              </p>
            </div>
          </div>
          <div className="mt-auto">
            <div onClick={()=>{
              dispatch(datVe(id))
            }} className="text-center p-3 font-weight-bold text-white" style={{backgroundColor: '#f17c43', borderRadius:'40px'}}
            >THANH TOÁN
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

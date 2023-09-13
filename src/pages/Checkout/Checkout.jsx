import React, { Fragment, useEffect, useState } from 'react'
import { userMovie } from '../../ulti/setting'
import { Redirect, useParams } from 'react-router-dom/cjs/react-router-dom'
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import style from './seats.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { datVe, layDanhSachPhongVe } from '../../redux/action/movieAction';
import { useCallback } from 'react';

export default function Checkout() {

  let { listTicket, userLogin } = useSelector(state => state.movieReducer)
  let [arrChooseSeat, setArrChooseSeat] = useState([])

  let dispatch = useDispatch()

  let { id } = useParams()
  useEffect(() => {
    const action = layDanhSachPhongVe(id);
    dispatch(action);
  }, []);

  let total = arrChooseSeat.reduce((total, item) => {
    return total + item.giaVe;
  }, 0).toLocaleString();

  const chooseSeat = useCallback((item) => {
    setArrChooseSeat((preState) => {
      let obj = preState.find((item2) => {
        return item.tenGhe === item2.tenGhe;
      })
      // console.log(item.tenGhe)
      if (obj) {
        return preState.filter((item2) => item2.tenGhe !== item.tenGhe);
      } else {
        return [...preState, { tenGhe: item.tenGhe, giaVe: item.giaVe }];
      }
    })
  }, [])

  const renderSeats = () => {
    console.log("arrChooseSeat:", arrChooseSeat);
    return listTicket.danhSachGhe?.map((item, index) => {

      let myReservedSeat = userLogin.taiKhoan === item.taiKhoanNguoiDat ? 'myReservedSeat' : ''
      let vipSeat = item.loaiGhe == 'Vip' ? 'vipSeat' : '';
      let reservedSeat = item.daDat ? 'reservedSeat' : '';
      let currentChooseSeat = '';
      for (let value of arrChooseSeat) {
        if (value.tenGhe === item.tenGhe) {
          currentChooseSeat = 'currentChooseSeat'
        }
      }

      return <Fragment key={index}>
        <div className="inline-block relative">
          <button onClick={() => {
            chooseSeat(item)
          }} disabled={item.daDat} className={`normalSeat ${vipSeat} ${reservedSeat} ${myReservedSeat} ${currentChooseSeat}`}>

            {item.daDat ? (
              myReservedSeat ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ maxWidth: 26 }}
                  className="w-100 h-100 mx-auto text-white d-flex justify-content-center align-items-center"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className=" X-icon-button w-100 h-100 mx-auto text-white d-flex justify-content-center align-items-center"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            ) : (
              ""
            )}
            {currentChooseSeat && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-100 h-100 mx-auto text-white d-flex justify-content-center align-items-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            )}
          </button>
        </div>
      </Fragment>
    })

  }


  return (
    <div className='row'>
      <div className="col-12 col-lg-8">
        <div className={style.screen}></div>
        <div className={style.trapezoid}><b>MÀN HÌNH</b></div>
        <div className='text-center mt-3'>
        <div className="mx-auto w-full">{renderSeats()}</div>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-2 mt-5">
            <div className="text-center text-sm text-gray-500">
              <button className="normalSeat"></button>
              <p>Ghế thường</p>
            </div>
            <div className="text-center text-sm text-gray-500">
              <button className="normalSeat vipSeat"></button>
              <p>Ghế VIP</p>
            </div>
            <div className="text-center text-sm text-gray-500">
              <button className="normalSeat currentChooseSeat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mx-auto text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </button>
              <p>Ghế đang chọn</p>
            </div>
            <div className="text-center text-sm text-gray-500">
              <button className="normalSeat reservedSeat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p>Ghế đã được mua</p>
            </div>
            <div className="X-icon-button text-center text-sm text-gray-500">
              <button className="normalSeat myReservedSeat">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  style={{ maxWidth: 26 }}
                  className="  mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
              <p>Ghế của bạn</p>
            </div>

            <div className="text-center text-sm text-gray-500">
              <button className="normalSeat otherReservedSeat2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-4 mx-auto text-white sm:w-6 sm:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
                  />
                </svg>
              </button>
              <p>Ghế người khác</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-4 billTicket">
        <div className="d-flex flex-column p-4 shadow-lg border border-warning" style={{ borderRadius: '20px' }}>
          <h4 className="font-weight-bold text-center mb-2">HÓA ĐƠN</h4>
          <div>
            <hr />
            <div className="mt-1 mb-2">
              <h6 className="font-weight-bold" style={{ color: "#ea7246" }}>{listTicket.thongTinPhim?.tenPhim}</h6>
              <p>{listTicket.thongTinPhim?.diaChi}</p>
              <p>{listTicket.thongTinPhim?.tenCumRap}</p>
              <p>
                {listTicket.thongTinPhim?.ngayChieu} - {listTicket.thongTinPhim?.gioChieu}
              </p>
              <p></p>
            </div>
            <hr />
            <div className="mt-1 mb-2">
              <p className="text-muted">Ghế đang chọn</p>
              <div className="d-flex flex-wrap">
                {arrChooseSeat.map((gheDD, index) => {
                  return <span key={index} className="me-2 text-success font-weight-bold mr-1"> {gheDD.tenGhe} </span>
                })}
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
              <p className="font-weight-bold text-success" style={{ fontSize: "25px" }}> {total}đ</p>
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
            <div onClick={() => {
              dispatch(datVe(id))
            }} className="text-center p-3 font-weight-bold text-white" style={{ backgroundColor: '#f17c43', borderRadius: '40px' }}
            >THANH TOÁN
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Button, Form, Input, Space } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { capNhatThongTinNguoiDung, layThongTinNguoiDung } from '../../redux/action/movieAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

export default function InfoUser(props) {
  let dispatch = useDispatch()
  let { userInfo } = props

  const formik = useFormik({

    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      email: userInfo.email,
      soDt: userInfo.soDT,
      maNhom: userInfo.maNhom,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      hoTen: userInfo.hoTen,
    },
    onSubmit: values => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
      })

      for(const val in values){
        if(values[val] !== undefined){
          userInfo = {...userInfo, [val] : values[val]}
        }
      }
      dispatch(capNhatThongTinNguoiDung(userInfo))
    },
  });

  return (
    <>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>Tài khoản</label>
                <input
                  className="form-control form-control-sm"
                  value={userInfo?.taiKhoan || ''}
                  disabled={true}
                  name="taiKhoan"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  className="form-control form-control-sm"
                  defaultValue={userInfo?.hoTen}
                  name="hoTen"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control form-control-sm"
                  defaultValue={userInfo?.email}
                  name="email"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control form-control-sm"
                  defaultValue={userInfo?.soDT}
                  name="soDt"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  className="form-control form-control-sm"
                  defaultValue={userInfo?.matKhau}
                  type="text"
                  name="matKhau"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className='font-weight-bold btn btn-danger btn-sm'>Cập nhật</button>
          </div>
        </form>

      </div>
    </>
  )
}

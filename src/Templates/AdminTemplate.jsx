import React from 'react'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../components/Header/Header'
import { Layout } from 'antd'
import SiderAdmin from '../components/Sider/SiderAdmin'
import Swal from 'sweetalert2'
import { userMovie } from '../ulti/setting'
import { useSelector } from 'react-redux'

export default function AdminTemplate(props) {

  let {userLogin} = useSelector(state => state.movieReducer)

  if (!userLogin || userLogin.maLoaiNguoiDung !== "QuanTri") {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Bạn không có quyền truy cập vào trang quản trị!'
    })
    return <Redirect to='/' />
  }

  return (
    <Route exact path={props.path} render={(propsRoute) => {
      return <Layout>
          <Header {...propsRoute}/>
          <SiderAdmin/>
      </Layout>
  }}
/>
  )
}

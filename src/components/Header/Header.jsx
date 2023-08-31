import React from 'react'
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, userMovie } from '../../ulti/setting';
import { history } from '../../App';

export default function Header() {

    let { userLogin } = useSelector(state => state.movieReducer)

    let styleHeader = {
        position: 'sticky',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: '#fff'
    }

    return (
        <div style={styleHeader}>
            <nav className="navbar navbar-light container">
                <NavLink to="/">
                    <img width={100} src="https://i.imgur.com/njva6pZ.png" alt="" />
                </NavLink>
                {!userLogin ? (
                    <div> <NavLink to='/login'>
                        <Button className='font-weight-bold' danger>Đăng nhập</Button>
                    </NavLink>
                        <NavLink to='/register'>
                            <Button className='font-weight-bold ml-3' type="primary" danger>Đăng ký</Button>
                        </NavLink>
                    </div>) : (<div className='d-flex align-items-center'>
                        <img width={36} className='border border-danger border-2 rounded-circle' src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="" />
                        <span className='font-weight-bold ml-2 d-none d-sm-block'>{userLogin?.taiKhoan}</span>
                        <Button onClick={() => {
                            Swal.fire({
                                text: "Bạn chắc chắn muốn đăng xuất ?",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Đăng xuất'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    localStorage.removeItem(userMovie)
                                    localStorage.removeItem(ACCESS_TOKEN)
                                    Swal.fire(
                                        'Đăng xuất thành công!',
                                        '',
                                        'success'
                                    )
                                    history.push('/login')
                                }
                            })
                        }} className='font-weight-bold ml-3' type="primary" danger>Đăng xuất</Button>
                    </div>
                )
                }
            </nav>
        </div>
    )
}

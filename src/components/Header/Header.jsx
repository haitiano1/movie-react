import React from 'react'
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

export default function Header() {
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
                <div>
                    <NavLink to='/login'>
                        <Button className='font-weight-bold' danger>Đăng nhập</Button>
                    </NavLink>
                    <NavLink to='/register'>
                        <Button className='font-weight-bold ml-3' type="primary" danger>Đăng ký</Button>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

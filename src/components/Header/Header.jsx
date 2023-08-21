import React from 'react'
import { Button } from 'antd';

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
                <img width={100} src="https://i.imgur.com/njva6pZ.png" alt="" />
                <div>
                    <Button className='font-weight-bold' danger>Đăng nhập</Button>
                    <Button className='font-weight-bold ml-3' type="primary" danger>Đăng ký</Button>
                </div>
            </nav>
        </div>
    )
}

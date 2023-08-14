import React from 'react'
import {Button } from 'antd';

export default function Header() {
    
    return (
        <div>
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

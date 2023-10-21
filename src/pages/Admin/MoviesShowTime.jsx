import React from 'react'
import {
    Button,
    Form,
    Input,
    Select
} from 'antd';
import { Content } from 'antd/es/layout/layout';
export default function MoviesShowTime() {
    const film = JSON.parse(localStorage.getItem('film'))
    return (
        <>
            <Content className='container' >
                <div
                className="row"
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    <div className="col-md-4 col-lg-4 col-xl-4">
                        <img
                            src={film.hinhAnh}
                            style={{ width: '100%', objectFit: 'cover' }}
                        />
                        <h5 className='text-center mt-2' style={{color:'#df9338'}}>{film.tenPhim}</h5>
                    </div>
                    <div className="col-md-8 col-lg-8 col-xl-8">

                        <h5 className='text-center mb-4 font-weight-bold'>TẠO LỊCH CHIẾU
                        </h5>
                        <Form
                            className='max-w-full ml-6'
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                            style={{
                                maxWidth: 700,
                                margin: '0 auto'
                            }}
                        >
                            <Form.Item label="Hệ thống rạp">
                                <Input name='taiKhoan' />
                            </Form.Item>
                            <Form.Item label="Cụm rạp">
                                <Input name='matKhau' />
                            </Form.Item>
                            <Form.Item label="Ngày chiếu">
                                <Input name='matKhau' />
                            </Form.Item>
                            <Form.Item label="Giá vé">
                                <Input name='matKhau' />
                            </Form.Item>

                            <hr className='mb-4' />
                            <div className='text-center'>
                                <button type='submit' className='btn btn-danger font-weight-bold'
                                >Thêm người dùng</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Content>
        </>
    )
}

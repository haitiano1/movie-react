import React from 'react'
import {
    Button,
    Form,
    Input,
    Select
} from 'antd';
import { Content } from 'antd/es/layout/layout';

export default function AddUser() {
    return (
        <>
            <Content  >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    <h5 className='text-center mb-4 font-weight-bold'>Thêm Tài Khoản
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
                        <Form.Item label="Tài khoản">
                            <Input name='taiKhoan' />
                        </Form.Item>
                        <Form.Item label="Mật khẩu">
                            <Input name='matKhau' />
                        </Form.Item>
                        <Form.Item label="Họ tên">
                            <Input name='hoTen' />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input name='email' />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input name='soDt' />
                        </Form.Item>
                        <Form.Item label="Loại người dùng">
                            <Select defaultValue="KhachHang">
                                <Select.Option value="KhachHang">Khách hàng</Select.Option>
                                <Select.Option value="QuanTri">Quản trị</Select.Option>
                            </Select>
                        </Form.Item>
                        <hr className='mb-4' />
                        <div className='text-center'>
                            <Button type="primary" danger
                                className='font-weight-bold'
                            >Thêm người dùng</Button>
                        </div>
                    </Form>
                </div>
            </Content>
        </>
    )
}

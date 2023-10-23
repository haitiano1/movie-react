import React from 'react'
import {
    Button,
    Form,
    Input,
    Select
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { themNguoiDung } from '../../redux/action/movieAction';

export default function AddUser() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: 'GP00',
            maLoaiNguoiDung: '',
            hoTen: '',
        },
        onSubmit: (value) => {
            console.log(value)
            dispatch(themNguoiDung(value))
        }
    })
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
                    <Form onSubmitCapture={formik.handleSubmit}
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
                            <Input name='taiKhoan' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Mật khẩu">
                            <Input name='matKhau' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Họ tên">
                            <Input name='hoTen' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input name='email' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input name='soDt' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Loại người dùng">
                            <Select placeholder='Chọn loại người dùng' onChange={(value) => formik.setFieldValue('maLoaiNguoiDung', value)}>
                                <Select.Option value="KhachHang">Khách hàng</Select.Option>
                                <Select.Option value="QuanTri">Quản trị</Select.Option>
                            </Select>
                        </Form.Item>
                        <hr className='mb-4' />
                        <div className='text-center'>
                            <button type='submit' className='btn btn-danger btn-sm font-weight-bold'
                            >Thêm người dùng</button>
                        </div>
                    </Form>
                </div>
            </Content>
        </>
    )
}

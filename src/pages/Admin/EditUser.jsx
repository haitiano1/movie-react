import React, { useEffect } from 'react'
import {
    Button,
    Form,
    Input,
    Select
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAdmin, timKiemNguoiDung } from '../../redux/action/movieAction';
import Swal from 'sweetalert2';

export default function EditUser(props) {
    const { listSearchUsers } = useSelector(state => state.movieReducer);
    const dispatch = useDispatch();
    const id = props.id;

    useEffect(() => {
        const action = timKiemNguoiDung(id);
        dispatch(action);
    }, [id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: listSearchUsers?.length ? listSearchUsers[0].taiKhoan : '',
            matKhau: listSearchUsers?.length ? listSearchUsers[0].matKhau : '',
            email: listSearchUsers?.length ? listSearchUsers[0].email : '',
            soDT: listSearchUsers?.length ? listSearchUsers[0].soDT : '',
            maNhom: 'GP00',
            maLoaiNguoiDung: listSearchUsers?.length ? listSearchUsers[0].maLoaiNguoiDung : '',
            hoTen: listSearchUsers?.length ? listSearchUsers[0].hoTen : ''
        },
        onSubmit: async (value) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cập nhật thành công',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(value)
            await dispatch(capNhatThongTinNguoiDungAdmin(value));
        }
    });
    return (
        <>
            <Content  >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    <h5 className='text-center mb-4 font-weight-bold'>Cập nhật Tài Khoản
                    </h5>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
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
                            <Input name='taiKhoan' value={formik.values.taiKhoan} disabled={true} onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Mật khẩu">
                            <Input name='matKhau' type='password' value={formik.values.matKhau} onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Họ tên">
                            <Input name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input name='email' value={formik.values.email} onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input name='soDT' value={formik.values.soDT} onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Loại người dùng">
                            <Select value={formik.values.maLoaiNguoiDung} onChange={(value) => formik.setFieldValue('maLoaiNguoiDung', value)}>
                                <Select.Option value="KhachHang">Khách hàng</Select.Option>
                                <Select.Option value="QuanTri">Quản trị</Select.Option>
                            </Select>
                        </Form.Item>

                        <hr className='mb-4' />
                        <div className='text-center'>
                            <button type='submit' className='btn btn-danger btn-sm font-weight-bold'
                            >Cập nhật</button>
                        </div>
                    </Form>
                </div>
            </Content>
        </>
    )
}

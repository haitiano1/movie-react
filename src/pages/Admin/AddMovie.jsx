import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinh } from '../../redux/action/movieAction';

export default function AddMovie() {
    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {}
        },
        onSubmit: (values) => {
            console.log(values)

            //tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            console.log('formData', formData.get('File'));
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(themPhimUploadHinh(formData))

        }
    })
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = dayjs(value).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = (e) => {
        //lấy file từ event
        let file = e.target.files[0]
        console.log(file)
        //tạo đối tượng để đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            // console.log(e.target.result)
            setImgSrc(e.target.result)
        }
        //đem dữ liệu file lưu vào formik
        formik.setFieldValue('hinhAnh', file)
    }

    return (
        <>
            <Content  >
                <div style={{ padding: 24, minHeight: 360 }}>
                    <h5 className='text-center mb-4 font-weight-bold'>THÊM PHIM MỚI</h5>
                    <Form onSubmitCapture={formik.handleSubmit}
                        className='max-w-full ml-6' labelCol={{ span: 6 }}
                        wrapperCol={{
                            span: 14,
                        }} layout="horizontal"
                    >
                        <div className='row'>
                            <div className='col-md-6'>
                                <Form.Item label="Tên phim">
                                    <Input name='tenPhim' onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Trailer">
                                    <Input name='trailer' onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <TextArea
                                        style={{ height: 110 }}
                                        name='moTa' onChange={formik.handleChange} />
                                </Form.Item>
                                {/* DD/MM/YYYY */}
                                <Form.Item label="Ngày chiếu">
                                    <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker}  />
                                </Form.Item>

                            </div>
                            <div className='col-md-6'>
                                <Form.Item label="Đang chiếu">
                                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                                </Form.Item>
                                <Form.Item label="Sắp chiếu"   >
                                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                                </Form.Item>
                                <Form.Item label="Phim Hot"  >
                                    <Switch onChange={handleChangeSwitch('hot')} />
                                </Form.Item>
                                {/* Star */}
                                <Form.Item label="Số sao">
                                    <InputNumber onChange={(value) => { formik.setFieldValue('danhGia', value) }} defaultValue={5} min={1} max={10} />
                                </Form.Item>
                                {/* UPLOAD FILE */}
                                <Form.Item label="Hình ảnh">
                                    <label className="custom-file-upload">
                                        <input type="file" onChange={handleChangeFile} />
                                        <UploadOutlined />  Chọn ảnh
                                    </label>
                                    <br />
                                    {imgSrc && <img style={{ width: 200, height: 150 }} src={imgSrc} alt="..." accept="image/png, image/jpeg" />}
                                </Form.Item>

                            </div>
                        </div>
                        {/* ===================== */}
                        <hr className='mb-4' />
                        <div className='text-center'>
                            <button type='submit' className='btn btn-danger font-weight-bold'
                            >Thêm phim</button>
                        </div>

                    </Form>
                </div>
            </Content>
        </>
    )
}

import React, { useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Switch
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinPhim } from '../../redux/action/movieAction';
import { useFormik } from 'formik';
import moment from 'moment';
import dayjs from 'dayjs';
export default function EditMovie() {
    let { movieInfo } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    let { id } = useParams()
    // console.log(id)
    useEffect(() => {
        const action = layThongTinPhim(id);
        dispatch(action);
    }, []);
    // console.log(movieInfo)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: movieInfo.maPhim,
            tenPhim: movieInfo.tenPhim,
            trailer: movieInfo.trailer,
            moTa: movieInfo.moTa,
            ngayKhoiChieu: movieInfo.ngayKhoiChieu,
            dangChieu: movieInfo.dangChieu,
            sapChieu: movieInfo.sapChieu,
            hot: movieInfo.hot,
            danhGia: movieInfo.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = dayjs(value)
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    return (
        <>
            <Content  >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                    }}
                >
                    <h5 className='text-center mb-4 font-weight-bold'>CẬP NHẬT PHIM</h5>
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
                    >
                        <div className='row'>
                            <div className='col-md-6'>
                                <Form.Item label="Tên phim">
                                    <Input name='tenPhim' value={formik.values.tenPhim} onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Trailer">
                                    <Input name='trailer' value={formik.values.trailer} onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <TextArea
                                        style={{ height: 110 }}
                                        name='moTa' value={formik.values.moTa} onChange={formik.handleChange} />

                                </Form.Item>
                                {/* DD/MM/YYYY */}
                                <Form.Item label="Ngày chiếu">
                                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={dayjs(dayjs(formik.values.ngayKhoiChieu).format('DD/MM/YYYY'), 'DD/MM/YYYY')} />
                                </Form.Item>
                            </div>
                            <div className='col-md-6'>
                                <Form.Item label="Đang chiếu" valuePropName="checked" >
                                    <Switch checked={formik.values.dangChieu} onChange={handleChangeSwitch('dangChieu')} />
                                </Form.Item>
                                <Form.Item label="Sắp chiếu" valuePropName="checked"  >
                                    <Switch checked={formik.values.sapChieu} onChange={handleChangeSwitch('sapChieu')} />
                                </Form.Item>
                                <Form.Item label="Phim Hot" valuePropName="checked" >
                                    <Switch checked={formik.values.hot} onChange={handleChangeSwitch('hot')} />
                                </Form.Item>
                                {/* Star */}
                                <Form.Item label="Số sao">
                                    <InputNumber value={formik.values.danhGia} name='danhGia' onChange={formik.handleChange} min={1} max={10} />
                                </Form.Item>
                                {/* UPLOAD FILE */}
                                <Form.Item label="Hình ảnh">
                                    <label className="custom-file-upload">
                                        <input type="file" />
                                        <UploadOutlined />  Chọn ảnh
                                    </label>
                                </Form.Item>

                            </div>
                        </div>
                        <hr className='mb-4' />
                        <div className='text-center'>
                            <button type='submit' className='btn btn-danger font-weight-bold'
                            >Cập nhật</button>
                        </div>
                    </Form>
                </div>
            </Content>
        </>
    )
}

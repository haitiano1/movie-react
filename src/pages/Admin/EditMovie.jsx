import React, { useEffect, useState } from 'react'
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
import { capNhatPhimUpload, layThongTinPhim } from '../../redux/action/movieAction';
import { useFormik } from 'formik';
import moment from 'moment';
import dayjs from 'dayjs';
export default function EditMovie() {
    const [imgSrc, setImgSrc] = useState('')
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
            ngayKhoiChieu: dayjs(movieInfo?.ngayKhoiChieu).format('DD/MM/YYYY'),
            dangChieu: movieInfo.dangChieu,
            sapChieu: movieInfo.sapChieu,
            hot: movieInfo.hot,
            danhGia: movieInfo.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {
            console.log(values)
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhatPhimUpload(formData))
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
    const handleChangeFile = async (e) => {
        //lấy file từ event
        let file = e.target.files[0]
        // console.log(file)
        //đem dữ liệu file lưu vào formik
        await formik.setFieldValue('hinhAnh', file)
        //tạo đối tượng để đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            // console.log(e.target.result)
            setImgSrc(e.target.result)
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
                                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={dayjs(formik.values.ngayKhoiChieu, 'DD/MM/YYYY')} />
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
                                    <InputNumber onChange={(value) => { formik.setFieldValue('danhGia', value) }} value={formik.values.danhGia} min={1} max={10} />
                                </Form.Item>
                                {/* UPLOAD FILE */}
                                <Form.Item label="Hình ảnh">
                                    <label className="custom-file-upload">
                                        <input type="file" onChange={handleChangeFile} />
                                        <UploadOutlined />  Chọn ảnh
                                    </label>
                                    <br />
                                    <input name='hinhAnh' type={'file'} onChange={handleChangeFile} accept="image/png,img/jpeg, img/gift" />
                                    <img src={imgSrc == '' ? movieInfo.hinhAnh : imgSrc} width={200} height={150} />
                                </Form.Item>

                            </div>
                        </div>
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

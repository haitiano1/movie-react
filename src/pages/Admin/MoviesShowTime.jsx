import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { layThongTinCumRapTheoHeThong, layThongTinHeThongRap, taoLichChieu } from '../../redux/action/movieAction';
import { useFormik } from 'formik';

export default function MoviesShowTime(props) {
    const film = JSON.parse(localStorage.getItem('film'));
    const dispatch = useDispatch();
    const { listCinema, listSysCinema } = useSelector((state) => state.movieReducer);
    const [cumRap, setCumRap] = useState('');

    const formik = useFormik({
        initialValues: {
            maPhim: props.id,
            maRap: '',
            ngayChieuGioChieu: '',
            giaVe: 0,
        },
        onSubmit: (value) => {
            console.log('e', value)
            dispatch(taoLichChieu(value))
        }
    })

    useEffect(() => {
        dispatch(layThongTinHeThongRap());
    }, []);

    const handleHeThongRap = (value) => {
        if (value !== '') {
            dispatch(layThongTinCumRapTheoHeThong(value));
            // Reset giá trị của cumRap khi chọn hệ thống rạp mới
            setCumRap('');
        }
    };

    const onChangeCumRap = (value) => {
        // Cập nhật giá trị của cumRap khi chọn cụm rạp
        setCumRap(value);
        formik.setFieldValue('maRap', value)
    };
    const onChangeDate = (value) => {
        console.log(value)
        console.log(
            dayjs(value).format('DD/MM/YYYY HH:mm:ss')
        )
        formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format('DD/MM/YYYY HH:mm:ss'))
    }
    const onOk = (value) => {
        console.log(
            dayjs(value).format('DD/MM/YYYY HH:mm:ss')
        )
        formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format('DD/MM/YYYY HH:mm:ss'))
    }
    const onChangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value)
    }

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    return (
        <>
            <Content className='container'>
                <div className="row" style={{ padding: 24, minHeight: 360, }}>
                    <div className="col-md-4 col-lg-4 col-xl-4">
                        <img src={film.hinhAnh} style={{ width: '100%', objectFit: 'cover' }} alt="Movie Poster" />
                        <h5 className='text-center mt-2' style={{ color: '#fb781cf7' }}>{film.tenPhim}</h5>
                    </div>
                    <div className="col-md-8 col-lg-8 col-xl-8">
                        <h5 className='text-center mb-4 font-weight-bold'>TẠO LỊCH CHIẾU</h5>
                        <Form className='max-w-full ml-6' labelCol={{ span: 6, }} wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{
                                maxWidth: 700,
                                margin: '0 auto',
                            }}
                            onSubmitCapture={formik.handleSubmit}
                        >
                            <Form.Item label="Hệ thống rạp">
                                <Select
                                    showSearch
                                    onChange={handleHeThongRap}
                                    placeholder="Chọn hệ thống rạp"
                                    options={listCinema?.map((htr) => ({ value: htr.maHeThongRap, label: htr.maHeThongRap }))}
                                />
                            </Form.Item>
                            <Form.Item label="Cụm rạp">
                                <Select name='cumRap' onChange={onChangeCumRap} value={cumRap}>
                                    {(!listSysCinema || listSysCinema.length === 0) ? (
                                        <Select.Option value={''}>Vui lòng chọn hệ thống rạp</Select.Option>
                                    ) : (
                                        listSysCinema.map((item, index) => (
                                            <Select.Option key={`${item.maHeThongRap}-${index}`} value={item.maCumRap}>
                                                {item.tenCumRap}
                                            </Select.Option>
                                        ))
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Ngày chiếu">
                                <DatePicker disabledDate={disabledDate} placeholder='Chọn ngày giờ chiếu' format='DD/MM/YYYY HH:mm:ss' onChange={onChangeDate} onOk={onOk} on showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }} />
                            </Form.Item>
                            <Form.Item label="Giá vé" >
                                <InputNumber onChange={onChangeInputNumber} min={75000} max={150000} style={{ width: 250 }} placeholder='Giá vé trong khoảng 75k - 150k'/>
                            </Form.Item>
                            <hr className='mb-4' />
                            <div className='text-center'>
                                <button type='submit' className='btn btn-danger btn-sm font-weight-bold'>
                                    Tạo lịch chiếu
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Content>
        </>
    );
}

import React from 'react'
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

export default function EditMovie() {
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
                                    <Input name='tenPhim' />
                                </Form.Item>
                                <Form.Item label="Trailer">
                                    <Input name='trailer' />
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <TextArea
                                        style={{ height: 110 }}
                                        name='moTa' />
                                </Form.Item>
                                {/* DD/MM/YYYY */}
                                <Form.Item label="Ngày chiếu">
                                    <DatePicker />
                                </Form.Item>

                            </div>
                            <div className='col-md-6'>
                                <Form.Item label="Trạng thái" >
                                    <Radio.Group className='d-flex'>
                                        <Radio value='dangChieu'>Đang chiếu</Radio>
                                        <Radio value='sapChieu'>Sắp chiếu</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="Phim Hot" valuePropName="checked" >
                                    <Switch />
                                </Form.Item>
                                {/* Star */}
                                <Form.Item label="Số sao">
                                    <InputNumber defaultValue={5} min={1} max={10} />
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
                        {/* ===================== */}
                        <hr className='mb-4' />
                        <div className='text-center'>
                            <Button type="primary" danger
                                className='font-weight-bold'
                            >Thêm phim</Button>
                        </div>

                    </Form>
                </div>
            </Content>
        </>
    )
}

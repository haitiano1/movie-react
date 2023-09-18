import { Button, Form, Input, Space } from 'antd';
import React, { useState } from 'react'

export default function InfoUser(props) {
  const { userInfo } = props
  const [componentDisabled, setComponentDisabled] = useState(true);
  const handleChange = (e) => {
    console.log(e)
  };
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Tài khoản">
          <Input
            value={userInfo?.taiKhoan}
            disabled={componentDisabled ? true : true}
            name="taiKhoan"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Họ và tên">
          <Input value={userInfo?.hoTen} name="hoTen" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={userInfo?.email} name="email" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input value={userInfo?.soDT} name="soDt" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            value={userInfo?.matKhau}
            type='password'
            name="matKhau"
            onChange={handleChange}
          />
        </Form.Item>
      </Form>
        <div className="mt-6">
          <Button className='font-weight-bold ml-3' type="primary" danger>Cập nhật</Button>
        </div>
    </div>
  )
}

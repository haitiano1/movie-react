import React from 'react'
import {Space, Spin } from 'antd';
import { useSelector } from 'react-redux';
export default function Loading() {
    const { isLoading } = useSelector(state => state.movieReducer)
    const spinStyle = {
        fontSize: '24px', // Điều chỉnh kích thước của chấm xoay tròn
      };
    
      const dotStyle = {
        backgroundColor: '#f97316', // Đổi màu nền của chấm xoay tròn
      };
    return (
        <>
        {isLoading ? <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <Space>
            <Spin tip="Loading" size="large" style={spinStyle} indicator={
      <div className="ant-spin-dot">
        <i style={dotStyle} className="ant-spin-dot-item" />
        <i style={dotStyle} className="ant-spin-dot-item" />
        <i style={dotStyle} className="ant-spin-dot-item" />
        <i style={dotStyle} className="ant-spin-dot-item" />
      </div>
    }>
    </Spin>
            </Space>
        </div> : ''}
    </>

    )
}

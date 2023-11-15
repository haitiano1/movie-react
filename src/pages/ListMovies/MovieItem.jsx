import React, { useState } from 'react'
import { history } from '../../App.js';
import ModalVideo from 'react-modal-video';
import {Col, Card, Button } from 'antd';

export default function MovieItem(props) {
    const { item } = props;
    const { Meta } = Card;
    const [isOpen, setOpen] = useState(false)
    return (
        <Col key={item.maPhim} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img onClick={() => {
                        history.push(`/detail/${item.maPhim}`);
                    }} alt="example" src={item.hinhAnh} style={{ objectFit: 'cover', height: 400 }} />}
            >
                <div>
                    <Meta onClick={() => {
                        history.push(`/detail/${item.maPhim}`);
                    }} title={item.tenPhim} description={item.moTa.length > 45 ? `${item.moTa.slice(0, 45)}...` : item.moTa} />
                    <div className='absolute bottom-3 w-full left-0 px-4'>
                        <Button className='mt-3 font-weight-bold' type="primary" danger>ĐẶT VÉ</Button>
                    </div>
                </div>
                <button className="btnOpenModalVideo" onClick={() => setOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ maxWidth: 30, textAlign: 'center' }} className="inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                </button>
                <ModalVideo
                    channel='youtube' autoplay isOpen={isOpen}
                    // Regex để lấy ID của URL
                    videoId={item && item.trailer ? (item.trailer.match(/(?:embed\/|watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/) || [])[1] : "https://www.youtube.com/embed/hZL2O2UR6Pw"}
                    onClose={() => setOpen(false)}
                />
            </Card>
        </Col>
    )
}

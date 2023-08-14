import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card,Button } from 'antd';
import { layDanhSachPhim } from '../../redux/action/movieAction.js';
export default function ListMovies() {
    const { Meta } = Card;
    let { listMovies } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        const action = layDanhSachPhim()
        dispatch(action)
    }, [])
    return (
        <div className='text-center mt-5 container'>
            <h3 className='font-weight-bold'>DANH SÁCH PHIM</h3>
            <Row>
                {listMovies.map((item) => (
                    item.dangChieu ? (
                        <Col key={item.maPhim} span={6} className='mt-3'>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={item.hinhAnh} style={{ objectFit: 'cover', height: 400 }} />}
                            >
                                <Meta title={item.tenPhim} description={item.moTa.length > 45 ? `${item.moTa.slice(0, 45)}...` : item.moTa} />
                                <div className='absolute bottom-3 w-full left-0 px-4'>
                                    <Button className='mt-3 font-weight-bold' type="primary" danger>ĐẶT VÉ</Button>
                                </div>
                            </Card>
                        </Col>
                    ) : null
                ))}
            </Row>

        </div>
    )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button } from 'antd';
import { layDanhSachPhimPhanTrang } from '../../redux/action/movieAction.js';
import Pagination from '../Pagination/Pagination.jsx';
import { history } from '../../App.js';
export default function ListMovies() {
    const { Meta } = Card;
    let { listMoviesPagination } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        const action = layDanhSachPhimPhanTrang(1)
        dispatch(action)
    }, [])
    // console.log(listMoviesPagination)
    return (
        <div className='text-center mt-5 container'>
            <h3 className='font-weight-bold mb-3'>DANH SÁCH PHIM</h3>
            <Row gutter={[16, 16]}>
                {listMoviesPagination?.items?.map((item) => (
                    <Col key={item.maPhim} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Card onClick={() => {
                                history.push(`/detail/${item.maPhim}`);
                            }}
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
                ))}
            </Row>
            <Pagination totalPage={listMoviesPagination.totalPages} layDanhSachPhimPhanTrang={layDanhSachPhimPhanTrang} />
        </div>
    )
}

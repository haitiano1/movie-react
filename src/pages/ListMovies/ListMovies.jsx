import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Button, Pagination } from 'antd';
import { layDanhSachPhimPhanTrang } from '../../redux/action/movieAction.js';

import MovieItem from './MovieItem.jsx';

export default function ListMovies() {
    
    let { listMoviesPagination } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    
    useEffect(() => {
        const action = layDanhSachPhimPhanTrang(1)
        dispatch(action)
    }, [])

    return (
        <div className='text-center mt-5 container'>
            <h3 className='font-weight-bold mb-3'>DANH SÁCH PHIM</h3>
            <Row gutter={[16, 16]}>
                {listMoviesPagination?.items?.map((item) => (
                    <MovieItem key={item.maPhim} item={item} />
                ))}
            </Row>
            <Pagination onChange={(soTrang) => {
                const action = layDanhSachPhimPhanTrang(soTrang)
                dispatch(action)
            }} className='text-center mt-3' defaultPageSize={1} total={listMoviesPagination.totalPages} />
        </div>
    )
}

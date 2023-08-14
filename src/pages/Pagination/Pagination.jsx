import React, { useEffect } from 'react'
import { Pagination as PaginationMovie } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimPhanTrang } from '../../redux/action/movieAction';

export default function Pagination() {
    let { listMoviesPagination } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        const action = layDanhSachPhimPhanTrang()
        dispatch(action)
    }, [])
    console.log()
    return (
        <PaginationMovie className='text-center mt-3' defaultPageSize={1} total={listMoviesPagination.totalPages} />
    );
}

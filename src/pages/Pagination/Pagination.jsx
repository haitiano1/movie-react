import React, { memo, useEffect } from 'react'
import { Pagination as PaginationMovie } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimPhanTrang } from '../../redux/action/movieAction';
export default function Pagination({totalPage, layDanhSachPhimPhanTrang}) {
    // let { listMoviesPagination } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        // const action = layDanhSachPhimPhanTrang()
        // dispatch(action)
    }, [])
    return (
        <PaginationMovie onChange={(soTrang) => { 
            const action = layDanhSachPhimPhanTrang(soTrang)
            dispatch(action)
         }} className='text-center mt-3' defaultPageSize={1} total={totalPage} />
    );
}

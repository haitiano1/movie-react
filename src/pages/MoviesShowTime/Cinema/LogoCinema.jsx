import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinHeThongRap, layThongTinLichChieuHeThongRap } from '../../../redux/action/movieAction'
import { Tabs, Button } from 'antd';
import moment from 'moment/moment';
import { history } from '../../../App';

export default function LogoCinema() {

    const [tabPosition, setTabPosition] = useState('left');

    let { listCinema, listShowTimes } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        const action = layThongTinLichChieuHeThongRap()
        dispatch(action)
    }, [])
    return (
        <div className=' mt-4 container mb-5'>
            <h3 className='font-weight-bold text-center mb-3'>CÁC SUẤT CHIẾU</h3>
            <Tabs
                style={{ height: 450 }}
                tabPosition={'left'}
                items={listShowTimes.map((item, index) => {
                    return {
                        label: <img src={item.logo} className='' width={42} height={42} alt={item.maHeThongRap} />,
                        key: index,
                        children: <Tabs
                            style={{ height: 450 }}
                            tabPosition={'left'}
                            items={item.lstCumRap.map((cumRapItem) => {
                                return {
                                    label: <h6 className='text-left' style={{ minWidth: 350 }}>{cumRapItem.tenCumRap}</h6>,
                                    key: cumRapItem.maCumRap === 'glx-nguyen-du\r\n' ? 'glx-nguyen-du' : cumRapItem.maCumRap,
                                    children: <div>
                                        {cumRapItem.danhSachPhim.slice(0, 3).map((item, index) => {
                                            return (<div className='d-flex my-4 ml-2' key={index}>
                                                <img src={item.hinhAnh} alt="" width={80} height='auto' />
                                                <div className='ml-2'>
                                                    <h5>{item.tenPhim}</h5>
                                                    <div>{item.lstLichChieuTheoPhim.slice(0, 4).map((item, index) =>
                                                        <Button danger onClick={()=>{
                                                            history.push(`/checkout/${item.maLichChieu}`)
                                                        }} key={item.maLichChieu} className='mr-2 mt-2'>
                                                            {moment(item.ngayChieuGioChieu).format('hh:mm A')}
                                                        </Button>
                                                    )}</div>
                                                </div>
                                            </div>
                                            )
                                        })}

                                    </div>
                                }
                            })}
                        />
                    };
                })}
            />
        </div>
    )
}

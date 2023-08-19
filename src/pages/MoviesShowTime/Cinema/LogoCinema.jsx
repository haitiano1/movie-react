import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinHeThongRap, layThongTinLichChieuHeThongRap } from '../../../redux/action/movieAction'
import { Tabs } from 'antd';

export default function LogoCinema() {

    const [tabPosition, setTabPosition] = useState('left');

    let { listCinema, listShowTimes } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        const action = layThongTinLichChieuHeThongRap()
        dispatch(action)
    }, [])
    return (
        <div className=' mt-4 container'>
            <h3 className='font-weight-bold text-center'>CÁC SUẤT CHIẾU</h3>
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
                                console.log(cumRapItem.tenCumRap)
                                return {
                                    label: <p>{cumRapItem.tenCumRap}</p>,
                                    key: cumRapItem.maCumRap,
                                    children: "vc"
                                }
                            })}
                        />
                    };
                })}
            />
        </div>
    )
}

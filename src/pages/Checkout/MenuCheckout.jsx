import React, { useState } from 'react'
import { Tabs } from 'antd';
import { RollbackOutlined } from '@ant-design/icons'
import { NavLink, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { userMovie } from '../../ulti/setting';
import Checkout from './Checkout';

export default function MenuCheckout(props) {
  const [activeTab, setActiveTab] = useState('1');
  const [isTab2Enabled, setIsTab2Enabled] = useState(false)

  if (!localStorage.getItem(userMovie)) {
    return <Redirect to='/login' />
  }
  const enableTab2 = () => {
    setIsTab2Enabled(true);
  };
  const onChange = (key) => {
    console.log(key);
    setActiveTab(key);
  };
  const items = [
    {
      key: '1',
      label: <h6><b>CHỌN GHẾ & THANH TOÁN</b></h6>,
      children: <Checkout setActiveTab={setActiveTab} enableTab2={enableTab2} />,
    },
    {
      key: '2',
      label: <h6><b>KẾT QUẢ ĐẶT VÉ</b></h6>,
      disabled: !isTab2Enabled,
      children: <>
        <div className='text-center'>
          <h5 className='mt-2 text-success font-weight-bold'>THANH TOÁN THÀNH CÔNG</h5>
          <img src="https://img.freepik.com/premium-psd/3d-render-cinema-ticket-popup-from-smartphone-with-booking-tickets-onling_252008-537.jpg?w=1380" className='w-50' alt="" />
          <p className='mt-2 text-danger font-weight-bold' style={{ fontSize: '16px' }}>HAINETFLIX CHÚC BẠN XEM PHIM VUI VẺ ^^</p>
          <NavLink to="/">
            <button className="backHome p-2 font-weight-bold text-white cursor-pointer border-0 " style={{ backgroundColor: '#f17c43', borderRadius: '16px', width: '25%' }}>Quay Lại Trang Chủ</button>
          </NavLink>
        </div>
      </>,
    }
  ];
  return (
    <div className='py-5 container'>
      <NavLink to="/">
        <a className='float-right text-danger d-flex align-items-center cursor-pointer font-weight-nomal '><RollbackOutlined className='mr-1' /> Quay về trang chủ</a>
      </NavLink>
      <Tabs activeKey={activeTab} defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

import React from 'react'
import { Tabs } from 'antd';
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import { userMovie } from '../../ulti/setting';
import Checkout from './Checkout';

export default function MenuCheckout(props) {
    if (!localStorage.getItem(userMovie)) {
        return <Redirect to='/login' />
      }
      const onChange = (key) => {
        console.log(key);
      };
    const items = [
        {
          key: '1',
          label: <h6><b>CHỌN GHẾ & THANH TOÁN</b></h6>,
          children: <Checkout/>,
        },
        {
          key: '2',
          label: <h6><b>LỊCH SỬ ĐẶT GHẾ</b></h6>,
          children: 'Content of Tab Pane 2',
        }
      ];
  return (
    <div className='py-5 container'>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

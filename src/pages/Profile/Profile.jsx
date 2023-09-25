import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import InfoUser from './InfoUser';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom'
import { userMovie } from '../../ulti/setting';
import { layThongTinNguoiDung } from '../../redux/action/movieAction';
import BookingHistory from './BookingHistory';

export default function Profile() {

  let {userInfo} = useSelector(state => state.movieReducer)
  let dispatch = useDispatch()

  useEffect(() => {
    const action = layThongTinNguoiDung();
    dispatch(action);
  }, []);

  if (!localStorage.getItem(userMovie)) {
    return <Redirect to='/login' />
  }

  const items = [
    {
      key: '1',
      label: <h6><b>THÔNG TIN NGƯỜI DÙNG</b></h6>,
      children: <InfoUser userInfo={userInfo}/>,
    },
    {
      key: '2',
      label: <h6><b>LỊCH SỬ ĐẶT VÉ</b></h6>,
      children: <BookingHistory userInfo={userInfo}/>,
    }
  ];
  return (
    <div className='py-5 row container mx-auto'>
      <div className="col-3 text-center">
        <img
          className="rounded-full border border-danger"
          width={180}
          src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
          alt="avatar"
        />
        <h4 className="text-lg font-bold text-black dark:text-white mt-2">
        {userInfo?.taiKhoan}
        </h4>
      </div>
      <div className="col-9">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}

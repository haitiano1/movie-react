import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd';
import { TOKEN_CYBER, URL_API } from '../../ulti/setting';
export default function Carousels() {

  let [arrBanner, setBanner] = useState([])

  useEffect(() => {
    getBanner()
  }, [])

  let getBanner = () => {
    const promise = axios({
      method: 'GET',
      url: `${URL_API}QuanLyPhim/LayDanhSachBanner`,
      headers:{
        'TokenCybersoft': TOKEN_CYBER
      }
    })
    promise.then((result) => {
      // console.log(result.data.content)
      setBanner(result.data.content)
    })
    promise.catch((err) => {
      console.log(err)
    })
  }

  let renderBanner = () => {
    return arrBanner.map((item) => {
      return <img key={item.maBanner} src={item.hinhAnh} height={900} alt="" />
    })
  }

  return (
    <div>
      <Carousel autoplay>
        {renderBanner()}
      </Carousel>
    </div>
  )
}
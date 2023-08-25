import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayThongTinChiTietPhim } from '../../redux/action/movieAction'
import { Layout,Button, Rate, Tabs } from 'antd'
import style from "./detail.module.css";
import moment from 'moment';
import '../../assets/circle/circle.css'

export default function DetailMovies(props) {
    let { detailMovies } = useSelector(state => state.movieReducer)
    let dispatch = useDispatch()
    useEffect(() => {
        let { id } = props.match.params
        const action = LayThongTinChiTietPhim(id)
        dispatch(action)
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
    // console.log(detailMovies)
    useEffect(() => {
        const handleResize = () => {
          setIsLargeScreen(window.innerWidth >= 992);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    const items = [
        {
            key: '1',
            label: <h5><b>LỊCH CHIẾU</b></h5>,
            children: (
                <div>
                    {detailMovies.heThongRapChieu?.length ? (
                        <Tabs
                            tabPosition={'left'}
                            items={detailMovies.heThongRapChieu.map((item) => {
                                return {
                                    label: <div className='d-flex align-items-center'>
                                        <img src={item.logo} className='mr-2' width={40} height={42} alt={item.maHeThongRap} />
                                        <h6>{item.maHeThongRap}</h6>
                                    </div>,
                                    key: item.maHeThongRap,
                                    children: item.cumRapChieu.map((rap) => {
                                        return <div key={rap.maCumRap} className='ml-4 d-flex'>
                                            <img src={rap.hinhAnh} className='mr-2 mb-5' width={60} height={90} alt={rap.maCumRap} />
                                            <div className='ml-2'>
                                                <h6>{rap.tenCumRap}</h6>
                                                <p>{rap.diaChi}</p>
                                                <Button className='font-weight-bold' type="primary" danger size='small'>
                                                    {rap.lichChieuPhim.map((lichChieu) => {
                                                        return <>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </>
                                                    })}
                                                </Button>
                                            </div>
                                        </div>
                                    })
                                }
                            })}
                        />
                    ) : (
                        <p className='text-center'>Hiện tại phim chưa có lịch chiếu</p>
                    )}
                </div>
            ),
        },
        {
            key: '2',
            label: <h5><b>THÔNG TIN</b></h5>,
            children: <div>
                <div className='py-3'>
                        <div className="d-flex mb-2">
                            <h6 className='font-bold col-sm-4' >Ngày công chiếu</h6>
                            <p>{moment(detailMovies.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                        </div>
                        <div className="d-flex mb-2">
                            <h6 className='font-bold col-sm-4' >Tình trạng</h6>
                            <p>{detailMovies.sapChieu ? <span className={style.tagDetailSapChieu}>Sắp chiếu</span> : <span className={style.tagDetailDangChieu}>Đang chiếu</span>}</p>
                        </div>
                        <div className="d-flex mb-2">
                            <h6 className='font-bold col-sm-4' >Đạo diễn</h6>
                            <p>John Davis</p>
                        </div>
                        <div className="d-flex mb-2">
                            <h6 className='font-bold col-sm-4' >Diễn viên</h6>
                            <p>Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown</p>
                        </div>
                        <div className="d-flex mb-2">
                            <h6 className='font-bold col-sm-4' >Thể loại</h6>
                            <p>Hành Động, Giả Tưởng</p>
                        </div>
                        <div className="d-flex mb-2">
                            <h6 className='font-bold col-sm-4' >Quốc gia</h6>
                            <p>Mỹ</p>
                        </div>
                    <div>
                        <h6 className='font-weight-bold mb-2'> Nội dung </h6>
                        <p>{detailMovies.moTa}</p>
                    </div>
                    </div>
            </div>
        }
    ]
    return (
        <Layout>
            <div className={style["glass-container"]} style={{ backgroundImage: `url(${detailMovies.hinhAnh})` }}>
                <div className={style.glass}></div>
                <div className={style.content}>
                    <div className="d-flex justify-content-center pt-5">
                        <div className="d-flex text-white">
                            <div className="relative">
                                <img
                                    width={230}
                                    src={detailMovies.hinhAnh}
                                    className="shadow-2xl"
                                    alt=""
                                />
                            </div>
                            <div className="ml-4 max-w-lg" style={{ maxWidth: 500 }}>
                                <p><b>
                                    {moment(detailMovies.ngayKhoiChieu).format(
                                        "DD/MM/yyyy - hh:mm A"
                                    )}
                                </b>
                                </p>
                                <h3 className="mt-3" style={{ fontSize: 30 }}>{detailMovies.tenPhim}</h3>
                                <div className="d-flex my-1">
                                    {detailMovies.hot && (
                                        <div className={`${style.tagDetailHot} mr-3`}>Hot</div>
                                    )}
                                    {detailMovies.dangChieu && (
                                        <div className={`${style.tagDetailDangChieu} mr-3`}>
                                            Đang chiếu
                                        </div>
                                    )}
                                    {detailMovies.sapChieu && (
                                        <div className={style.tagDetailSapChieu}>Sắp chiếu</div>
                                    )}
                                </div>

                                <p
        className={`${isLargeScreen ? 'd-block' : 'd-none'}`}
        style={{ fontSize: 14, marginTop: 15, fontWeight: 'normal' }}
      >
        {detailMovies.moTa}
      </p>
                                <br />
                            </div>
                        </div>
                        <div className="d-flex text-center flex-column mt-4 ml-3 align-items-center">
                            <div className={`c100 p${detailMovies.danhGia * 10} small md:big orange`}>
                                <span>{detailMovies.danhGia / 2}</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                            <div>
                                <Rate className='mt-2 mb-3' style={{ background: "#737070", padding: '2px 7px', borderRadius: 6 }} allowHalf value={detailMovies.danhGia / 2} />
                            </div>
                            <p> <b className='text-white text-warning'>{detailMovies.danhGia * 6} người đánh giá</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs
                className='container'
                style={{ outline: 'none' }}
                defaultActiveKey="1"
                centered
                items={items}
            />
        </Layout>
    )
}

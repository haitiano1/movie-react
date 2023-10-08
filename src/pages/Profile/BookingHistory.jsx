import { Table } from 'antd';
import moment from 'moment';
import React from 'react'

export default function BookingHistory(props) {
    const { userInfo } = props
    const data = userInfo?.thongTinDatVe;

    const columns = [
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
        },
        {
            title: 'Hình ảnh',
            dataIndex: "hinhAnh",
            render: (text, data) => {
                return <img src={text} width={50} />;
            }
        },
        {
            title: "Ngày đặt",
            dataIndex: "ngayDat",
            render: (text, data) => {
                return moment(text).format("DD/MM/YYYY");
            }
        },
        {
            title: "Tên rạp",
            dataIndex: "danhSachGhe",
            render: (text, data) => {
                return text[0].tenHeThongRap;
            }
        },
        {
            title: "Mã vé",
            dataIndex: "maVe",
            value: (text) => <div>{text}</div>
        },
        {
            title: "Tổng tiền",
            dataIndex: "giaVe",
            render: (text, data) => {
                return (text * data.danhSachGhe.length).toLocaleString() + "đ";
            }
        },

    ]
    return (
        <div>
            <Table dataSource={data} columns={columns} rowKey="maVe" />
        </div>
    )
}

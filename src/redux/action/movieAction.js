import axios from "axios";
import { ACCESS_TOKEN, TOKEN_CYBER, URL_API, userMovie } from "../../ulti/setting";
import { getMovies, paginationMovies, login, getCinemas, getShowTimes, getDetailMovies } from "../reducers/movieReducer";
import Swal from 'sweetalert2'
import { history } from "../../App";

export const dangKyAction = (infoUser) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL_API}QuanLyNguoiDung/DangKy`,
                data: infoUser,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Đăng kí thành công. Vui lòng đăng nhập!'
            })
            history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

export const dangNhapAction = (infoUser) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL_API}QuanLyNguoiDung/DangNhap`,
                data: infoUser,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            localStorage.setItem(ACCESS_TOKEN,result.data.content.accessToken)

            localStorage.setItem(userMovie, JSON.stringify(result.data.content))

            const action = login(result.data.content)
            dispatch(action)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Đăng nhập thành công'
            })
            history.push('/')
        } catch (error) {
            // console.log(error.response.data.content)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tài khoản hoặc mật khẩu không đúng!',
            })
        }
    }
}

export const layDanhSachPhim = () => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = getMovies(result.data.content)
            dispatch(action)
        } catch (error) {
        }
    }
}

export const layDanhSachPhimPhanTrang = (soTrang = 2, soPhanTuTrenTrang = 8) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP03&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = paginationMovies(result.data.content)
            dispatch(action)

        } catch (error) {
            console.log(error)
        }
    }
}
export const layThongTinHeThongRap = () => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyRap/LayThongTinHeThongRap`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = getCinemas(result.data.content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}
export const layThongTinLichChieuHeThongRap = () => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP07`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = getShowTimes(result.data.content)
            dispatch(action)
            // console.log(result.data.content)

        } catch (error) {
            console.log(error)
        }
    }
}

export const LayThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = getDetailMovies(result.data.content)
            dispatch(action)
            console.log(result.data.content)

        } catch (error) {
            console.log(error)
        }
    }
}
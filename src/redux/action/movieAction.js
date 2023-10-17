import axios from "axios";
import { ACCESS_TOKEN, TOKEN_CYBER, URL_API, userMovie } from "../../ulti/setting";
import { infoProfileUser, getUser, getMovies, getMovieInfo, paginationMovies, login, getCinemas, getShowTimes, getDetailMovies, getListTicket, bookTickets, loadingReducer } from "../reducers/movieReducer";
import Swal from 'sweetalert2'
import { history } from "../../App";

const getAccessToken = localStorage.getItem(ACCESS_TOKEN)

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
            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken)

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

export const layThongTinNguoiDung = (infoUser) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'POST',
                data: infoUser,
                url: `${URL_API}QuanLyNguoiDung/ThongTinTaiKhoan`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER,
                    'Authorization': "Bearer " + localStorage.getItem(ACCESS_TOKEN)
                }
            });
            dispatch(loadingReducer(false));
            const action = infoProfileUser(result.data.content)
            dispatch(action)

        } catch (error) {
            dispatch(loadingReducer(false));
            console.log(error)
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

export const layThongTinPhim = (id) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            dispatch(loadingReducer(false));
            const action = getMovieInfo(result.data.content)
            dispatch(action)
        } catch (error) {
        }
    }
}

export const layDanhSachPhimPhanTrang = (soTrang = 2, soPhanTuTrenTrang = 8) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP07&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            dispatch(loadingReducer(false));

            const action = paginationMovies(result.data.content)
            dispatch(action)

        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinHeThongRap = () => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyRap/LayThongTinHeThongRap`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            dispatch(loadingReducer(false));
            const action = getCinemas(result.data.content)
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinLichChieuHeThongRap = () => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP07`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            dispatch(loadingReducer(false));
            const action = getShowTimes(result.data.content)
            dispatch(action)
            // console.log(result.data.content)

        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinChiTietPhim = (id) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            dispatch(loadingReducer(false));
            const action = getDetailMovies(result.data.content)
            dispatch(action)

        } catch (error) {
            console.log(error)
        }
    }
}

export const layDanhSachPhongVe = (id) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            dispatch(loadingReducer(false));
            const action = getListTicket(result.data.content)
            // console.log(result.data.content)
            dispatch(action)

        } catch (error) {
            console.log(error)
        }
    }
}

export const datVe = (infoTicket) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL_API}QuanLyDatVe/DatVe`,
                data: infoTicket,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER,
                    'Authorization': "Bearer " + getAccessToken
                }
            });
            dispatch(loadingReducer(false));
            const action = bookTickets(result.data.content)
            dispatch(action)
            dispatch(layDanhSachPhongVe(infoTicket.maLichChieu))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đặt vé thành công!',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            console.log(error);
            dispatch(loadingReducer(false));
        }
    }
};

export const capNhatThongTinNguoiDung = (data) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'PUT',
                url: `${URL_API}QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
                data: data,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER,
                    'Authorization': "Bearer " + getAccessToken
                }
            });
            if (result.status === 200) {
                console.log(result.data.content);
            }
            dispatch(loadingReducer(false));
        } catch (error) {
            console.log(error);
            dispatch(loadingReducer(false));
        }
    }
};

export const layDanhSachNguoiDung = () => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = getUser(result.data.content)
            dispatch(action)
        } catch (error) {
        }
    }
}

export const themPhimUploadHinh = (formData) => {
    return async (dispatch) => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL_API}QuanLyPhim/ThemPhimUploadHinh`,
                data: formData,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            if (result.status === 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Thêm phim thành công'
                  })

                  history.push('/admin/movie')
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export const capNhatPhimUpload = (formData) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'POST',
                url: `${URL_API}QuanLyPhim/CapNhatPhimUpload`,
                data: formData,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER,
                    'Authorization': "Bearer " + getAccessToken
                }
            });
            if (result.status === 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công'
                  })
                  dispatch(loadingReducer(false));
                  history.push('/admin/movie')
            }
        } catch (error) {
            console.log(error);
            dispatch(loadingReducer(false));
        }
    }
};

export const xoaPhim = (id) => {
    return async (dispatch) => {
        dispatch(loadingReducer(true));
        try {
            const result = await axios({
                method: 'DELETE',
                url: `${URL_API}QuanLyPhim/XoaPhim?MaPhim=${id}`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER,
                    'Authorization': "Bearer " + getAccessToken
                }
            });
            dispatch(loadingReducer(false));
            dispatch(layDanhSachPhim())
        } catch (error) {
            console.log(error);
            dispatch(loadingReducer(false));
        }
    }
};
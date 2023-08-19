import axios from "axios";
import { TOKEN_CYBER, URL_API } from "../../ulti/setting";
import { getMovies, paginationMovies, getCinemas, getShowTimes } from "../reducers/movieReducer";

export const layDanhSachPhim = () => {
    // render Mang = mang.map().slice(soTrang = (soTrang - 1) * 8, tongPhanTuMuonLay (soTrang - 1 ) * 8 + 8)
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
                url: `${URL_API}QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,
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
                url: `${URL_API}QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`,
                headers: {
                    'TokenCybersoft': TOKEN_CYBER
                }
            });
            const action = getShowTimes(result.data.content)
            dispatch(action)
            console.log(result.data.content)

        } catch (error) {
            console.log(error)
        }
    }
}
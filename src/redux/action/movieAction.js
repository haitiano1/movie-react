import axios from "axios";
import { TOKEN_CYBER, URL_API } from "../../ulti/setting";
import { getMovies, paginationMovies } from "../reducers/movieReducer";

export const layDanhSachPhim = () => {
    return async (dispatch, getState) => {
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

export const layDanhSachPhimPhanTrang = () => {
    return async (dispatch, getState) => {
        try {
            const result = await axios({
                method: 'GET',
                url: `${URL_API}QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=8`,
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
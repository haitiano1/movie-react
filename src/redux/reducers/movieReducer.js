// rxs
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listMovies: [],
  listMoviesPagination: [],
  listCinema: [],
  listShowTimes: [],
  isLoading: false,
  detailMovies:{},
  userLogin:null
}

const movieReducer = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLogin = action.payload
    },
    getMovies: (state, action) => {
      state.listMovies = action.payload
    },
    getCinemas(state, action) {
      state.listCinema = action.payload
    },
    getShowTimes(state, action) {
      state.listShowTimes = action.payload
    },
    getDetailMovies(state, action) {
      state.detailMovies = action.payload
    },
    paginationMovies(state, action) {
      state.listMoviesPagination = action.payload
    }
  }
});

export const { getMovies, paginationMovies, getCinemas, getShowTimes,getDetailMovies,login } = movieReducer.actions

export default movieReducer.reducer


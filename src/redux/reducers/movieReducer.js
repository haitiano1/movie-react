// rxs
import { createSlice } from '@reduxjs/toolkit'
import { userMovie } from '../../ulti/setting';

let userName = null;
if (localStorage.getItem(userMovie)) {
  userName = JSON.parse(localStorage.getItem(userMovie))
}


const initialState = {
  listMovies: [],
  listMoviesPagination: [],
  listCinema: [],
  listShowTimes: [],
  isLoading: false,
  detailMovies: {},
  userLogin: userName,
  listTicket: {},
  postTickets: {},
  // activeTabs: "1"
}

const movieReducer = createSlice({
  name: "movieReducer",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userLogin = action.payload
    },
    logout: (state, action) => {
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
    getListTicket(state, action) {
      state.listTicket = action.payload
    },
    paginationMovies(state, action) {
      state.listMoviesPagination = action.payload
    },
    bookTickets(state, action) {
      state.postTickets = action.payload
    },
    loadingReducer: (state, action) => {
      state.isLoading = action.payload
    }
  }
});

export const { getMovies, logout, paginationMovies, getCinemas, getShowTimes, getDetailMovies, login, getListTicket, loadingReducer, bookTickets,setActiveTab } = movieReducer.actions

export default movieReducer.reducer


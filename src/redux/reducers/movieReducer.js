// rxs
import { createSlice } from '@reduxjs/toolkit'
import { userMovie } from '../../ulti/setting';

let userName = null;
if (localStorage.getItem(userMovie)) {
  userName = JSON.parse(localStorage.getItem(userMovie))
}


const initialState = {
  listMovies: [],
  movieInfo:{},
  listMoviesPagination: [],
  listCinema: [],
  listShowTimes: [],
  isLoading: false,
  detailMovies: {},
  userLogin: userName,
  listTicket: {},
  postTickets: {},
  userInfo:{},
  listUsers:[],
  listSearchUsers:{}
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
    getMovieInfo: (state, action) => {
      state.movieInfo = action.payload
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
    infoProfileUser(state, action) {
      state.userInfo = action.payload
    },
    loadingReducer: (state, action) => {
      state.isLoading = action.payload
    },
    getUser: (state, action) => {
      state.listUsers = action.payload
    },
    searchUser: (state, action) => {
      state.listSearchUsers = action.payload
    }
  }
});

export const { infoProfileUser,getUser,searchUser, getMovies,getMovieInfo, logout, paginationMovies, getCinemas, getShowTimes, getDetailMovies, login, getListTicket, loadingReducer, bookTickets, setActiveTab } = movieReducer.actions

export default movieReducer.reducer


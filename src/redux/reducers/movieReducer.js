// rxs
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listMovies: [],
    listMoviesPagination: [],
    listCinema: [],
    listShowTimes: [],
    isLoading: false
}

const movieReducer = createSlice({
    name: "movieReducer",
    initialState,
    reducers: {
        getMovies: (state, action) => {
            state.listMovies = action.payload
        },
        getCinemas(state, action) {
            state.listCinema = action.payload
          },
        getShowTimes(state, action) {
            state.listShowTimes = action.payload
          },
        paginationMovies(state, action) {
            state.listMoviesPagination = action.payload
          }
    }
});

export const { getMovies, paginationMovies, getCinemas, getShowTimes } = movieReducer.actions

export default movieReducer.reducer


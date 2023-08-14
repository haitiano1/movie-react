// rxs
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listMovies: [],
    listMoviesPagination: [],
    isLoading: false
}

const movieReducer = createSlice({
    name: "movieReducer",
    initialState,
    reducers: {
        getMovies: (state, action) => {
            state.listMovies = action.payload
        },
        paginationMovies(state, action) {
            state.listMoviesPagination = action.payload
          },
        loadingReducer: (state, action) => {
            state.isLoading = action.payload
        }
    }
});

export const { getMovies, paginationMovies } = movieReducer.actions

export default movieReducer.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieItems: [],
  isLoading: true,
  totalPages: 0,
  currentPage: 1,
  currentSearchPage:1,
  searchText: "",
  apiError: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    replaceMovies(state, action) {
      state.movieItems = action.payload.movieItems;
    },
    setTotalPage(state, action) {
      state.totalPages = action.payload.totalPages;
    },
    incrementPage(state) {
      if(state.searchText){
        state.currentSearchPage++;
        console.log(state.currentSearchPage);
      }
      
    else
      state.currentPage++;
    },
    decrementPage(state) {
      if(state.searchText)
      state.currentSearchPage--;
    else
      state.currentPage--;
    },
    resetCurrentPage(state) {
      state.currentPage = 1;
    },
    resetCurrentSearchPage(state){
      state.currentSearchPage = 1;
    },
    setSearchText(state, action) {
      state.searchText = action.payload.searchText;
    },
    setApiError(state,action){
      state.apiError = action.payload.apiError;
    },
    setIsLoading(state){
      state.isLoading=false;
    }
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;

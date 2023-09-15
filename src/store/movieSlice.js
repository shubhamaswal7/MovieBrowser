import { createSlice } from "@reduxjs/toolkit";

const initialState = {movieItems:[],totalPages:0,currentPage:1,searchText:""}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers:{
    replaceMovies(state,action){
        state.movieItems = action.payload.movieItems;
    },
    setTotalPage(state,action){
      state.totalPages = action.payload.totalPages;
    },
    incrementPage(state){
      state.currentPage++;
    },
    decrementPage(state){
      state.currentPage--;
    },
    resetCurrentPage(state){
      state.currentPage=1;
    },
    setSearchText(state,action){
      state.searchText = action.payload.searchText
    }
  }
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;

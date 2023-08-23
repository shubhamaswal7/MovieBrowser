import { createSlice } from "@reduxjs/toolkit";

const initialState = {movieItems:[]}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers:{
    replaceMovies(state,action){
        state.movieItems = action.payload.movieItems;
    }
  }
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;

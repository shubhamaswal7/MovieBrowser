import React, { useEffect} from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../store/movie-actions";
import classes from "./Movies.module.css";
import { useNavigate } from "react-router-dom";
import { movieActions } from "../store/movieSlice";

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moviesState = useSelector((state) => state.movie);
  const movies = moviesState.movieItems;
  const total_pages = moviesState.totalPages;
  const currentPage = moviesState.currentPage;

  useEffect(() => {
    dispatch(fetchMovieData('',currentPage));
  }, [dispatch,currentPage]);
  console.log(movies);

  const onMovieClickHandler = (movie,index)=>{
    console.log("movie clicked:"+index+"movie:"+movie);
    localStorage.setItem('DetailedMovie',JSON.stringify(movie))
    navigate(`/details/${index}`);
  }

  const onPreviousClickedHandler = ()=>{
     dispatch(movieActions.decrementPage());
  }

  const onNextClickedHandler = ()=>{
    dispatch(movieActions.incrementPage());
  }

  const moviesList = movies.map((movie,index) => (
    <MovieItem
      key={movie.id}
      poster_path={movie.poster_path}
      title={movie.title}
      rating={movie.vote_average}
      description={movie.overview}
      onMovieClick = {()=>onMovieClickHandler(movie,index)}
    />
  ));

  return (
    <div>
     <div style={{display:"flex", justifyContent:"space-between", marginTop:"10px"}}>
      <button onClick={onPreviousClickedHandler} disabled={currentPage===1}>previous</button>
      <button onClick={onNextClickedHandler} disabled={currentPage===total_pages}>next</button>
      </div>
      <ul className={classes.moviesList}>{moviesList}</ul>
    </div>
  );
};

export default Movies;

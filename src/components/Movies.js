import React, { useEffect } from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../store/movie-actions";
import classes from "./Movies.module.css";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moviesState = useSelector((state) => state.movie);
  const movies = moviesState.movieItems;

  useEffect(() => {
    dispatch(fetchMovieData());
  }, [dispatch]);
  console.log(movies);

  const onMovieClickHandler = (movie,index)=>{
    console.log("movie clicekd:"+index+"movie:::"+movie);
    localStorage.setItem('DetailedMovie',JSON.stringify(movie))
    navigate(`/details/${index}`);
  }

  const moviesList = movies.map((movie,index) => (
    <MovieItem
      key={movie.id}
      poster_path={movie.backdrop_path}
      title={movie.title}
      rating={movie.vote_average}
      description={movie.overview}
      onMovieClick = {()=>onMovieClickHandler(movie,index)}
    />
  ));

  return (
    <div>
      <ul className={classes.moviesList}>{moviesList}</ul>
    </div>
  );
};

export default Movies;

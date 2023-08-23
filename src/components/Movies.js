import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../store/movie-actions";
import classes from "./Movies.module.css";
import SearchAndHome from "./SearchAndHome";

const Movies = () => {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movie);
  const movies = moviesState.movieItems;

  useEffect(() => {
    dispatch(fetchMovieData());
  }, [dispatch]);
  console.log(movies);

  const moviesList = movies.map((movie) => (
    <MovieItem
      key={movie.id}
      poster_path={movie.backdrop_path}
      title={movie.title}
      rating={movie.vote_average}
      description={movie.overview}
    />
  ));

  return (
    <div>
      <ul className={classes.moviesList}>{moviesList}</ul>
    </div>
  );
};

export default Movies;

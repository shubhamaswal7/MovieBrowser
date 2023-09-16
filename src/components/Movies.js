import React, { useEffect } from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../store/movie-actions";
import classes from "./Movies.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moviesState = useSelector((state) => state.movie);
  const movies = moviesState.movieItems;
  const currentPage = moviesState.currentPage;
  const searchText = moviesState.searchText;
  const apiError = moviesState.apiError;

  useEffect(() => {
    console.log("Search text:" + searchText);
    dispatch(fetchMovieData(searchText, currentPage));
  }, [dispatch, currentPage, searchText]);
  console.log(movies);

  const onMovieClickHandler = (movie, index) => {
    console.log("movie clicked:" + index + "movie:" + movie);
    localStorage.setItem("DetailedMovie", JSON.stringify(movie));
    navigate(`/details/${index}`);
  };

  const moviesList = movies.map((movie, index) => (
    <MovieItem
      key={movie.id}
      poster_path={movie.poster_path}
      title={movie.title}
      rating={movie.vote_average}
      description={movie.overview}
      onMovieClick={() => onMovieClickHandler(movie, index)}
    />
  ));

  return (
    <div>
      <Pagination />
       {apiError && <section style={{textAlign:"center"}}>
        <h2>{apiError}</h2>
      </section>}
      <ul className={classes.moviesList}>{moviesList}</ul>
    </div>
  );
};

export default Movies;

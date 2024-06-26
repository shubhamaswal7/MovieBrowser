import React, { useEffect } from "react";
import MovieItem from "./MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../store/movie-actions";
import { InfinitySpin } from "react-loader-spinner";
import classes from "./Movies.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moviesState = useSelector((state) => state.movie);
  const movies = moviesState.movieItems;
  const currentPage = moviesState.currentPage;
  const currentSearchPage = moviesState.currentSearchPage;
  const searchText = moviesState.searchText;
  const apiError = moviesState.apiError;
  const isLoading = moviesState.isLoading;

  useEffect(() => {
    console.log("Search text:" + searchText);
    if (searchText) dispatch(fetchMovieData(searchText, currentSearchPage));
    else dispatch(fetchMovieData(searchText, currentPage));
  }, [dispatch, currentPage, currentSearchPage, searchText]);
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
      <div className={classes.background}>
        {apiError && (
          <section style={{ textAlign: "center" }}>
            <h1
              style={{
                display: "inline-block",
                color: "white",
                backgroundColor: "black",
              }}
            >
              {apiError}
            </h1>
          </section>
        )}
        <ul className={classes.moviesList}>{moviesList}</ul>
      </div>
      {isLoading && <div className={classes.InfinitySpin}>
        <InfinitySpin
          visible={true}
          width="200"
          color="blue"
          ariaLabel="infinity-spin-loading"
        />
      </div>}
      
    </div>
  );
};

export default Movies;

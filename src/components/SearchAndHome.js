import React, { useState } from "react";
import Header from "../layout/Header";
import home_icon from "../assets/home_icon.png";
import classes from "./SearchAndHome.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieData } from "../store/movie-actions";
import { movieActions } from "../store/movieSlice";

const SearchAndHome = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movie);
  const currentPage = moviesState.currentPage;

  const onSearchHandler = (event) => {
    event.preventDefault();

    console.log("search" + searchText);
    dispatch(movieActions.setSearchText({searchText:searchText}));
    dispatch(fetchMovieData(searchText,currentPage));
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    const search_value = event.target.value;
    setSearchText(search_value);
    dispatch(movieActions.setSearchText({searchText:search_value}));
    console.log(search_value);

    if (search_value.length > 1) dispatch(fetchMovieData(search_value,currentPage));
    else dispatch(fetchMovieData());
  };

  const onHomeClickHandler = () => {
    setSearchText("");
    dispatch(movieActions.setSearchText({searchText:""}));
    dispatch(movieActions.resetCurrentPage());
    dispatch(fetchMovieData());
  };

  return (
    <Header>
      <form onSubmit={onSearchHandler} className={classes.form}>
        <div className={classes.search_container}>
          <svg
            className={classes.search_icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.707,20.293l-4.944-4.944a8.932,8.932,0,1,0-1.414,1.414l4.944,4.944a1,1,0,1,0,1.414-1.414ZM10,16a6,6,0,1,1,6-6A6.006,6.006,0,0,1,10,16Z" />
          </svg>
          <input
            className={classes.search}
            type="text"
            id="search"
            name="search"
            label="Search"
            placeholder="Search"
            value={searchText}
            onChange={onChangeHandler}
          ></input>
        </div>
      </form>
      <img
        className={classes.home}
        src={home_icon}
        onClick={onHomeClickHandler}
      ></img>
    </Header>
  );
};

export default SearchAndHome;

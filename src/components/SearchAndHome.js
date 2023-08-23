import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import classes from "./SearchAndHome.module.css";
import { useDispatch } from "react-redux";
import { movieActions } from "../store/movieSlice";
import { fetchMovieData } from "../store/movie-actions";

const SearchAndHome = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  
  const [error, setError] = useState(null);

  const onSearchHandler = (event) => {
    event.preventDefault();

    console.log("search" + searchText);

    dispatch(fetchMovieData(searchText));
  };

  const onChangeHandler = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
    console.log(searchText);
  };

  return (
    <Header>
      <form onSubmit={onSearchHandler} className={classes.search}>
        <input
          type="text"
          id="search"
          name="search"
          value={searchText}
          onChange={onChangeHandler}
        ></input>
      </form>
      <p className={classes.home}>HOME</p>
    </Header>
  );
};

export default SearchAndHome;

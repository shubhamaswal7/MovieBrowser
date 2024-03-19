import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../store/movieSlice";
import classes from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movie);
  const total_pages = moviesState.totalPages;
  const currentPage = moviesState.currentPage;
  const currentSearchPage = moviesState.currentSearchPage;

  console.log(
    "total pages:" +
      total_pages +
      " current page:" +
      currentPage +
      " current search page:" +
      currentSearchPage
  );

  const onPreviousClickedHandler = () => {
    dispatch(movieActions.decrementPage());
  };

  const onNextClickedHandler = () => {
    dispatch(movieActions.incrementPage());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <button
        className={classes.button}
        onClick={onPreviousClickedHandler}
        disabled={currentPage === 1 && currentSearchPage === 1}
      >
        Previous
      </button>
      <button
        className={classes.button}
        onClick={onNextClickedHandler}
        disabled={
          currentPage === total_pages || currentSearchPage === total_pages
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

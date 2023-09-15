import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../store/movieSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const moviesState = useSelector((state) => state.movie);
  const total_pages = moviesState.totalPages;
  const currentPage = moviesState.currentPage;

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
      <button onClick={onPreviousClickedHandler} disabled={currentPage === 1}>
        previous
      </button>
      <button
        onClick={onNextClickedHandler}
        disabled={currentPage === total_pages}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;

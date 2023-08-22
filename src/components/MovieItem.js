import React from "react";
import classes from "./MovieItem.module.css";

const MovieItem = (props) => {
  const poster_path = props.poster_path;
  const title = props.title;
  const rating = props.rating;
  const description = props.description;

  console.log(poster_path);

  return (
    <li className={classes.movie}>
      <img
        src={"https://image.tmdb.org/t/p/w300" + poster_path}
        className={classes.img}
      />
      <div className={classes.movie_details}>
        <div className={classes.title_rating}>
          <div className={classes.title}>{title}</div>
          <div>({rating})</div>
        </div>
        <p className={classes.description}>{description}</p>
      </div>
    </li>
  );
};

export default MovieItem;

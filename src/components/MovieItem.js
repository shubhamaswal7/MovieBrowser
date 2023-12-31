import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MovieItem.module.css";
import defaultMoviePoster from "../assets/default_movie_poster.jpg";

const MovieItem = (props) => {
  const poster_path = props.poster_path;
  const title = props.title;
  const rating = props.rating;
  const description = props.description;
  const index = props.index;

  //   console.log(poster_path);
  var img_src = defaultMoviePoster;
  if (poster_path != null) {
    img_src = "https://image.tmdb.org/t/p/w300" + poster_path;
  }

  return (
    <li className={classes.movie} onClick={props.onMovieClick}>
      <img src={img_src} height="250px" className={classes.img} />
      <div className={classes.movie_details}>
        <div className={classes.title_rating}>
          <div className={classes.title}>{title}</div>
          <div className={classes.rating}>({rating})</div>
        </div>
        <p className={classes.description}>{description}</p>
      </div>
    </li>
  );
};

export default MovieItem;

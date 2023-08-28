import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";
import { useNavigate } from "react-router-dom";
import defaultMoviePoster from "../../assets/default_movie_poster.jpg";
import home_icon from "../../assets/home_icon.png";
import classes from "./MovieDetails.module.css"

const MovieDetails = () => {
    const navigate = useNavigate();
  const params = useParams();
  const { movieIndex } = params;

  const detailedMovie = JSON.parse(localStorage.getItem("DetailedMovie"));
  console.log(detailedMovie);


  const {
    poster_path,
    title,
    vote_average,
    overview,
    release_date,
    length,
    director,
  } = detailedMovie;

  var img_src = defaultMoviePoster;
  if (poster_path != null) {
    img_src = "https://image.tmdb.org/t/p/w300" + poster_path;
  }

  const onHomeClickHandler = ()=>{
    navigate("/");
  }

  return (
    <div>
      <Header className={classes.header}>
        <h4>Movie Details</h4>
        <img
          className={classes.home}
          src={home_icon}
          onClick={onHomeClickHandler}
        ></img>
      </Header>
      <div className={classes.container}>
        <img src={img_src} className={classes.poster}/>
        <div>
          <div className={classes.title}>
            {title} ({vote_average})
          </div>
          <div className={classes.details}>
            {release_date} | {length} | {director}
          </div>
          <div className={classes.description}>
            Description: {overview}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

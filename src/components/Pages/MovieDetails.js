import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";
import { useNavigate } from "react-router-dom";
import defaultMoviePoster from "../../assets/default_movie_poster.jpg";
import home_icon from "../../assets/home_icon.png";
import classes from "./MovieDetails.module.css";

const MovieDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [length, setLength] = useState("");
  const [castAndCrew, setCastAndCrew] = useState({
    cast1: "",
    cast2: "",
    cast3: "",
    director: "",
  });
  const [error, setError] = useState(null);

  const detailedMovie = JSON.parse(localStorage.getItem("DetailedMovie"));
  console.log(detailedMovie);

  const { poster_path, title, vote_average, overview, release_date, id } =
    detailedMovie;

  const release_year = release_date.substring(0, 4);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=beba125a266beaef025e6d8d755c2386"
      );

      if (!response.ok) {
        throw new Error("Something went wrong" + response.status);
      }

      const responseData = await response.json();
      console.log(responseData.runtime);
      setLength(
        "0" +
          Math.floor(responseData.runtime / 60) +
          ":" +
          (responseData.runtime % 60)
      );
    };

    fetchDetails().catch((error) => {
      setError(error.message);
    });

    const fetchCastandCrew = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/credits?api_key=beba125a266beaef025e6d8d755c2386"
      );

      if (!response.ok) {
        throw new Error("Something went wrong" + response.status);
      }

      const responseData = await response.json();
       console.log(responseData);
       const directors = responseData.crew.map(item=>{
           if(item.job === "Director"){
              return item.name;
           }
           return "";
       })
      setCastAndCrew({
        cast1: responseData.cast[0].name,
        cast2: responseData.cast[1].name,
        cast3: responseData.cast[2].name,
        director: directors
      });
    };

    fetchCastandCrew().catch((error) => {
      setError(error.message);
    });
  }, []);

  if (error) {
    return (
      <section className={classes.mealsError}>
        <h3>{error}</h3>
      </section>
    );
  }

  var img_src = defaultMoviePoster;
  if (poster_path != null) {
    img_src = "https://image.tmdb.org/t/p/w300" + poster_path;
  }

  const onHomeClickHandler = () => {
    navigate("/");
  };

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
        <img src={img_src} className={classes.poster} />
        <div>
          <div className={classes.title}>
            {title} ({vote_average})
          </div>
          <div className={classes.details}>
            Year : {release_year} | Length : {length} | Director : {castAndCrew.director}
          </div>
          <div className={classes.cast}>
            Cast:{" "}
            {castAndCrew.cast1 +
              ", " +
              castAndCrew.cast2 +
              ", " +
              castAndCrew.cast3 +
              ", ..."}
          </div>
          <div className={classes.description}>Description: {overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

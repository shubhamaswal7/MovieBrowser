import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";
import { useNavigate } from "react-router-dom";
import defaultMoviePoster from "../../assets/default_movie_poster.jpg";
import home_icon from "../../assets/home_icon.png";
import classes from "./MovieDetails.module.css";
import { AUTH_TOKEN, BASE_URL, IMAGE_URL } from "../../constants/api_constants";

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

  var url = BASE_URL + "movie/" + id;
  const release_year = release_date.substring(0, 4);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: AUTH_TOKEN,
        },
      });

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
      const response = await fetch(url + "/credits", {
        headers: {
          accept: "application/json",
          Authorization: AUTH_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!" + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
      const directors = responseData.crew.map((item) => {
        if (item.job === "Director") {
          return item.name;
        }
        return "";
      });
      const cast = responseData.cast
      setCastAndCrew({
        cast1: cast[0].name,
        cast2: cast[1].name,
        cast3: cast[2].name,
        director: directors,
      });
    };

    fetchCastandCrew().catch((error) => {
      setError(error.message);
    });
  }, []);

  if (error) {
    return (
      <section>
        <h3>{error}</h3>
      </section>
    );
  }

  var img_src = defaultMoviePoster;
  if (poster_path != null) {
    img_src = IMAGE_URL + poster_path;
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
            Year : {release_year} | Length : {length} | Director :{" "}
            {castAndCrew.director}
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

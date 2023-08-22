import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import classes from "./Movies.module.css"

const Movies = () => {
    const [movies,setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=beba125a266beaef025e6d8d755c2386"
      );

      if (!response.ok) {
        throw new Error("Oops Something went wrong!!" + response.status);
      }

      const responseData = await response.json();
      const movieData = responseData.results;

      setMovies(movieData);
    
      console.log(movieData);
    };
    fetchMovies().catch((error) => {
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

  const moviesList = movies.map((movie)=>(
    <MovieItem key={movie.id} poster_path={movie.backdrop_path} title={movie.title} rating={movie.vote_average} description={movie.overview} />
  )) 

  return <div>
    <ul className={classes.moviesList}>
        {moviesList}
    </ul>
  </div>
};

export default Movies;

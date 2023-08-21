import React, { useEffect, useState } from "react";

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
    <section key={movie.id}>
        <div> {movie.title}</div>
        <div> {movie.description}</div>
        <hr/>
    </section>
    
  )) 

  return <div>
    <ul>
        {moviesList}
    </ul>
  </div>
};

export default Movies;

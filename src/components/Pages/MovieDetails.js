import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";

const MovieDetails = ()=>{
    const params = useParams();
    const {movieIndex} = params;
   
     const detailedMovie = JSON.parse(localStorage.getItem('DetailedMovie'));
     console.log(detailedMovie);

    return(
        <div>
            <Header>
               <h1>Movie Details</h1>
            </Header>
            <div>{detailedMovie.title}</div>
        </div>
    )
}

export default MovieDetails;
import { movieActions } from "./movieSlice";
import { BASE_URL, AUTH_TOKEN } from "../constants/api_constants";

var url = BASE_URL + "movie/upcoming?language=en-US";

export const fetchMovieData = (searchText, pageNumber) => {
  console.log("Search :" + searchText);
  if (searchText) {
    url = BASE_URL + "search/movie?query=" + searchText;
  } else {
    url = BASE_URL + "movie/upcoming?language=en-US";
  }

  if (pageNumber) {
    url += "&page=" + pageNumber;
    console.log(url);
  }
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: AUTH_TOKEN,
        },
      });

      if (!response.ok) {
        throw new Error("Oops Something went wrong!!" + response.status);
      }

      const responseData = await response.json();
      const movieData = responseData.results;
      console.log(responseData.total_pages);
      dispatch(
        movieActions.setTotalPage({
          totalPages: responseData.total_pages,
        })
      );
      return movieData;
    };

    try {
      const movieData = await fetchData();
      dispatch(
        movieActions.replaceMovies({
          movieItems: movieData || [],
        })
      );
    } catch (error) {
      console.log(error);
       if(error.message === "Failed to fetch")
       dispatch(
        movieActions.setApiError({
          apiError: "TMDB Api does not work with Reliance/Jio network. Try using another network or VPN"
        })
      );
      else
      dispatch(
        movieActions.setApiError({
          apiError: error.message,
        })
      );
    }
  };
};

import { movieActions } from "./movieSlice";

var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=beba125a266beaef025e6d8d755c2386";
export const fetchMovieData = (searchText,pageNumber)=>{
    console.log("Search :"+searchText)
    if(searchText){
        url = "https://api.themoviedb.org/3/search/movie?query="+searchText+"&api_key=beba125a266beaef025e6d8d755c2386";
    }
    else{
        url = "https://api.themoviedb.org/3/movie/upcoming?api_key=beba125a266beaef025e6d8d755c2386";
    }

    if(pageNumber){
        url += "&page="+pageNumber;
        console.log(url);
    }
    return async (dispatch)=>{
        const fetchData = async()=>{
            const response = await fetch(
                url
              );
        
              if (!response.ok) {
                throw new Error("Oops Something went wrong!!" + response.status);
              }
        
              const responseData = await response.json();
              const movieData = responseData.results;
              console.log(responseData.total_pages);
              dispatch(movieActions.setTotalPage({
                 totalPages:responseData.total_pages
              }))
              return movieData;
        };

        try {
            const movieData = await fetchData();
            dispatch(movieActions.replaceMovies({
                movieItems:movieData || []
            }));
        } catch (error) {
            console.log(error);
        }
    }
}
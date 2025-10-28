import {   useEffect, useState } from "react";
import { fetchGenres, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies } from "../services/api"
import { MovieContext } from "./Context";
interface MoviesProviderProps {
  children: React.ReactNode;
}
export const MoviesProvider = ({children } :MoviesProviderProps)=>{
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    // UI/logic states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovieId, setSelectedMovieId] = useState<null | number>(null);


    useEffect(() => {
    const fetchMoviesData  = async () => {
        try {
        setLoading(true);
        setError(null);
        const [trending , popular , topRated , genreList ]= await Promise.all([
            fetchTrendingMovies(),
            fetchPopularMovies(),
            fetchTopRatedMovies(),
            fetchGenres()
        ])
        setTrendingMovies(trending)
        setPopularMovies(popular)
        setTopRatedMovies(topRated)
        setGenres(genreList)
      } catch (err ) {
        if(err instanceof Error){
          setError(err.message);
        }else{
          setError("Failed to load movies")
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, []);

   const openMoviesDetails = (movieId : number)=>{
        setSelectedMovieId(movieId)
        document.body.style.overflow = "hidden"
   }
   const closeMoviesDetails = ()=>{
        setSelectedMovieId(null)
        document.body.style.overflow = ""
   }


  return <MovieContext.Provider value={{trendingMovies,popularMovies,topRatedMovies,genres,loading,error ,selectedMovieId,openMoviesDetails,closeMoviesDetails}}>{children}</MovieContext.Provider>

  
}

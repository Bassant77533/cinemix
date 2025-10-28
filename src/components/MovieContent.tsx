import GenreSection from "./GenreSection"
import HeroSection from "./HeroSection"
import MoviesDetails from "./MoviesDetails"
import MovieSlider from "./MovieSlider"
import { useMovies } from "../context/Context"
const MovieContent = () => {
  const { trendingMovies ,closeMoviesDetails ,  popularMovies  , topRatedMovies, selectedMovieId ,error} = useMovies() ; 
  if(error){
    return <div> error loading movies </div>
  }
  return (
   
    <>
      <HeroSection/>
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-950">
        <MovieSlider 
        title = "Trending Movies This Week " 
        subtitle = "stay updated with what everyone is watching this week "
        movies = {trendingMovies} 
        id = "trending "
        />
        <MovieSlider 
        title = "Popular Movies " 
        subtitle = "most watched movies right now "
        movies = {popularMovies} 
        id = "Popular "
        />
         <GenreSection/>
        <MovieSlider 
        title = "Top Rated " 
        subtitle = "highest rated movies "
        movies = {topRatedMovies} 
        id = "top-rated  "
        />
       

      </div>
      {selectedMovieId && 
      <MoviesDetails selectedMovieId={selectedMovieId} 
      closeMoviesDetails ={()=>closeMoviesDetails()}
      />}
    </>
  )
}

export default MovieContent

import { Eye, Star } from "lucide-react"
import {  useEffect, useState } from "react"
import { useMovies, type Genre, type Movie} from "../context/Context";
import { fetchMoviesByGenre, getImageURL } from "../services/api";

const GenreSection = () => {
    const {loading , error , genres ,openMoviesDetails} = useMovies() ; 
    const [loadingGenre , setLoadingGenre ]= useState(false); 
    const [selectedGenre , setSelectedGenre ]= useState<Genre | null >(null);
    const [movies , setMovies] = useState<Movie[]>([]) ; 
    useEffect(()=>{
        if(movies.length > 0 || !loading  ){
            setSelectedGenre(genres[0]) ; 
        }
    },[loading ,movies.length, genres])

    useEffect(()=>{
        const fetchmovies = async()=>{
            if(!selectedGenre) return ; 
            setLoadingGenre(true); 
            const moviesList  = await fetchMoviesByGenre(selectedGenre.id) 
            setMovies(moviesList) ; 
            setLoadingGenre(false); 
        }
        fetchmovies() ; 
    } , [selectedGenre])
    console.log(selectedGenre)

    if (loadingGenre) {
    return (
      <div className="fixed inset-0 bg-neutral-900/95 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 border border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4">Loading movie Genres...</p>
        </div>
      </div>
    );
  }

    if (error) {
    return (
      <div className="fixed inset-0 bg-neutral-900/95 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Failed to load movie Genres</p>
          <p className="text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }
return (
    <section className='py-12 bg-neutral-900/50' id=''>
        <div className = "container mx-auto md:px-10 px-4">
            <div className="md:text-3xl text-2xl font-bold mb-6">
                <h2>Browse by Genre</h2>
                <div className="mb-8 overflow-x-auto pb-2">
                    <div className="flex space-x-2 min-w-max mt-5">
                    {
                        genres.slice(0,10).map((genre , index )=> 
                        <button key={genre.id} 
                        onClick={()=>setSelectedGenre(genres[index])}
                        className={` px-4 py-2 rounded-md  transition-colors text-sm cursor-pointer ${selectedGenre?.id === genre.id ? "bg-purple-500  text-white hover:bg-purple-500" : "bg-neutral-800 text-neutral-300"} 
                        hover:bg-neutral-700
                        `}>
                            {genre.name}
                        </button>
                        )
                    }
                    </div>
                </div>
            </div>
            {/*conditional rendering */}
            {
             loading ? 
                <div className="h-64 flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin">
                    </div>
                </div>
            </div> 
            : <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {/*map method*/}
                    {
                        movies.slice(0,8).map((movie , index)=>
                        <div key={index} onClick={() => openMoviesDetails(movie.id)}>
                        <div className="group cursor-pointer">
                        <div className="relative rounded-lg overflow-hidden bg-neutral-800">
                            <div className="aspect-[2/3]">
                                <img src={getImageURL(movie.poster_path)} alt='' className='w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35'/>
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40
                                duration-300 transition-all group-hover:opacity-100 opacity-0 flex flex-col justify-end p-4
                                ">
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-1 items-center"><Star fill="#f0b100" size={16} stroke="none"/><span className="text-sm font-medium text-yellow-500">{movie.vote_average.toFixed(1)}</span></div>
                                        <span className="text-sm font-medium text-neutral-400">{movie.release_date.slice(0,4)}</span>
                                    </div>
                                    <button className="flex items-center justify-center gap-1 transition-all text-sm bg-purple-600 hover:bg-purple-700 cursor-pointer p-3 rounded mt-3">
                                        <Eye />
                                        View details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h3 className="text-white text-sm font-medium truncate">
                        {movie.title}
                        </h3>
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-1 items-center"><Star fill="#f0b100" size={16} stroke="none"/><span className="text-xs font-medium text-yellow-500">{movie.vote_average.toFixed(1)}</span></div>
                            <span className="text-xs font-medium text-neutral-400">{movie.release_date.slice(0,4)}</span>
                        </div>
                    </div>
                        </div>
                        )
                    }
                </div>}
        </div>
    </section>
)
}

export default GenreSection










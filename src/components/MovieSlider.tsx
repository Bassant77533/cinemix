import { CircleChevronLeft, CircleChevronRight ,Star,Eye } from 'lucide-react';
import { useMovies, type Movie } from '../context/Context';
import { getImageURL } from '../services/api';
import { useRef, useState } from 'react';

interface ImovieSliderProps  {
    title : string  ;
    subtitle : string  ;
    movies : Movie[] ; 
    id : string ; 
}
const MovieSlider = ( { title , subtitle ,  movies ,id } : ImovieSliderProps ) => {
    
    const sliderRef = useRef(null) ; 
    const [isScrolling , setIsScrolling ] = useState(false) ; 
    const [hoverMovieId , setHoverMoviesId] = useState<number | null >(null) 
    const {openMoviesDetails } = useMovies() ; 
    const scroll = (direction : string )=>{
        if(isScrolling) return ; 
        setIsScrolling(true) ; 
        const {current} = sliderRef ; 
        const scrollAmount = direction == "left" ? 
        -current.clientWidth   * 0.75 : current.clientWidth * 0.75
        current.scrollBy ({
            left : scrollAmount , 
            behavior: "smooth"
        }); 

        setTimeout(() => {
            setIsScrolling(false)
        }, 500);
    }   

    const handleMovieClick = (movieId : number) => {
        openMoviesDetails(movieId) ; 
    }
    if(! movies || movies.length === 0 ){
        return null ; 
    }
    return (
        <section className='py-12' id={id}>
            <div className="container mx-auto md:px-10 px-4">
                <div className='flex items-baseline justify-between mb-8'>
                    <div className='text-white text-2xl md:text-3xl font-bold'>
                        <h2>{title}</h2>
                        {/*conditional rendering */}
                        <p className='text-sm text-neutral-400 mt-1'>{subtitle}</p>
                    </div>
                    <div className='flex space-x-2'>
                        <button onClick={()=> scroll("left")} className='rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all ' aria-label='scroll left'>
                            <CircleChevronLeft/>
                        </button>
                        <button  onClick={()=> scroll("right")} className=' rounded-full bg-neutral-800/70 hover:bg-neutral-700 text-white transition-all ' aria-label='scroll right'>
                            <CircleChevronRight/>
                        </button>
                    </div>
                </div>
                {/*movies slider*/}
                <div className='relative'>
                    <div className='flex space-x-4 overflow-x-hidden scroll-bar-hide pb-4 snap-x ' ref={sliderRef} style={{  scrollBehavior : "smooth", scrollbarWidth : "none" , msOverflowStyle : "none"}}
                    
                    >
                    { movies.map((movie , index )=>
                    <div key={index} className='min-w-[200px] md:min-w-[240px] snap-start relative group cursor-pointer'
                    onMouseEnter={()=> setHoverMoviesId(movie.id)}
                    onMouseLeave={()=> setHoverMoviesId(null) }
                    onClick = {()=> handleMovieClick(movie.id)}
                    
                    >
                            <div className='rounded-lg overflow-hidden bg-neutral-800'>
                                <div className='relative aspect-[2/3]'>
                                    <img src= {getImageURL(movie.poster_path)}alt='' className='w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-35'/>
                                    {/*hover overlay*/}
                                    <div
                                    className='absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40
                                    to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300'
                                    >
                                        <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300
                                        space-y-3'>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center space-x-1'>
                                                    <Star fill='#d7c820' stroke='none' size={14} />
                                                    <span className='text-sm font-medium text-yellow-400'>{movie.vote_average.toFixed(1)}</span>
                                                </div>
                                                <span className='text-neutral-400 text-sm'>{movie.release_date.substring(0,4)}</span>
                                            </div>
                                            <button onClick={()=>handleMovieClick(movie.id)} className='w-full bg-purple-600 hover:bg-purple-700
                                            text-white py-3 rounded-md flex items-center justify-center gap-1 transition-all text-sm '>
                                                <Eye />
                                                View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*movies info*/}
                            <div className='mt-3'>
                                <h3>{movie.title}</h3>
                                <div className='flex items-center justify-between'>
                                    <div className='flex item-center'>
                                        <Star fill='#d7c820' stroke='none' size={14} />
                                        <span className='text-xs font-medium text-neutral-400'>{movie.vote_average.toFixed(1)}</span>
                                    </div>
                                    <span className='text-neutral-500 text-xs'>{movie.release_date.substring(0,4)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MovieSlider

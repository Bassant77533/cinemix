
import { Star ,CirclePlay,Plus   } from 'lucide-react';
import  {useMovies}   from '../context/Context';
import { useEffect, useState } from 'react';
import { getImageURL } from '../services/api';

const HeroSection = () => {
  const {trendingMovies , loading } = useMovies(); 
  const [currentSlide , setCurrentSlide ]= useState(0)
  const [isTransitioning , setIsTransitioning] = useState(false)
  const featuredMovies = trendingMovies.slice(0,10)

  useEffect(()=>{
    if(loading ||  featuredMovies.length  === 0  ) return ; 
    const interval = setInterval(() => {
      setIsTransitioning(true) 
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1  % featuredMovies.length)
        setIsTransitioning(false)
      }, 500);
    },  8000);

    return ()=> clearInterval(interval)
  },[loading , featuredMovies.length])

  if(loading ||  featuredMovies.length === 0  ){
    return (
        <div className="animate-pulse  ">
          <div className="mx-auto w-16 h-16 border border-purple-500 border-t-transparent rounded-full animate-spin">
          </div>
          loading movies details
        </div>
    )
  }
  const currentMovie = featuredMovies[currentSlide]
  const formatRating = (rating : number)=>{
    return ((Math.round(rating * 10 ) / 10).toFixed(1))
  }
  return (
    <div className=" relative min-h-screen  ">
      {/*movies backdrop*/}
      <div className={`  absolute inset-0 bg-cover bg-center bg-neutral-900 transition-all duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      style={{backgroundImage : `url(${getImageURL(currentMovie.backdrop_path)}) `}}>
        {/* gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/70   to-transparent'/>
        <div className='absolute inset-0 bg-gradient-to-r from-neutral-900 to-transparent'/>
      </div>

      {/*content*/}
      <div className=" absolute flex items-center inset-0 z-10 mx-auto  md:px-10  container  ">
        <div className='px-3 max-w-3xl'>
          {/*movies info*/}
          <div className={`transition-all duration-700 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
            <div className=' flex items-center space-x-3 mb-4 '>
                  <span className="   text-xs px-2 py-1 font-semibold rounded-sm  uppercase bg-purple-500/90  ">featured</span>
                  {/*conditional rendering */}
                  {currentMovie.vote_average > 0 &&  
                  <div className='gap-1 flex items-center'>
                  <Star fill='#fdc700' stroke='none' />
                  <span>  {formatRating(currentMovie.vote_average)}</span>
                  </div>
                  }
                  {/*conditional rendering close*/}
                  <span className='text-neutral-400'>.</span>
                  <span className='text-sm text-neutral-300'>{currentMovie.release_date.substring(0,4) ||" N/A"}</span>
                  {/*conditional rendering*/}
                  {currentMovie.adult && <>
                   <span className='text-neutral-400'>.</span>
                  <span className='bg-neutral-700 text-neutral-300 text-xs px-11.5 py-0.5  '>18+</span>
                  </>}
                  {/*conditional rendering close*/}
            </div>
          </div>
          <>
            <div className=' text-4xl md:text-6xl font-bold mb-4'>{currentMovie.title}</div>
            <p className='capitalize text-neutral-300  text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-4 max-w-2xl'>{currentMovie.overview}</p>
          </>
          <div className='flex flex-wrap gap-4'>
            <button className='bg-purple-600 hover:bg-purple-700 text-white  px-6 py-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer  '>
              <CirclePlay />
              Watch Now
              </button>
            <button className='bg-neutral-800/80 hover:bg-neutral-700/80 px-6 py-3 rounded-lg flex items-center gap-2 transition-all cursor-pointer border-neutral-600'>
              <Plus />
              Add to Watch List</button>
          </div>
        </div>
      </div>
      {/*pagination*/}
      <div className='absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10'>
        {featuredMovies.map((_,index)=>{
           return(
            <button 
              onClick={
                
                ()=>{
                  setIsTransitioning(true)
                  setTimeout(() => {
                    setCurrentSlide(index)
                    setIsTransitioning(false)
                  }, 500);
                }
              }
              
             key={index}  className={`h-1.5 rounded-full transition-all ${currentSlide === index ? "w-8 bg-purple-500 " : "bg-neutral-600/50 w-8" } `}></button>
          );
           })}
      </div>
    </div>
  )
}

export default HeroSection

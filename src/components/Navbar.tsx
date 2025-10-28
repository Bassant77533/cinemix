import { Search ,Menu } from 'lucide-react';
import { useMovies, type Movie } from '../context/Context';
import {  useEffect, useRef, useState } from 'react';
import { getImageURL, searchMovie } from '../services/api';

const Navbar = () => {
    const {trendingMovies  , openMoviesDetails} = useMovies();
    console.log(trendingMovies)
    const [isScrolledY , setIsScrolledY] = useState(false) ; 
    const [isMobileMenuOpen , setisMobileMenuOpen] = useState(false); 
    const[searchQuery , setsearchQuery] = useState("")
    const[searchResult , setsearchResult] = useState<Movie[]>([])
    const[isSearching , setisSearching] = useState(false)
    const [showSearchResult , setshowSearchResult] = useState(true)
    const searchContainerRef = useRef(null) ; 
    useEffect(()=>{
        const handleScroll = ()=>{
            setIsScrolledY(window.scrollY > 10)
        }
        window.addEventListener("scroll" , handleScroll) ; 
        return ()=> window.removeEventListener("scroll" , handleScroll)
    },[])
    useEffect(() =>{
        const handleSearch = async ()=>{
            if(searchQuery.trim().length > 2 ){
                setisSearching(true) ; 
                try{
                    const result = await searchMovie(searchQuery) ; 
                    setsearchResult(result ? result.slice(0,5) : []  )
                }   
                catch(error){
                    console.log(error || "error occured ")
                }finally{
                    setshowSearchResult(true)
                    setisSearching(false)
                }
            }else{
                
                setshowSearchResult(false)
                setsearchResult([])
            }
        }
      const timerbouncer =  setTimeout( ()=>{
         handleSearch()
       },500)
       return ()=>{clearTimeout(timerbouncer)}
    } , [searchQuery])

    const handleSearchFocus = () => {
        if(searchQuery.trim().length > 2 && searchResult.length > 0 ){
            setshowSearchResult(true)
        }
    }

// useEffect(() => {
//   const handleClickOutside = (e : MouseEvent) => {
//     console.log(e)
//     if (
//       searchContainerRef.current &&
//       !searchContainerRef.current.contains(e.target)
//     ) {
//       setshowSearchResult(false);
//     }
//   };

//   // Attach listener
//   document.addEventListener("mousedown", handleClickOutside);

//   // Cleanup on unmount
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);


return (
    <div className={`fixed w-full z-50 transition-all duration-300  ${isScrolledY ?  "bg-neutral-900/95 backdrop:-blur-md shadow-lg " : "bg-transparent" } `}>
        <div className="px-3 container mx-auto md:px-10   py-4">
        <div className='flex justify-between items-center'>
                <div className='flex items-center '>
                    <a href="">
                        <p className='text-3xl font-extrabold text-white'>
                            <span className='text-purple-500'>Cine</span>Mix
                        </p>
                    </a>
                </div>
                {/*desktop nav*/}
                <nav className=' gap-7 hidden md:flex '>
                    <a  href = "#"  className='text-white hover:text-purple-500 transition-all duration-200 font-medium' > Home</a>
                    <a   href="#trending" className='text-white hover:text-purple-500 transition-all duration-200 font-medium' >Trending</a>
                    <a   href=""  className='text-white hover:text-purple-500 transition-all duration-200 font-medium'>Popular</a>
                    <a href="" className='text-white hover:text-purple-500 transition-all duration-200 font-medium'>Top Rated</a>
                </nav>
                {/*desktop search*/}
                <div className='relative hidden  md:block search-container  '>
                    <input 
                    onFocus={handleSearchFocus}
                    value={searchQuery} 
                    onChange={(e)=>{setsearchQuery(e.target.value)}}
                    className='bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all
                    duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500' type="text" placeholder="search movies..." ref={searchContainerRef}/>
                    <div className='absolute right-2 top-3 -translate-y-1.5 text-white'><Search /></div>
                    {/*search result dropdown conditional rendering*/}
                    {!isSearching && showSearchResult && searchResult && searchResult.length > 0  &&
                    <div className='absolute mt-2 w-72 right-0 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50 '>
                        <ul>
                            {
                                searchResult.map((movie , index)=>
                                <li 
                                onClick={ () => {openMoviesDetails(movie.id) ;  setsearchQuery("")} }
                                key={index} className='hover:bg-neutral-700 divide-y'>
                                <button className='flex items-center p-3 w-full text-left'>
                                    <div className='w-10 h-10 bg-neutral-700 rounded overflow-hidden flex-shrink-0'>
                                        {/*conditional rendering*/}             
                                        <img src={getImageURL(movie.backdrop_path)} alt="" className='w-full h-full object-cover' />   
                                        <div className='w-full h-full items-center justify-center text-neutral-500
                                        text-xs'>
                                            <p>No Image</p>
                                        </div>
                                    </div>
                                    <div className='ml-3 flex-1'>
                                        <p className='text-sm font-medium text-white truncate'>{movie.title}</p>
                                        <p className=''>{movie.release_date.slice(0,4)} </p>
                                    </div>
                                </button>
                            </li>)
                            }
                        </ul>
                    </div>}
                    {/*conditional rendering*/}
                      { !isSearching && showSearchResult && searchQuery.trim().length > 0 && (!searchResult || searchResult.length === 0 ) && 
                        (  <div className='absolute right-0 mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50 '>
                            <div className='p-4 text-center text-neutral-400 text-sm'>
                                No movies found matching....
                            </div>
                        </div>)}
                </div>
                {/*Mobile icon*/}
                <button className='md:hidden text-white' onClick={ () => setisMobileMenuOpen (!isMobileMenuOpen)}>
                    <Menu/>
                </button>
            </div>
        {/*Mobile menu*/}
        { isMobileMenuOpen && <div className=' mt-4 pb-4 space-y-4 md:hidden'>
        <nav className='flex flex-col space-y-6'>
            <a  href = ""  className='text-white hover:text-purple-500 transition-all duration-200 font-medium' > Home</a>
            <a   href="" className='text-white hover:text-purple-500 transition-all duration-200 font-medium' >Trending</a>
            <a   href=""  className='text-white hover:text-purple-500 transition-all duration-200 font-medium'>Popular</a>
            <a href="" className='text-white hover:text-purple-500 transition-all duration-200 font-medium'>Top Rated</a>
        </nav>
            <div className='relative mt-3  md:hidden search-container  '>
            <input 
            value={searchQuery} 
            onFocus={handleSearchFocus}
            onChange={(e)=>{setsearchQuery(e.target.value)}}
            className='w-full bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm   transition-all
            duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ' type="text" placeholder="search movies..." ref={searchContainerRef}/>
            <div className='absolute right-2 top-3 -translate-y-1.5 text-white'><Search /></div>

            {/*mobile search result*/}
               {
               !isSearching && searchResult && searchResult.length > 0 && 
                 <div className='absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50 '>
                        <ul>
                             {
                                searchResult.map((movie , index)=>
                                <li 
                                onClick={ () => {openMoviesDetails(movie.id) ;  setsearchQuery("")} }
                                key={index} className='hover:bg-neutral-700 divide-y'>
                                <button className='flex items-center p-3 w-full text-left'>
                                    <div className='w-10 h-10 bg-neutral-700 rounded overflow-hidden flex-shrink-0'>
                                        {/*conditional rendering*/}             
                                        <img src={getImageURL(movie.backdrop_path)} alt="" className='w-full h-full object-cover' />   
                                        <div className='w-full h-full items-center justify-center text-neutral-500
                                        text-xs'>
                                            <p>No Image</p>
                                        </div>
                                    </div>
                                    <div className='ml-3 flex-1'>
                                        <p className='text-sm font-medium text-white truncate'>{movie.title}</p>
                                        <p className=''>{movie.release_date.slice(0,4)} </p>
                                    </div>
                                </button>
                            </li>)
                            }
                        </ul>
                        
                </div>
                }
                {
                    !isSearching && showSearchResult && searchQuery.trim().length > 0 && (!searchResult || searchResult.length === 0 ) && 
                    <div className='absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50 '>
                            <div className='p-4 text-center text-neutral-400 text-sm'>
                                No movies found matching....
                    </div>
                </div>
                }
            </div>
        </div>}
        </div>
    </div>
)
}

export default Navbar

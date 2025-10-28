
import {  createContext, useContext } from "react";


export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  adult : boolean ; 
  runtime ? : number ; 
  genres ?: Genre[];
  origin_country: string[];
  original_language: string;
  original_title: string;
  popularity: number;
  tagline: string | null;
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  production_countries: ProductionCountry[];
  revenue: number;
  budget : number ; 
  status : string ; 
  vote_count: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}


interface MovieContextType {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
  selectedMovieId: number | null;
  openMoviesDetails: (movieId: number) => void;
  closeMoviesDetails: () => void;
}


export const MovieContext  = createContext<MovieContextType | undefined>(undefined) ; 


export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used inside a MoviesProvider");
  }
  return context;

}
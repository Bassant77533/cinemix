import { Eye, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMovieDetails, getImageURL } from "../services/api";
import type { Movie } from "../context/Context";

interface MovieDetailsProps {
  selectedMovieId: number;
  closeMoviesDetails?: () => void ;
}

const MovieDetails = ({ selectedMovieId, closeMoviesDetails }: MovieDetailsProps) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(selectedMovieId)
  // 🧠 Fetch movie details
  useEffect(() => {
    if (!selectedMovieId) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const movieDetails = await fetchMovieDetails(selectedMovieId);
        setMovie(movieDetails);
      } catch (err: any) {
        console.error("Error loading movie details", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [selectedMovieId]);

  // 🕒 Format helpers
  const formatRunTime = (minutes: number | undefined) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatRating = (rating: number) =>
    (Math.round(rating * 10) / 10).toFixed(1);

  const formatRevenue = (revenue: number) => {
    if (!revenue) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(revenue);
  };

  // ❌ No movie selected
  if (!selectedMovieId) return null;

  // ⏳ Loading State
  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-900/95 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 border border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4">Loading movie details...</p>
        </div>
      </div>
    );
  }

  // ⚠️ Error State
  if (error) {
    return (
      <div className="fixed inset-0 bg-neutral-900/95 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-bold mb-2">Failed to load movie details</p>
          <p className="text-neutral-400">{error}</p>
          <button
            onClick={closeMoviesDetails}
            className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main Render
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-neutral-900/95 backdrop-blur-sm  p-4 
    " onClick={closeMoviesDetails}>
      <div className=" ">
          <div className="relative w-full   max-w-5xl bg-neutral-800 rounded-lg shadow-xl  h-200 overflow-auto
          
          "onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={closeMoviesDetails}
          className="cursor-pointer absolute top-4 right-4 z-10 w-10 h-10  rounded-full bg-neutral-700/80 text-white hover:bg-neutral-600/80"
        >
          ✕
        </button>

        {/* Header Image */}
        <div className="relative h-72 md:h-96 w-full">
          {movie.backdrop_path ? (
            <img
              src={getImageURL(movie.backdrop_path)}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 via-neutral-800/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 -mt-32 md:-mt-48 relative flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="w-40 md:w-64 flex-shrink-0">
            {movie.poster_path ? (
              <img
                src={getImageURL(movie.poster_path)}
                alt=""
                className="rounded-lg shadow-lg border border-neutral-700"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-neutral-700 flex items-center justify-center text-neutral-400">
                No poster
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie.title}{" "}
              <span className="text-neutral-400 font-normal ml-2">
                ({movie.release_date.slice(0, 4)})
              </span>
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm items-center">
              <div className="flex items-center">
                <Star fill="yellow" stroke="none" size={14} />
                <span className="ml-1 font-medium">
                  {formatRating(movie.vote_average)}
                </span>
              </div>
              <span className="text-neutral-300">{  formatRunTime(movie.runtime)}</span>
              {movie.adult && (
                <span className="bg-red-500/80 text-white px-2 py-0.5 rounded text-xs">
                  18+
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres &&  movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-xs"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Tagline & Overview */}
            <p className="text-neutral-400 mt-4 italic">"{movie.tagline}"</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-neutral-300">{movie.overview}</p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3 flex-wrap">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Eye /> Watch Now
              </button>
              <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                <Plus /> Add to Watchlist
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <p>
              <span className="text-neutral-400">Production </span>
              <p>{movie.production_companies.map((c) => c.name).join(", ")}</p>
            </p>
            <p>
              <span className="text-neutral-400">Languages </span>
              <p>{movie.spoken_languages.map((l) => l.name).join(", ")}</p>
            </p>
            <p>
              <span className="text-neutral-400">Budget  </span>
              <p>{formatRevenue(movie.budget)}</p>
            </p>
            <p>
              <span className="text-neutral-400">Revenue </span>
              <p>{formatRevenue(movie.revenue)}</p>
            </p>
            <p>
              <span className="text-neutral-400">Status </span>
              <p>{movie.status}</p>
            </p>
          </div>

          {/* Rating */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Rating</h2>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {formatRating(movie.vote_average)}
                </span>
              </div>
              <p className="text-neutral-300">{movie.vote_count} votes</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="p-8 flex gap-4">
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded"
          >
            Official Website
          </a>
          {movie.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 rounded"
            >
              View on IMDb
            </a>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieDetails;

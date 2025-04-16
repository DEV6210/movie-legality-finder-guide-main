
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { searchMovies, SearchResult } from "@/utils/api";

const FreeMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await searchMovies("popular", 1);
        
        if (result.Response === "True" && result.Search) {
          // Take only the first 4 movies
          const featuredMovies = result.Search.slice(0, 4).map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            imageUrl: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster",
            rating: (Math.random() * 2 + 7).toFixed(1), // Random rating between 7.0 and 9.0
            platform: getPlatform(movie.imdbID)
          }));
          
          setMovies(featuredMovies);
        } else {
          setError("Failed to load movies");
        }
      } catch (err) {
        setError("Error fetching movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, []);

  // Helper to assign a random platform to each movie
  const getPlatform = (id: string) => {
    const platforms = [
      {
        name: "YouTube",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/120px-YouTube_full-color_icon_%282017%29.svg.png",
      },
      {
        name: "JioCinema",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/JioCinema_logo.svg/120px-JioCinema_logo.svg.png",
      },
      {
        name: "MX Player",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/MX_Player_Logo.png/120px-MX_Player_Logo.png",
      }
    ];
    
    // Use the last character of the ID to select a platform (pseudo-random but deterministic)
    const index = parseInt(id.charAt(id.length - 1), 16) % platforms.length;
    return platforms[index];
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Free Movies on OTT Platforms" 
          subtitle="Watch these quality movies legally without spending a penny"
        />
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <MovieCard
                  title={movie.title}
                  imageUrl={movie.imageUrl}
                  rating={Number(movie.rating)}
                  platform={movie.platform}
                />
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/free-movies">
            <button className="text-accent hover:text-accent/80 font-medium flex items-center gap-1 mx-auto">
              View all free movies <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeMovies;

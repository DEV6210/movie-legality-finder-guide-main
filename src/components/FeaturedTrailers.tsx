
import { useState, useEffect } from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Link } from "react-router-dom";
import { searchMoviesByType, SearchResult } from "@/utils/api";

const FeaturedTrailers = () => {
  const [trailers, setTrailers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const result = await searchMoviesByType("2024", "movie", 1);
        
        if (result.Response === "True" && result.Search) {
          // Take only the first 4 trailers
          const featuredTrailers = result.Search.slice(0, 4).map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            thumbnail: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/500x300?text=No+Poster",
            platform: getPlatform(movie.imdbID),
            release: "2024"
          }));
          
          setTrailers(featuredTrailers);
        } else {
          setError("Failed to load trailers");
        }
      } catch (err) {
        setError("Error fetching trailers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrailers();
  }, []);

  // Helper to assign a platform based on movie ID
  const getPlatform = (id: string) => {
    const platforms = [
      "HBO Max", "Disney+", "Netflix", "Prime Video"
    ];
    
    // Use the last character of the ID to select a platform (pseudo-random but deterministic)
    const index = parseInt(id.charAt(id.length - 1), 16) % platforms.length;
    return platforms[index];
  };

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="New Trailers & OTT Releases" 
          subtitle="Watch the latest movie trailers and discover upcoming OTT releases"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trailers.map((trailer) => (
              <Link to={`/movie/${trailer.id}`} key={trailer.id}>
                <div className="relative group rounded-lg overflow-hidden hover-scale">
                  <div className="aspect-video relative">
                    <img 
                      src={trailer.thumbnail} 
                      alt={trailer.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  
                  <div className="py-3">
                    <h3 className="font-medium text-base">{trailer.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-muted-foreground">{trailer.platform}</span>
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                        {trailer.release}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/trailers">
            <button className="text-accent hover:text-accent/80 font-medium flex items-center gap-1 mx-auto">
              View all trailers <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrailers;

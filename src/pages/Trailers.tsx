
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, PlayCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { searchMoviesByType, SearchResult } from "@/utils/api";
import { Input } from "@/components/ui/input";

const Trailers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMoviesByType(searchQuery || "new", "movie", 1);
      setSearchResults(results);
      setPage(1);
      
      if (results.Response === "False") {
        setError(results.Error || "No results found");
      }
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Search for new movies for trailers
        const results = await searchMoviesByType("2024", "movie", 1);
        setSearchResults(results);
        
        if (results.Response === "False") {
          setError(results.Error || "No results found");
        }
      } catch (err) {
        setError("Failed to load trailers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Handle pagination
  const loadMoreTrailers = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    try {
      setLoading(true);
      const newResults = await searchMoviesByType(searchQuery || "new", "movie", nextPage);
      
      if (newResults.Response === "True" && newResults.Search && searchResults?.Search) {
        setSearchResults({
          ...newResults,
          Search: [...searchResults.Search, ...newResults.Search]
        });
      } else if (newResults.Response === "False") {
        setError("No more trailers to load");
      }
    } catch (err) {
      setError("Failed to load more trailers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Platform data
  const platforms = [
    "HBO Max", "Disney+", "Netflix", "Prime Video", "Paramount+", "Apple TV+"
  ];
  
  // Map search results to display format
  const getTrailers = () => {
    if (!searchResults?.Search) return [];
    
    return searchResults.Search.map(movie => {
      // Assign random platform and future release year
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const releaseYear = Math.random() > 0.5 ? "2024" : "2025"; // Either 2024 or 2025
      
      return {
        id: movie.imdbID,
        title: movie.Title,
        thumbnail: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/500x300?text=No+Poster",
        platform: randomPlatform,
        release: releaseYear,
        description: `Watch the official trailer for ${movie.Title}. Coming to ${randomPlatform} in ${releaseYear}.`
      };
    });
  };

  const trailers = getTrailers();

  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Latest Movie Trailers" 
              subtitle="Watch the newest trailers for upcoming movie releases"
            />
            
            {/* Search bar */}
            <div className="mb-8">
              <div className="flex gap-2 max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for movie trailers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full"
                />
                <button 
                  onClick={handleSearch}
                  className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>Search</span>
                </button>
              </div>
              
              {error && (
                <p className="text-destructive text-sm mt-2 text-center">{error}</p>
              )}
            </div>
            
            {loading && trailers.length === 0 ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {trailers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trailers.map((trailer) => (
                      <div key={trailer.id} className="group">
                        <Link to={`/movie/${trailer.id}`}>
                          <div className="relative rounded-lg overflow-hidden hover-scale mb-3">
                            <div className="aspect-video">
                              <img 
                                src={trailer.thumbnail} 
                                alt={trailer.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <PlayCircle className="h-16 w-16 text-white" />
                            </div>
                          </div>
                        </Link>
                        
                        <h3 className="font-medium text-lg mb-1">{trailer.title}</h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">{trailer.platform}</span>
                          <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                            {trailer.release}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{trailer.description}</p>
                        
                        <div className="mt-3 flex justify-between items-center">
                          <Link to={`/movie/${trailer.id}`}>
                            <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                              Watch trailer <ArrowRight className="h-3 w-3" />
                            </button>
                          </Link>
                          <Link to={`/ott-reviews`}>
                            <button className="text-accent hover:text-accent/80 text-sm font-medium">
                              Where to watch?
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No trailers found. Try searching for different movies.</p>
                  </div>
                )}
                
                {searchResults?.Search && searchResults.Search.length > 0 && !error && (
                  <div className="mt-8 text-center">
                    <button 
                      onClick={loadMoreTrailers}
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-2 rounded-md"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Load More Trailers"
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default Trailers;

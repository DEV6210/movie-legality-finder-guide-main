
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import MovieCard from "@/components/MovieCard";
import { Link } from "react-router-dom";
import { searchMovies, SearchResult } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FreeMovies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");
  const [activePlatform, setActivePlatform] = useState("all");
  const [page, setPage] = useState(1);

  // Platforms data
  const platforms = [
    {
      id: "youtube",
      name: "YouTube",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/120px-YouTube_full-color_icon_%282017%29.svg.png",
    },
    {
      id: "jiocinema",
      name: "JioCinema",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/JioCinema_logo.svg/120px-JioCinema_logo.svg.png",
    },
    {
      id: "mxplayer",
      name: "MX Player",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/MX_Player_Logo.png/120px-MX_Player_Logo.png",
    },
  ];

  // Sample genres and languages - in a real app, these would be extracted from the API results
  const genres = ["Action", "Drama", "Sci-Fi", "Thriller", "Comedy"];
  const languages = ["English", "Hindi", "Tamil", "Telugu"];

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchMovies(searchQuery || "free", page);
      setSearchResults(results);
      
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
        // Search for free movies (using a generic term that should return results)
        const results = await searchMovies("free", 1);
        setSearchResults(results);
        
        if (results.Response === "False") {
          setError(results.Error || "No results found");
        }
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Handle pagination
  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    try {
      setLoading(true);
      const newResults = await searchMovies(searchQuery || "free", nextPage);
      
      if (newResults.Response === "True" && newResults.Search && searchResults?.Search) {
        setSearchResults({
          ...newResults,
          Search: [...searchResults.Search, ...newResults.Search]
        });
      } else if (newResults.Response === "False") {
        setError("No more movies to load");
      }
    } catch (err) {
      setError("Failed to load more movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Map search results to display format with random platform assignment
  const getMovies = () => {
    if (!searchResults?.Search) return [];
    
    return searchResults.Search.map(movie => {
      // Assign random platform, genre and language
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
      
      return {
        id: movie.imdbID,
        title: movie.Title,
        imageUrl: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster",
        rating: (Math.random() * 2 + 7).toFixed(1), // Random rating between 7.0 and 9.0
        platform: {
          name: randomPlatform.name,
          logo: randomPlatform.logo
        },
        genre: randomGenre,
        language: randomLanguage
      };
    });
  };

  const movies = getMovies();
  
  // Apply filters
  const filteredMovies = movies.filter(movie => {
    const genreMatch = activeGenre === "all" || movie.genre === activeGenre;
    const languageMatch = activeLanguage === "all" || movie.language === activeLanguage;
    const platformMatch = activePlatform === "all" || movie.platform.name === activePlatform;
    
    return genreMatch && languageMatch && platformMatch;
  });

  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Free Movies on OTT Platforms" 
              subtitle="Watch these quality movies legally without spending a penny"
            />
            
            {/* Search bar */}
            <div className="mb-8">
              <div className="flex gap-2 max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for free movies..."
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
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Filter by:</h3>
              
              <div className="space-y-4">
                {/* Genre filters */}
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Genre</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activeGenre === "all" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                      }`}
                      onClick={() => setActiveGenre("all")}
                    >
                      All
                    </button>
                    {genres.map(genre => (
                      <button 
                        key={genre}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activeGenre === genre ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                        }`}
                        onClick={() => setActiveGenre(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Language filters */}
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Language</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activeLanguage === "all" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                      }`}
                      onClick={() => setActiveLanguage("all")}
                    >
                      All
                    </button>
                    {languages.map(language => (
                      <button 
                        key={language}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activeLanguage === language ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                        }`}
                        onClick={() => setActiveLanguage(language)}
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Platform filters */}
                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Platform</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activePlatform === "all" ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                      }`}
                      onClick={() => setActivePlatform("all")}
                    >
                      All
                    </button>
                    {platforms.map(platform => (
                      <button 
                        key={platform.id}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          activePlatform === platform.name ? "bg-primary text-white" : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-white transition-colors"
                        }`}
                        onClick={() => setActivePlatform(platform.name)}
                      >
                        <img 
                          src={platform.logo} 
                          alt={platform.name} 
                          className="w-4 h-4 object-contain"
                        />
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {loading && movies.length === 0 ? (
              <div className="flex justify-center py-12">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {filteredMovies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredMovies.map((movie) => (
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
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No movies found matching your filters. Try adjusting your search criteria.</p>
                  </div>
                )}
                
                {searchResults?.Search && searchResults.Search.length > 0 && !error && (
                  <div className="mt-8 text-center">
                    <button 
                      onClick={loadMoreMovies}
                      className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-2 rounded-md"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        "Load More Movies"
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

export default FreeMovies;

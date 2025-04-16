
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Link } from "react-router-dom";
import { searchMovies, SearchResult } from "@/utils/api";

const FeaturedGuides = () => {
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Platform data for generating guide titles
  const platforms = [
    {
      id: "netflix",
      name: "Netflix",
    },
    {
      id: "prime",
      name: "Amazon Prime",
    },
    {
      id: "disney",
      name: "Disney+ Hotstar",
    },
  ];

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const result = await searchMovies("guide", 1);
        
        if (result.Response === "True" && result.Search) {
          // Take only the first 3 results for guides
          const featuredGuides = result.Search.slice(0, 3).map(movie => {
            // Randomly assign a platform to each movie
            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
            
            return {
              id: movie.imdbID,
              title: `How to Download ${movie.Title} from ${randomPlatform.name}`,
              thumbnail: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/500x300?text=No+Poster",
              excerpt: `Learn how to legally download ${movie.Title} for offline viewing with this step-by-step guide.`,
              steps: Math.floor(Math.random() * 3) + 4 // Random number of steps between 4-6
            };
          });
          
          setGuides(featuredGuides);
        } else {
          setError("Failed to load guides");
        }
      } catch (err) {
        setError("Error fetching guides");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuides();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Latest Legal Download Guides" 
          subtitle="Step-by-step tutorials to help you download movies legally from your favorite platforms"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link to={`/movie/${guide.id}`} key={guide.id}>
                <div className="bg-card rounded-lg overflow-hidden border border-border/50 hover-scale hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video relative">
                    <img 
                      src={guide.thumbnail} 
                      alt={guide.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full py-1 px-3 text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>100% Legal</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{guide.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-secondary text-secondary-foreground rounded-full px-3 py-1">
                        {guide.steps} steps
                      </span>
                      
                      <span className="text-primary flex items-center gap-1 text-sm font-medium">
                        Read guide <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/guides">
            <button className="text-accent hover:text-accent/80 font-medium flex items-center gap-1 mx-auto">
              View all guides <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;

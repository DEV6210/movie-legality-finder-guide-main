
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById, MovieDetails as MovieDetailsType } from "@/utils/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import { ArrowLeft, Play, Star, Award, Download, Info, Calendar, Clock, Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError("No movie ID provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getMovieById(id);
        if (data.Response === "False") {
          setError(data.Error || "Failed to load movie details");
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError("An error occurred while fetching movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading movie details...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="text-center">
                <Info className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
                <p className="text-muted-foreground mb-6">{error || "Unable to load movie details"}</p>
                <Link to="/free-movies">
                  <CTAButton>
                    <ArrowLeft className="w-4 h-4" />
                    Back to Movies
                  </CTAButton>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const getPlatformData = () => {
    // This would ideally come from a database mapping IMDB IDs to OTT platforms
    // For now, return placeholder data based on the movie genre
    const genres = movie.Genre.split(",").map(g => g.trim().toLowerCase());

    if (genres.includes("action") || genres.includes("adventure")) {
      return {
        name: "Prime Video",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/120px-Amazon_Prime_Video_logo.svg.png",
        link: "https://www.primevideo.com/"
      };
    } else if (genres.includes("drama") || genres.includes("biography")) {
      return {
        name: "Netflix",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/120px-Netflix_2015_logo.svg.png",
        link: "https://www.netflix.com/"
      };
    } else {
      return {
        name: "Disney+ Hotstar",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Disney%2B_Hotstar_logo.svg/120px-Disney%2B_Hotstar_logo.svg.png",
        link: "https://www.hotstar.com/"
      };
    }
  };

  const platform = getPlatformData();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero section with movie backdrop */}
        <div
          className="relative min-h-[70vh] flex items-end"
          style={{
            backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=1200&q=60"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10 py-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Movie poster */}
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="rounded-lg overflow-hidden shadow-lg hover-scale">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster"}
                    alt={movie.Title}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Movie details */}
              <div className="w-full md:w-2/3 lg:w-3/4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{movie.Title}</h1>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> {movie.Year}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> {movie.Runtime}
                  </span>
                  <span className="flex items-center">
                    <Film className="h-4 w-4 mr-1" /> {movie.Rated}
                  </span>
                  {movie.imdbRating !== "N/A" && (
                    <span className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400" /> {movie.imdbRating}/10
                    </span>
                  )}
                </div>

                <p className="text-lg mb-6">{movie.Plot}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-muted-foreground text-sm">Director</h3>
                    <p className="font-medium">{movie.Director}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm">Genre</h3>
                    <p className="font-medium">{movie.Genre}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm">Cast</h3>
                    <p className="font-medium">{movie.Actors}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground text-sm">Language</h3>
                    <p className="font-medium">{movie.Language}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    <CTAButton variant="primary" icon={<Play className="h-4 w-4" />}>
                      Watch on {platform.name}
                    </CTAButton>
                  </a>
                  <Link to="https://www.profitableratecpm.com/gr00b68kpw?key=0e842f1bc446fdb7b10ac9fa80e61219"
                    target="_blank" rel="noopener noreferrer">
                    <CTAButton variant="purple" icon={<Download className="h-4 w-4" />}>
                      Download Legally
                    </CTAButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Details card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Movie Details</h2>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm text-muted-foreground">Released</h3>
                      <p>{movie.Released}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground">Country</h3>
                      <p>{movie.Country}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground">Writer</h3>
                      <p>{movie.Writer}</p>
                    </div>

                    {movie.Awards !== "N/A" && (
                      <div>
                        <h3 className="text-sm text-muted-foreground flex items-center gap-1">
                          <Award className="h-4 w-4 text-accent" /> Awards
                        </h3>
                        <p>{movie.Awards}</p>
                      </div>
                    )}

                    {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                      <div>
                        <h3 className="text-sm text-muted-foreground">Box Office</h3>
                        <p>{movie.BoxOffice}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Where to watch card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Where to Watch</h2>

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="font-medium">{platform.name}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    You can stream or download this movie legally from {platform.name}.
                  </p>

                  <a href={platform.link} target="_blank" rel="noopener noreferrer">
                    <CTAButton className="w-full">
                      Visit {platform.name}
                    </CTAButton>
                  </a>
                </CardContent>
              </Card>

              {/* Download guide card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Download Guide</h2>

                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how to legally download "{movie.Title}" for offline viewing with our step-by-step guide.
                  </p>

                  <Link to={`/guides/download/${id}`}>
                    <CTAButton className="w-full" variant="purple" icon={<Download className="h-4 w-4" />}>
                      View Download Guide
                    </CTAButton>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default MovieDetails;

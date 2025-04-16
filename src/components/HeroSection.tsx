
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import CTAButton from "./CTAButton";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative bg-background py-12 md:py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-ott-purple/20 via-primary/10 to-ott-teal/10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Legal Ways to Download & Stream Your Favorite Movies
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Your ultimate guide to legal movie downloads, OTT platform comparisons, and free streaming resources
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search movie, platform, or guide..."
              className="w-full bg-card border border-input rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="https://www.profitableratecpm.com/gr00b68kpw?key=0e842f1bc446fdb7b10ac9fa80e61219"
              target="_blank" rel="noopener noreferrer">
              <CTAButton
                variant="primary"
                className="min-w-[180px]"
              >
                Download Legally
              </CTAButton>
            </Link>

            <Link to="/ott-reviews">
              <CTAButton
                variant="purple"
                className="min-w-[180px]"
              >
                Best OTT Deals
              </CTAButton>
            </Link>

            <Link to="/free-movies">
              <CTAButton
                variant="teal"
                className="min-w-[180px]"
              >
                Top Free Movies
              </CTAButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

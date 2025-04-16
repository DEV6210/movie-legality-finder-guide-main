
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-card/95 backdrop-blur-md sticky top-0 z-50 border-b border-border/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">LegalFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/guides" className="text-foreground/90 hover:text-primary transition-colors">
              Download Guides
            </Link>
            <Link to="/ott-reviews" className="text-foreground/90 hover:text-primary transition-colors">
              OTT Reviews
            </Link>
            <Link to="/free-movies" className="text-foreground/90 hover:text-primary transition-colors">
              Free Movies
            </Link>
            <Link to="/trailers" className="text-foreground/90 hover:text-primary transition-colors">
              Trailers
            </Link>
            <Link to="/about" className="text-foreground/90 hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Search button */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <Link
              to="/guides"
              className="text-foreground/90 hover:text-primary transition-colors px-1 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Download Guides
            </Link>
            <Link
              to="/ott-reviews"
              className="text-foreground/90 hover:text-primary transition-colors px-1 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              OTT Reviews
            </Link>
            <Link
              to="/free-movies"
              className="text-foreground/90 hover:text-primary transition-colors px-1 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Movies
            </Link>
            <Link
              to="/trailers"
              className="text-foreground/90 hover:text-primary transition-colors px-1 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Trailers
            </Link>
            <Link
              to="/about"
              className="text-foreground/90 hover:text-primary transition-colors px-1 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-background w-full pl-10 pr-4 py-2 rounded-md border border-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

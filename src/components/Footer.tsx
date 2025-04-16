
import { Link } from "react-router-dom";
import { Home, Tv, Film, FileText, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/40 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">LegalFlix</h3>
            <p className="text-muted-foreground">
              Your ultimate guide to finding legal download and streaming sources for movies and shows.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/ott-reviews" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Tv size={16} />
                  <span>OTT Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/free-movies" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Film size={16} />
                  <span>Free Movies</span>
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText size={16} />
                  <span>Download Guides</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="text-muted-foreground hover:text-primary transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-[#1DA1F2] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#E1306C] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#FF0000] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-background rounded-l-md px-3 py-2 border border-input focus:outline-none focus:ring-1 focus:ring-primary flex-grow"
                />
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/40 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} LegalFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

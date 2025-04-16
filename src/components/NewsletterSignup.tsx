
import { useState } from "react";
import { Bell } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Signing up with email:", email);
    setEmail("");
    // Show success message or toast notification
  };

  return (
    <div className="sticky bottom-0 w-full bg-card/95 backdrop-blur-md border-t border-border/40 py-4 z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-accent" />
            <p className="font-medium">
              Get weekly updates on free movies, OTT offers, and new releases
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-1 max-w-md gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-background rounded-md px-4 py-2 border border-input focus:outline-none focus:ring-1 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-accent text-accent-foreground rounded-md px-4 py-2 font-medium hover:bg-accent/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Send } from "lucide-react";

const About = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 md:py-16 bg-card">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="About LegalFlix" 
              subtitle="Your ultimate guide to legal movie downloads and streaming"
              alignment="center"
            />
            
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p>
                  LegalFlix is dedicated to providing clear, accurate information on legal methods
                  to download and stream movies and TV shows from popular platforms. Our mission is to
                  help users navigate the complex world of digital content while respecting copyright laws.
                </p>
                
                <h3>Our Mission</h3>
                <p>
                  We believe in ethical content consumption. By providing detailed guides, platform comparisons,
                  and highlighting free legal options, we aim to make legal streaming and downloading accessible
                  to everyone.
                </p>
                
                <h3>What We Offer</h3>
                <ul>
                  <li>
                    <strong>Step-by-step Download Guides:</strong> Clear instructions for saving content from Netflix,
                    Amazon Prime, Disney+ Hotstar, and other platforms for offline viewing.
                  </li>
                  <li>
                    <strong>OTT Platform Reviews:</strong> Detailed comparisons of streaming services to help you
                    choose the right subscription for your needs.
                  </li>
                  <li>
                    <strong>Free Movie Collections:</strong> Curated lists of legally free movies available on
                    platforms like YouTube, JioCinema, and MX Player.
                  </li>
                  <li>
                    <strong>New Releases & Trailers:</strong> Stay updated with the latest movie trailers and
                    upcoming OTT releases.
                  </li>
                </ul>
                
                <h3>Our Commitment</h3>
                <p>
                  We only promote legal methods for accessing digital content. All our guides and
                  recommendations comply with copyright laws and platform terms of service. We believe
                  in supporting content creators while helping users get the most from their
                  subscriptions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading 
              title="Contact Us" 
              subtitle="Get in touch with our team or submit a movie guide request"
              alignment="center"
            />
            
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                    <a href="mailto:info@legalflix.com" className="text-accent hover:text-accent/80 flex items-center gap-2">
                      <Mail size={20} />
                      <span>info@legalflix.com</span>
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Request a Guide</h3>
                    <p className="text-muted-foreground mb-4">
                      Need help with a specific platform or movie? Let us know and we'll create a guide for it.
                    </p>
                  </div>
                </div>
                
                {/* Contact Form */}
                <div>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Guide request or general inquiry"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Your message or guide request details"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default About;

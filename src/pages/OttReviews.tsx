
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

// Sample data
const reviews = [
  {
    id: 1,
    title: "Netflix vs Prime - Which One is Best in 2025?",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=500&q=60",
    excerpt: "An in-depth comparison of Netflix and Amazon Prime Video - features, pricing, content library, and more.",
  },
  {
    id: 2,
    title: "Disney+ Hotstar Review: Is It Worth Your Money?",
    image: "https://images.unsplash.com/photo-1611162618479-ee3d24aaef0b?auto=format&fit=crop&w=500&q=60",
    excerpt: "Discover if Disney+ Hotstar offers enough value to justify a subscription in 2025.",
  },
  {
    id: 3,
    title: "JioCinema Premium vs Free: What's the Difference?",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=500&q=60",
    excerpt: "Everything you need to know about JioCinema's free and premium offerings.",
  },
  {
    id: 4,
    title: "The Ultimate OTT Platform Comparison Guide",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=500&q=60",
    excerpt: "Compare all major OTT platforms - pricing, content, download options, and device support.",
  },
];

const platforms = [
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/120px-Netflix_2015_logo.svg.png",
    price: "₹199 - ₹649",
    download: true,
    library: "Excellent",
    originals: "Excellent",
  },
  {
    name: "Amazon Prime",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Amazon_Prime_Video_logo.svg/120px-Amazon_Prime_Video_logo.svg.png",
    price: "₹179 - ₹1499",
    download: true,
    library: "Very Good",
    originals: "Good",
  },
  {
    name: "Disney+ Hotstar",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Disney%2B_Hotstar_logo.svg/120px-Disney%2B_Hotstar_logo.svg.png",
    price: "₹299 - ₹899",
    download: true,
    library: "Good",
    originals: "Good",
  },
  {
    name: "JioCinema",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/14/JioCinema_logo.svg/120px-JioCinema_logo.svg.png",
    price: "Free - ₹999",
    download: true,
    library: "Good",
    originals: "Limited",
  },
  {
    name: "YouTube Premium",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/120px-YouTube_full-color_icon_%282017%29.svg.png",
    price: "₹129 - ₹189",
    download: true,
    library: "Limited",
    originals: "Limited",
  },
];

const OttReviews = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="OTT Platform Reviews & Comparisons"
              subtitle="Detailed reviews and comparisons of popular OTT streaming platforms"
            />

            {/* Featured comparison table */}
            <div className="mb-12 overflow-x-auto">
              <div className="min-w-[800px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-card border-b border-border">
                      <th className="p-4 text-left">Platform</th>
                      <th className="p-4 text-left">Price Range</th>
                      <th className="p-4 text-left">Download Support</th>
                      <th className="p-4 text-left">Content Library</th>
                      <th className="p-4 text-left">Original Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((platform) => (
                      <tr key={platform.name} className="border-b border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" />
                            <span className="font-medium">{platform.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{platform.price}</td>
                        <td className="p-4">
                          {platform.download ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="p-4">{platform.library}</td>
                        <td className="p-4">{platform.originals}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Link to={`/ott-reviews/${review.id}`} key={review.id}>
                  <div className="bg-card rounded-lg overflow-hidden border border-border/50 hover-scale hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video">
                      <img
                        src={review.image}
                        alt={review.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">{review.excerpt}</p>

                      <span className="text-primary flex items-center gap-1 text-sm font-medium mt-auto">
                        Read comparison <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
};

export default OttReviews;

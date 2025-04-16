
import { ArrowRight, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Link } from "react-router-dom";

// Sample data
const editorsPicks = [
  {
    id: 1,
    title: "Best Budget-Friendly OTT Platforms in 2025",
    category: "OTT Reviews",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "How to Legally Download YouTube Movies",
    category: "Download Guides",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "Top 10 Classic Movies Available for Free",
    category: "Free Movies",
    image: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?auto=format&fit=crop&w=500&q=60",
  },
];

const EditorsPicks = () => {
  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Top Picks by Our Editors" 
          subtitle="Curated recommendations from our movie experts"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorsPicks.map((pick) => (
            <Link to={`/${pick.category.toLowerCase().replace(' ', '-')}/${pick.id}`} key={pick.id}>
              <div className="group relative overflow-hidden rounded-lg hover-scale hover:shadow-lg transition-all duration-300">
                <div className="aspect-video">
                  <img 
                    src={pick.image} 
                    alt={pick.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium text-accent">
                      {pick.category}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-semibold text-xl mb-4">
                    {pick.title}
                  </h3>
                  
                  <span className="text-white/80 text-sm flex items-center gap-1 mt-auto">
                    Read article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsPicks;

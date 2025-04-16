
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating?: number;
  platform?: {
    name: string;
    logo: string;
  };
  className?: string;
}

const MovieCard = ({ title, imageUrl, rating, platform, className }: MovieCardProps) => {
  return (
    <div className={cn("group relative overflow-hidden rounded-lg hover-scale hover-glow", className)}>
      {/* Movie Poster */}
      <div className="aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="font-medium text-white text-lg">{title}</h3>
        
        <div className="flex items-center justify-between mt-2">
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-white">{rating}</span>
            </div>
          )}
          
          {platform && (
            <div className="flex items-center gap-1">
              <img src={platform.logo} alt={platform.name} className="h-4 w-4 object-contain" />
              <span className="text-xs text-white">{platform.name}</span>
            </div>
          )}
        </div>
        
        <button className="mt-3 w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md text-sm font-medium transition-colors">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

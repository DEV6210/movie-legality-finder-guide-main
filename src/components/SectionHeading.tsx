
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  alignment = "left",
  className 
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        "mb-8", 
        alignment === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;

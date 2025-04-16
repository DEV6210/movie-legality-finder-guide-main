
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "purple" | "teal" | "yellow";
  icon?: ReactNode;
}

const CTAButton = ({ 
  children, 
  variant = "primary", 
  icon, 
  className, 
  ...props 
}: CTAButtonProps) => {
  const variantStyles = {
    primary: "bg-primary text-white hover-glow",
    purple: "bg-ott-purple text-white hover-glow-purple",
    teal: "bg-ott-teal text-white hover-glow-teal",
    yellow: "bg-ott-yellow text-black"
  };

  return (
    <button
      className={cn(
        "cta-button flex items-center justify-center gap-2",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default CTAButton;

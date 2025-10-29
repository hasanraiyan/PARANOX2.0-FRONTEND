import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backRoute?: string;
  responsive?: boolean; // Enable responsive text sizing
}

export const PageHeader = ({ 
  title, 
  subtitle, 
  backRoute = '/dashboard',
  responsive = false 
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const titleClass = responsive 
    ? "text-xl sm:text-2xl font-cyber font-bold text-white"
    : "text-2xl font-cyber font-bold text-white";
  
  const subtitleClass = responsive 
    ? "text-muted-foreground text-xs sm:text-sm"
    : "text-muted-foreground text-sm";

  const buttonClass = responsive
    ? "mr-3 sm:mr-4 text-muted-foreground hover:text-white p-3 sm:p-2 touch-manipulation"
    : "mr-4 text-muted-foreground hover:text-white";

  const containerClass = responsive
    ? "flex items-center mb-6 sm:mb-8"
    : "flex items-center mb-8";

  return (
    <div className={containerClass}>
      <Button
        onClick={() => navigate(backRoute)}
        variant="ghost"
        size="icon"
        className={buttonClass}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className={titleClass}>
          {title}
        </h1>
        {subtitle && (
          <p className={subtitleClass}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

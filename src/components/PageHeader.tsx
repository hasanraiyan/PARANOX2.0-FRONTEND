import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <div className={cn(
      "flex items-center",
      responsive ? "mb-6 sm:mb-8" : "mb-8"
    )}>
      <Button
        onClick={() => navigate(backRoute)}
        variant="ghost"
        size="icon"
        className={cn(
          "text-muted-foreground hover:text-white",
          responsive ? "mr-3 sm:mr-4 p-3 sm:p-2 touch-manipulation" : "mr-4"
        )}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className={cn(
          "font-cyber font-bold text-white",
          responsive ? "text-xl sm:text-2xl" : "text-2xl"
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            "text-muted-foreground",
            responsive ? "text-xs sm:text-sm" : "text-sm"
          )}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

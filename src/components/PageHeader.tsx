import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backRoute?: string;
}

export const PageHeader = ({ title, subtitle, backRoute = '/dashboard' }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-8">
      <Button
        onClick={() => navigate(backRoute)}
        variant="ghost"
        size="icon"
        className="mr-4 text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-2xl font-cyber font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

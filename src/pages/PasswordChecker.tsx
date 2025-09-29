import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Eye, EyeOff, AlertTriangle, CheckCircle, Shield, Key, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PasswordAnalysis {
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
  breached: boolean;
  suggestions: string[];
  criteria: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

const PasswordChecker = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);

  const analyzePassword = async () => {
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter a password to analyze",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      };

      const criteriaMet = Object.values(criteria).filter(Boolean).length;
      let strength: PasswordAnalysis['strength'];
      let score: number;

      if (criteriaMet <= 2) {
        strength = 'weak';
        score = 25;
      } else if (criteriaMet === 3) {
        strength = 'medium';
        score = 50;
      } else if (criteriaMet === 4) {
        strength = 'strong';
        score = 75;
      } else {
        strength = 'very-strong';
        score = 100;
      }

      const commonPasswords = ['password', '123456', 'admin', 'welcome'];
      const breached = commonPasswords.some(common => password.toLowerCase().includes(common));

      const suggestions = [];
      if (!criteria.length) suggestions.push("Use at least 8 characters");
      if (!criteria.uppercase) suggestions.push("Add uppercase letters");
      if (!criteria.lowercase) suggestions.push("Add lowercase letters");
      if (!criteria.numbers) suggestions.push("Include numbers");
      if (!criteria.symbols) suggestions.push("Add special characters");
      if (breached) suggestions.push("This password appears in data breaches");

      setAnalysis({
        strength,
        score,
        breached,
        suggestions,
        criteria
      });
      setAnalyzing(false);
    }, 1500);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'text-accent-phishing';
      case 'medium': return 'text-accent-safety';
      case 'strong': return 'text-accent-password';
      case 'very-strong': return 'text-primary';
      default: return 'text-white';
    }
  };

  const getProgressColor = (strength: string) => {
    switch (strength) {
      case 'weak': return 'bg-accent-phishing';
      case 'medium': return 'bg-accent-safety';
      case 'strong': return 'bg-accent-password';
      case 'very-strong': return 'bg-primary';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="icon"
            className="mr-4 text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-cyber font-bold text-white">
              Password & Leak Checker
            </h1>
            <p className="text-muted-foreground text-sm">
              Check your password strength and data breach status
            </p>
          </div>
        </div>

        {/* Password Input */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-input-border focus:border-primary focus:glow-primary transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              onClick={analyzePassword}
              disabled={analyzing || !password}
              className="w-full bg-gradient-primary hover:glow-primary btn-cyber"
            >
              {analyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing Password...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Check Password
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Strength Meter */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-cyber font-semibold text-white">
                  Password Strength
                </h3>
                <span className={`font-bold ${getStrengthColor(analysis.strength)}`}>
                  {analysis.strength.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              
              <Progress value={analysis.score} className="mb-4" />
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Object.entries(analysis.criteria).map(([key, met]) => (
                  <div key={key} className="flex items-center space-x-2">
                    {met ? (
                      <CheckCircle className="h-4 w-4 text-accent-password" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-accent-phishing" />
                    )}
                    <span className={`text-xs ${met ? 'text-accent-password' : 'text-muted-foreground'}`}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breach Status */}
            <div className="glass-card rounded-2xl p-6 animate-slide-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className={analysis.breached ? 'text-accent-phishing' : 'text-accent-password'}>
                  {analysis.breached ? (
                    <AlertTriangle className="h-8 w-8" />
                  ) : (
                    <CheckCircle className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-cyber font-semibold text-white">
                    Data Breach Status
                  </h3>
                  <p className={`text-sm ${analysis.breached ? 'text-accent-phishing' : 'text-accent-password'}`}>
                    {analysis.breached 
                      ? 'Password found in known data breaches' 
                      : 'Password not found in known breaches'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div className="glass-card rounded-2xl p-6 animate-slide-up">
                <h3 className="text-lg font-cyber font-semibold text-white mb-4">
                  Security Recommendations
                </h3>
                <div className="space-y-2">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Key className="h-4 w-4 text-accent-safety mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-border hover:bg-secondary/50"
              >
                Generate Strong Password
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-border hover:bg-secondary/50"
              >
                Save Analysis
              </Button>
            </div>
          </div>
        )}

        {/* Password Tips */}
        <div className="glass-card rounded-2xl p-6 mt-6">
          <h3 className="text-lg font-cyber font-semibold text-white mb-4">
            Password Security Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p>• Use at least 12 characters</p>
              <p>• Mix uppercase and lowercase letters</p>
              <p>• Include numbers and symbols</p>
            </div>
            <div className="space-y-2">
              <p>• Avoid dictionary words</p>
              <p>• Don't reuse passwords</p>
              <p>• Consider using a password manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChecker;
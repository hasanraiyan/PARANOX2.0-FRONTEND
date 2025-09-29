import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Upload, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AnalysisResult {
  status: 'safe' | 'suspicious' | 'dangerous';
  confidence: number;
  reasons: string[];
}

const PhishingDetector = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [recentChecks] = useState([
    { text: "Your bank account has been suspended...", status: 'dangerous', time: '2h ago' },
    { text: "Meeting reminder from Calendar", status: 'safe', time: '1d ago' },
    { text: "Win $1000 now! Click here!", status: 'suspicious', time: '2d ago' }
  ]);

  const analyzeMessage = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const suspiciousKeywords = ['urgent', 'click here', 'suspended', 'verify', 'winner', '$', 'prize'];
      const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => 
        inputText.toLowerCase().includes(keyword)
      );
      
      let status: 'safe' | 'suspicious' | 'dangerous';
      let confidence: number;
      let reasons: string[];

      if (hasSuspiciousKeywords) {
        if (inputText.toLowerCase().includes('suspended') || inputText.toLowerCase().includes('urgent')) {
          status = 'dangerous';
          confidence = 92;
          reasons = ['Contains urgent action keywords', 'Mimics official communication', 'Requests immediate action'];
        } else {
          status = 'suspicious';
          confidence = 75;
          reasons = ['Contains promotional language', 'Unusual sender pattern'];
        }
      } else {
        status = 'safe';
        confidence = 95;
        reasons = ['No suspicious patterns detected', 'Appears to be legitimate communication'];
      }

      setResult({ status, confidence, reasons });
      setAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-accent-password';
      case 'suspicious': return 'text-accent-safety';
      case 'dangerous': return 'text-accent-phishing';
      default: return 'text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return CheckCircle;
      case 'suspicious': return AlertTriangle;
      case 'dangerous': return Shield;
      default: return Shield;
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
              Phishing & Scam Detector
            </h1>
            <p className="text-muted-foreground text-sm">
              Paste the message below to check if it's safe
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Paste email, SMS, or call text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 bg-input border-input-border focus:border-primary focus:glow-primary transition-all resize-none"
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={analyzeMessage}
                disabled={analyzing || !inputText.trim()}
                className="flex-1 bg-gradient-primary hover:glow-primary btn-cyber"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Message'
                )}
              </Button>
              
              <Button
                variant="outline"
                className="border-border hover:bg-secondary/50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>
        </div>

        {/* Analysis Result */}
        {result && (
          <div className="glass-card rounded-2xl p-6 mb-6 animate-slide-up">
            <div className="flex items-start space-x-4">
              <div className={getStatusColor(result.status)}>
                {(() => {
                  const Icon = getStatusIcon(result.status);
                  return <Icon className="h-8 w-8 mt-1" />;
                })()}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`text-xl font-cyber font-bold ${getStatusColor(result.status)}`}>
                    {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                  </h3>
                  <span className="bg-white/10 px-2 py-1 rounded text-sm text-white">
                    {result.confidence}% confidence
                  </span>
                </div>
                
                <div className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <p key={index} className="text-muted-foreground text-sm">
                      • {reason}
                    </p>
                  ))}
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border hover:bg-secondary/50"
                  >
                    Save to History
                  </Button>
                  {result.status !== 'safe' && (
                    <Button
                      size="sm"
                      className="bg-accent-phishing/20 text-accent-phishing hover:bg-accent-phishing/30"
                    >
                      Report Phishing
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Checks */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-cyber font-semibold text-white mb-4">
            Recent Checks
          </h3>
          
          <div className="space-y-3">
            {recentChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={getStatusColor(check.status)}>
                  {(() => {
                    const Icon = getStatusIcon(check.status);
                    return <Icon className="h-4 w-4" />;
                  })()}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm truncate">{check.text}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${getStatusColor(check.status)}`}>
                    {check.status}
                  </span>
                  <span className="text-muted-foreground text-xs">{check.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingDetector;
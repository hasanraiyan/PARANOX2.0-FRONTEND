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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [recentChecks] = useState([
    { text: "Your bank account has been suspended...", status: 'dangerous', time: '2h ago' },
    { text: "Meeting reminder from Calendar", status: 'safe', time: '1d ago' },
    { text: "Win $1000 now! Click here!", status: 'suspicious', time: '2d ago' }
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['text/plain', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a text file, image (PNG/JPG), or PDF",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);

    // Read file content
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(content);
        toast({
          title: "File Uploaded",
          description: `Successfully loaded ${file.name}`,
        });
      };
      reader.readAsText(file);
    } else if (file.type.startsWith('image/')) {
      // For images, we'll simulate OCR text extraction
      setInputText(`[Image file uploaded: ${file.name}]\n\nSimulated OCR text extraction:\n"Congratulations! You've won $1000! Click here to claim your prize now! Urgent action required within 24 hours or you'll lose this amazing opportunity!"`); 
      toast({
        title: "Image Uploaded",
        description: `Processing ${file.name} with OCR...`,
      });
    } else if (file.type === 'application/pdf') {
      // For PDFs, simulate text extraction
      setInputText(`[PDF file uploaded: ${file.name}]\n\nSimulated PDF text extraction:\n"URGENT: Your account will be suspended! Verify your identity immediately by clicking this link and entering your personal information."`); 
      toast({
        title: "PDF Uploaded",
        description: `Processing ${file.name}...`,
      });
    }
  };

  const analyzeMessage = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze or upload a file",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    
    try {
      // Call the AI-powered phishing detection API
      const response = await fetch('/api/analyze-phishing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const aiResult = await response.json();
      
      // Convert AI result to our component format
      const status = aiResult.label as 'safe' | 'suspicious' | 'dangerous';
      const confidence = Math.round(aiResult.confidence * 100);
      const reasons = aiResult.explaination_steps || [aiResult.reason];

      setResult({ status, confidence, reasons });
      
      toast({
        title: "AI Analysis Complete",
        description: `Message classified as ${status} (${confidence}% confidence)`,
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Fallback to basic analysis if API fails
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
          confidence = 85;
          reasons = [
            'Contains threatening language about account suspension',
            'Uses urgent language to create pressure',
            'Requests immediate action'
          ];
        } else {
          status = 'suspicious';
          confidence = 70;
          reasons = [
            'Contains suspicious keywords',
            'May be attempting to deceived users',
            'Requires careful verification'
          ];
        }
      } else {
        status = 'safe';
        confidence = 90;
        reasons = [
          'No suspicious patterns detected',
          'Language appears legitimate',
          'No immediate red flags found'
        ];
      }

      setResult({ status, confidence, reasons });
      
      toast({
        title: "Analysis Complete (Fallback)",
        description: `Message classified as ${status} using basic analysis`,
        variant: "default"
      });
    } finally {
      setAnalyzing(false);
    }
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
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            size="icon"
            className="mr-3 sm:mr-4 text-muted-foreground hover:text-white p-3 sm:p-2 touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl sm:text-2xl font-cyber font-bold text-white">
              Phishing & Scam Detector
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Paste the message below to check if it's safe
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="space-y-4">
            {/* File Upload Status */}
            {uploadedFile && (
              <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-white">File uploaded: {uploadedFile.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setUploadedFile(null);
                    setInputText("");
                  }}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            )}
            
            <Textarea
              placeholder="Paste email, SMS, or call text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 w-full max-w-full bg-input border-input-border focus:border-primary focus:glow-primary transition-all resize-none text-sm sm:text-base"
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={analyzeMessage}
                disabled={analyzing || !inputText.trim()}
                className="flex-1 bg-gradient-primary hover:glow-primary btn-cyber py-3 sm:py-2 text-sm sm:text-base touch-manipulation"
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
              
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  accept=".txt,.png,.jpg,.jpeg,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className="border-border hover:bg-secondary/50 py-3 sm:py-2 text-sm sm:text-base touch-manipulation"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Result */}
        {result && (
          <div className="glass-card rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-up">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className={getStatusColor(result.status)}>
                {(() => {
                  const Icon = getStatusIcon(result.status);
                  return <Icon className="h-6 w-6 sm:h-8 sm:w-8 mt-1" />;
                })()}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                  <h3 className={`text-lg sm:text-xl font-cyber font-bold ${getStatusColor(result.status)}`}>
                    {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                  </h3>
                  <span className="bg-white/10 px-2 py-1 rounded text-xs sm:text-sm text-white w-fit">
                    {result.confidence}% confidence
                  </span>
                </div>
                
                <div className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <p key={index} className="text-muted-foreground text-xs sm:text-sm">
                      • {reason}
                    </p>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border hover:bg-secondary/50 w-full sm:w-auto text-xs sm:text-sm py-2 touch-manipulation"
                  >
                    Save to History
                  </Button>
                  {result.status !== 'safe' && (
                    <Button
                      size="sm"
                      className="bg-accent-phishing/20 text-accent-phishing hover:bg-accent-phishing/30 w-full sm:w-auto text-xs sm:text-sm py-2 touch-manipulation"
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
        <div className="glass-card rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-base sm:text-lg font-cyber font-semibold text-white mb-3 sm:mb-4">
            Recent Checks
          </h3>
          
          <div className="space-y-3">
            {recentChecks.map((check, index) => (
              <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={getStatusColor(check.status)}>
                  {(() => {
                    const Icon = getStatusIcon(check.status);
                    return <Icon className="h-4 w-4 flex-shrink-0" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs sm:text-sm truncate">{check.text}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 flex-shrink-0">
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
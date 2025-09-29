import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Users, Eye, AlertTriangle, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SafetyMode = () => {
  const navigate = useNavigate();
  const [safeBrowsing, setSafeBrowsing] = useState(true);
  const [bullyingDetection, setBullyingDetection] = useState(false);
  const [parentalReports, setParentalReports] = useState(true);

  const [lastActivity] = useState([
    { type: 'blocked', site: 'suspicious-site.com', reason: 'Malware detected', time: '2h ago' },
    { type: 'flagged', content: 'Inappropriate language detected', reason: 'Cyberbullying filter', time: '1d ago' },
    { type: 'allowed', site: 'educational-site.edu', reason: 'Safe educational content', time: '2d ago' }
  ]);

  const handleToggle = (setting: string, enabled: boolean) => {
    switch (setting) {
      case 'safeBrowsing':
        setSafeBrowsing(enabled);
        toast({
          title: enabled ? "Safe Browsing Enabled" : "Safe Browsing Disabled",
          description: enabled 
            ? "Protection against malicious websites is now active"
            : "You are now browsing without protection",
          variant: enabled ? "default" : "destructive"
        });
        break;
      case 'bullyingDetection':
        setBullyingDetection(enabled);
        toast({
          title: enabled ? "Cyberbullying Detection Enabled" : "Cyberbullying Detection Disabled",
          description: enabled 
            ? "AI will now monitor for harmful content"
            : "Cyberbullying monitoring is disabled"
        });
        break;
      case 'parentalReports':
        setParentalReports(enabled);
        toast({
          title: enabled ? "Parental Reports Enabled" : "Parental Reports Disabled",
          description: enabled 
            ? "Weekly safety reports will be sent to parents"
            : "Parental reporting is disabled"
        });
        break;
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
              Safety Mode
            </h1>
            <p className="text-muted-foreground text-sm">
              Configure protection for safe browsing and online interactions
            </p>
          </div>
        </div>

        {/* Safety Settings */}
        <div className="space-y-6 mb-8">
          {/* Safe Browsing */}
          <div className="glass-card rounded-2xl p-6 feature-card-safety">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-accent-safety">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-cyber font-semibold text-white">
                    Safe Browsing Protection
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Block malicious websites and dangerous downloads
                  </p>
                </div>
              </div>
              <Switch
                checked={safeBrowsing}
                onCheckedChange={(checked) => handleToggle('safeBrowsing', checked)}
                className="data-[state=checked]:bg-accent-safety"
              />
            </div>
          </div>

          {/* Cyberbullying Detection */}
          <div className="glass-card rounded-2xl p-6 feature-card-games">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-accent-games">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-cyber font-semibold text-white">
                    Cyberbullying Detection
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    AI-powered detection of harmful and bullying content
                  </p>
                </div>
              </div>
              <Switch
                checked={bullyingDetection}
                onCheckedChange={(checked) => handleToggle('bullyingDetection', checked)}
                className="data-[state=checked]:bg-accent-games"
              />
            </div>
          </div>

          {/* Parental Reports */}
          <div className="glass-card rounded-2xl p-6 feature-card-password">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-accent-password">
                  <Eye className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-cyber font-semibold text-white">
                    Parental Reports
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Weekly safety summaries sent to parent/guardian email
                  </p>
                </div>
              </div>
              <Switch
                checked={parentalReports}
                onCheckedChange={(checked) => handleToggle('parentalReports', checked)}
                className="data-[state=checked]:bg-accent-password"
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-cyber font-semibold text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Recent Safety Activity
          </h3>
          
          <div className="space-y-3">
            {lastActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className={`
                  ${activity.type === 'blocked' ? 'text-accent-phishing' : 
                    activity.type === 'flagged' ? 'text-accent-safety' : 'text-accent-password'}
                `}>
                  {activity.type === 'blocked' ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : activity.type === 'flagged' ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <Shield className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">
                    {activity.site ? `${activity.site} - ` : ''}{activity.content || activity.reason}
                  </p>
                  <p className="text-muted-foreground text-xs">{activity.reason}</p>
                </div>
                <span className="text-muted-foreground text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={() => navigate('/alerts')}
            variant="outline"
            className="flex-1 border-border hover:bg-secondary/50"
          >
            View Blocked Sites
          </Button>
          <Button
            className="flex-1 bg-gradient-primary hover:glow-primary btn-cyber"
          >
            Configure Filters
          </Button>
        </div>

        {/* Safety Tips */}
        <div className="glass-card rounded-2xl p-6 mt-6">
          <h3 className="text-lg font-cyber font-semibold text-white mb-4">
            Online Safety Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p>• Never share personal information online</p>
              <p>• Be cautious of suspicious links and downloads</p>
              <p>• Report cyberbullying immediately</p>
            </div>
            <div className="space-y-2">
              <p>• Use strong, unique passwords</p>
              <p>• Keep software and browsers updated</p>
              <p>• Talk to trusted adults about online concerns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMode;
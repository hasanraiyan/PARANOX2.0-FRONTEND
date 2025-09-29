import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bell, Search, Filter, Shield, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react";

interface Alert {
  id: string;
  type: 'phishing' | 'password' | 'safety' | 'system';
  title: string;
  description: string;
  status: 'blocked' | 'flagged' | 'resolved' | 'safe';
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const AlertsHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'phishing',
      title: 'Phishing Email Blocked',
      description: 'Suspicious email from fake-bank@scammer.com blocked',
      status: 'blocked',
      timestamp: '2 hours ago',
      severity: 'high'
    },
    {
      id: '2',
      type: 'password',
      title: 'Weak Password Detected',
      description: 'Password "123456" found in social media account',
      status: 'flagged',
      timestamp: '1 day ago',
      severity: 'medium'
    },
    {
      id: '3',
      type: 'safety',
      title: 'Inappropriate Content Filtered',
      description: 'Cyberbullying content detected and blocked on social platform',
      status: 'blocked',
      timestamp: '2 days ago',
      severity: 'medium'
    },
    {
      id: '4',
      type: 'system',
      title: 'Security Scan Complete',
      description: 'Weekly security scan completed - no threats found',
      status: 'safe',
      timestamp: '3 days ago',
      severity: 'low'
    },
    {
      id: '5',
      type: 'phishing',
      title: 'Suspicious SMS Detected',
      description: 'Text message claiming prize winnings flagged as scam',
      status: 'blocked',
      timestamp: '5 days ago',
      severity: 'high'
    },
    {
      id: '6',
      type: 'password',
      title: 'Data Breach Alert',
      description: 'Your email found in recent data breach - change passwords',
      status: 'flagged',
      timestamp: '1 week ago',
      severity: 'critical'
    },
    {
      id: '7',
      type: 'safety',
      title: 'Safe Browsing Active',
      description: 'Successfully blocked access to 3 malicious websites',
      status: 'resolved',
      timestamp: '1 week ago',
      severity: 'low'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phishing': return Shield;
      case 'password': return CheckCircle;
      case 'safety': return Eye;
      case 'system': return Bell;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'phishing': return 'text-accent-phishing';
      case 'password': return 'text-accent-password';
      case 'safety': return 'text-accent-safety';
      case 'system': return 'text-primary';
      default: return 'text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'bg-accent-phishing/20 text-accent-phishing';
      case 'flagged': return 'bg-accent-safety/20 text-accent-safety';
      case 'resolved': return 'bg-accent-password/20 text-accent-password';
      case 'safe': return 'bg-primary/20 text-primary';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-accent-phishing';
      case 'high': return 'border-l-accent-phishing/70';
      case 'medium': return 'border-l-accent-safety';
      case 'low': return 'border-l-accent-password';
      default: return 'border-l-muted';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || alert.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'phishing', label: 'Phishing & Scams' },
    { value: 'password', label: 'Password Security' },
    { value: 'safety', label: 'Safety Mode' },
    { value: 'system', label: 'System' }
  ];

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
          <div className="flex-1">
            <h1 className="text-2xl font-cyber font-bold text-white">
              Alerts & History
            </h1>
            <p className="text-muted-foreground text-sm">
              View your security alerts and activity history
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-input-border focus:border-primary"
              />
            </div>
            <div className="flex space-x-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(option.value)}
                  className={
                    selectedFilter === option.value
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary/50"
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass-card rounded-2xl p-6 border-l-4 ${getSeverityColor(alert.severity)} hover:bg-white/10 transition-colors`}
            >
              <div className="flex items-start space-x-4">
                <div className={getTypeColor(alert.type)}>
                  {(() => {
                    const Icon = getTypeIcon(alert.type);
                    return <Icon className="h-6 w-6 mt-1" />;
                  })()}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-cyber font-semibold text-white">
                      {alert.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-muted-foreground">
                        Type: <span className={getTypeColor(alert.type)}>{alert.type}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Severity: <span className={
                          alert.severity === 'critical' ? 'text-accent-phishing' :
                          alert.severity === 'high' ? 'text-accent-phishing/70' :
                          alert.severity === 'medium' ? 'text-accent-safety' :
                          'text-accent-password'
                        }>{alert.severity}</span>
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-glow"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-cyber font-semibold text-white mb-2">
              No alerts found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'All quiet on the security front!'}
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-accent-phishing text-2xl font-bold">
              {alerts.filter(a => a.status === 'blocked').length}
            </div>
            <div className="text-muted-foreground text-sm">Threats Blocked</div>
          </div>
          
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-accent-safety text-2xl font-bold">
              {alerts.filter(a => a.status === 'flagged').length}
            </div>
            <div className="text-muted-foreground text-sm">Issues Flagged</div>
          </div>
          
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-accent-password text-2xl font-bold">
              {alerts.filter(a => a.status === 'resolved').length}
            </div>
            <div className="text-muted-foreground text-sm">Issues Resolved</div>
          </div>
          
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="text-primary text-2xl font-bold">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-muted-foreground text-sm">Critical Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsHistory;
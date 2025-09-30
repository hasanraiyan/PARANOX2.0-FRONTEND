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
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          {/* Back Button */}
          <div className="flex items-center mb-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-white touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Title and Subtitle - Responsive Alignment */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-cyber font-bold text-white mb-2">
              Alerts & History
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              View your security alerts and activity history
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="glass-card rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-4 sm:space-y-0">
            {/* Search Bar - Full width on mobile */}
            <div className="relative w-full sm:max-w-md sm:mb-4 lg:mb-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-input-border focus:border-primary text-sm sm:text-base w-full"
              />
            </div>
            
            {/* Filter Tabs - Horizontal scrollable on mobile */}
            <div className="w-full">
              <div className="flex overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedFilter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(option.value)}
                    className={`flex-shrink-0 whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ${
                      selectedFilter === option.value
                        ? "bg-primary text-primary-foreground shadow-lg border-primary"
                        : "border-border hover:bg-secondary/50 hover:border-primary/50"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts List - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3 sm:gap-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass-card rounded-xl p-4 sm:p-5 lg:p-6 border-l-4 ${getSeverityColor(alert.severity)} hover:bg-white/5 transition-all duration-300 w-full min-h-0`}
            >
              {/* Mobile Layout (≤640px) - Vertical Stack */}
              <div className="flex flex-col sm:hidden space-y-3">
                {/* Header with Icon and Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`${getTypeColor(alert.type)} flex-shrink-0`}>
                      {(() => {
                        const Icon = getTypeIcon(alert.type);
                        return <Icon className="h-5 w-5 mt-0.5" />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-cyber font-semibold text-white leading-tight mb-1">
                        {alert.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)} flex-shrink-0 ml-2`}>
                    {alert.status.toUpperCase()}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {alert.description}
                </p>
                
                {/* Type & Severity Chips */}
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/30 ${getTypeColor(alert.type)}`}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/30 ${
                    alert.severity === 'critical' ? 'text-accent-phishing' :
                    alert.severity === 'high' ? 'text-accent-phishing/70' :
                    alert.severity === 'medium' ? 'text-accent-safety' :
                    'text-accent-password'
                  }`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </div>
                
                {/* Timestamp and Action */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-muted-foreground text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.timestamp}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-glow text-xs px-3 py-1 h-auto touch-manipulation"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              {/* Desktop/Tablet Layout (≥640px) - Horizontal */}
              <div className="hidden sm:flex items-start space-x-4">
                <div className={`${getTypeColor(alert.type)} flex-shrink-0`}>
                  {(() => {
                    const Icon = getTypeIcon(alert.type);
                    return <Icon className="h-6 w-6 mt-1" />;
                  })()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base lg:text-lg font-cyber font-semibold text-white leading-tight">
                      {alert.title}
                    </h3>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status.toUpperCase()}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm lg:text-base mb-3 leading-relaxed">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/30 ${getTypeColor(alert.type)}`}>
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/30 ${
                        alert.severity === 'critical' ? 'text-accent-phishing' :
                        alert.severity === 'high' ? 'text-accent-phishing/70' :
                        alert.severity === 'medium' ? 'text-accent-safety' :
                        'text-accent-password'
                      }`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-glow flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="glass-card rounded-xl p-6 sm:p-8 lg:p-12 text-center">
            <Bell className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base sm:text-lg lg:text-xl font-cyber font-semibold text-white mb-2">
              No alerts found
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'All quiet on the security front!'}
            </p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 text-center">
            <div className="text-accent-phishing text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
              {alerts.filter(a => a.status === 'blocked').length}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm leading-tight">Threats blocked</div>
          </div>
          
          <div className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 text-center">
            <div className="text-accent-safety text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
              {alerts.filter(a => a.status === 'flagged').length}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm leading-tight">Issues flagged</div>
          </div>
          
          <div className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 text-center">
            <div className="text-accent-password text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
              {alerts.filter(a => a.status === 'resolved').length}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm leading-tight">Issues resolved</div>
          </div>
          
          <div className="glass-card rounded-xl p-4 sm:p-5 lg:p-6 text-center">
            <div className="text-primary text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-muted-foreground text-xs sm:text-sm leading-tight">Critical alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsHistory;
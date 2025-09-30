import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Moon,
  Globe,
  Mail,
  Phone,
  LogOut,
  Settings as SettingsIcon,
  Key,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/App";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [profile, setProfile] = useState({
    name: user?.name || "Guardian User",
    email: "user@example.com",
    phone: "+1 (555) 123-4567"
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    securityUpdates: true
  });

  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    anonymousUsage: false,
    parentalReports: true
  });

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationToggle = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: value ? "Enabled" : "Disabled",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handlePrivacyToggle = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Privacy Setting Updated",
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black/95 flex flex-col overflow-x-hidden relative">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-3xl -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,136,0.08),transparent_50%)] -z-10"></div>

      <div className="flex-1 container mx-auto px-4 py-6 sm:py-8 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center mb-8 sm:mb-12"
        >
          <Button
            onClick={() => navigate('/dashboard')}
            size="icon"
            className="mr-4 sm:mr-6 text-white/70 hover:text-primary transition-all duration-300 hover:bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-2 touch-manipulation"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10">
            <h1 className="text-2xl sm:text-3xl font-cyber font-bold text-white">
              Settings
            </h1>
            <p className="text-white/70 mt-2 text-sm sm:text-base">
              Manage your account and preferences
            </p>
          </div>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="glass-card rounded-xl p-4 sm:p-6 border-2 border-white/10 shadow-xl shadow-black/20"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-cyber font-semibold text-white">
                Profile Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Label htmlFor="name" className="text-white font-semibold text-sm sm:text-base mb-3 block">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full max-w-md mx-auto bg-white/5 border-white/10 rounded-xl px-4 py-3 sm:py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-sm sm:text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Label htmlFor="email" className="text-white font-semibold text-sm sm:text-base mb-3 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full max-w-md mx-auto bg-white/5 border-white/10 rounded-xl px-4 py-3 sm:py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-sm sm:text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Label htmlFor="phone" className="text-white font-semibold text-sm sm:text-base mb-3 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full max-w-md mx-auto bg-white/5 border-white/10 rounded-xl px-4 py-3 sm:py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-sm sm:text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-end"
              >
                <Button
                  onClick={handleProfileUpdate}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent-password hover:from-primary/90 hover:to-accent-password/90 text-white text-sm sm:text-base py-3 sm:py-4 px-6 sm:px-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 touch-manipulation"
                >
                  Update Profile
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass-card rounded-xl p-4 sm:p-6 border-2 border-white/10 shadow-xl shadow-black/20"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-cyber font-semibold text-white">
                Notification Preferences
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                { key: 'emailAlerts', title: 'Email Alerts', desc: 'Receive security alerts via email' },
                { key: 'pushNotifications', title: 'Push Notifications', desc: 'Get instant security notifications' },
                { key: 'weeklyReports', title: 'Weekly Reports', desc: 'Receive weekly security summaries' },
                { key: 'securityUpdates', title: 'Security Updates', desc: 'Important security news and updates' }
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.6 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-white font-semibold text-base sm:text-lg">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => handleNotificationToggle(item.key as keyof typeof notifications, checked)}
                      className="border-white/30"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-card rounded-xl p-4 sm:p-6 border-2 border-white/10 shadow-xl shadow-black/20"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-cyber font-semibold text-white">
                Privacy & Data
              </h2>
            </div>

            <div className="space-y-6">
              {[
                { key: 'dataCollection', title: 'Data Collection', desc: 'Allow data collection to improve security' },
                { key: 'anonymousUsage', title: 'Anonymous Usage Statistics', desc: 'Share anonymous usage data' },
                { key: 'parentalReports', title: 'Parental Reports', desc: 'Send safety reports to parents/guardians' }
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.desc}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Switch
                      checked={privacy[item.key as keyof typeof privacy]}
                      onCheckedChange={(checked) => handlePrivacyToggle(item.key as keyof typeof privacy, checked)}
                      className="border-white/30"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card rounded-xl p-4 sm:p-6 border-2 border-white/10 shadow-xl shadow-black/20"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-cyber font-semibold text-white">
                Security
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { icon: Key, title: 'Change Password', desc: 'Update your account password' },
                { icon: Shield, title: 'Two-Factor Authentication', desc: 'Add extra security layer' },
                { icon: Globe, title: 'Connected Devices', desc: 'Manage your connected devices' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white text-lg py-6 px-6 rounded-2xl transition-all duration-300"
                  >
                    <item.icon className="h-5 w-5 mr-4" />
                    {item.title}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="glass-card rounded-xl p-4 sm:p-6 border-2 border-white/10 shadow-xl shadow-black/20"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <SettingsIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-base sm:text-lg font-cyber font-semibold text-white">
                Account
              </h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start border-2 border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white text-lg py-6 px-6 rounded-2xl transition-all duration-300"
                >
                  <Mail className="h-5 w-5 mr-4" />
                  Export Data
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start border-2 border-accent-phishing/50 text-accent-phishing hover:bg-accent-phishing/10 hover:border-accent-phishing text-lg py-6 px-6 rounded-2xl transition-all duration-300"
                >
                  <LogOut className="h-5 w-5 mr-4" />
                  Sign Out
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 text-lg py-6 px-6 rounded-2xl transition-all duration-300"
                >
                  <User className="h-5 w-5 mr-4" />
                  Delete Account
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* App Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="glass-card rounded-xl p-4 sm:p-6 border-2 border-white/10 shadow-xl shadow-black/20"
          >
            <h2 className="text-base sm:text-lg font-cyber font-semibold text-white mb-6">
              App Information
            </h2>

            <div className="grid grid-cols-2 gap-6 text-base mb-8">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-white/70">Version:</span>
                <span className="text-white font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-white/70">Last Updated:</span>
                <span className="text-white font-semibold">Today</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-white/70">Database:</span>
                <span className="text-accent-password font-semibold">Secure</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                <span className="text-white/70">AI Engine:</span>
                <span className="text-accent-password font-semibold">Active</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" className="flex-1 border-2 border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white text-lg py-4 rounded-2xl transition-all duration-300">
                Privacy Policy
              </Button>
              <Button variant="outline" className="flex-1 border-2 border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white text-lg py-4 rounded-2xl transition-all duration-300">
                Terms of Service
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
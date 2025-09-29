import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Users,
  Gamepad2,
  Bell,
  Settings,
  ChevronRight,
  Activity,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/App";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const features = [
    {
      id: 'phishing',
      title: 'Phishing Detector',
      subtitle: 'Scan emails, SMS, calls for threats',
      icon: Shield,
      color: 'feature-card-phishing',
      accentColor: 'text-accent-phishing',
      route: '/phishing-detector'
    },
    {
      id: 'password',
      title: 'Password & Leak Check',
      subtitle: 'Check strength + data breach lookup',
      icon: Lock,
      color: 'feature-card-password',
      accentColor: 'text-accent-password',
      route: '/password-checker'
    },
    {
      id: 'safety',
      title: 'Safety Mode',
      subtitle: 'Enable safe browsing & bullying filter',
      icon: Users,
      color: 'feature-card-safety',
      accentColor: 'text-accent-safety',
      route: '/safety-mode'
    },
    {
      id: 'games',
      title: 'Games Hub',
      subtitle: 'Play, learn, earn points',
      icon: Gamepad2,
      color: 'feature-card-games',
      accentColor: 'text-accent-games',
      route: '/games-hub'
    }
  ];

  const recentActivity = [
    { type: 'success', message: 'Blocked 1 phishing attempt yesterday', time: '1d ago' },
    { type: 'info', message: 'Your password is strong and safe', time: '2d ago' },
    { type: 'warning', message: 'Safety mode detected suspicious content', time: '3d ago' }
  ];

  return (
    <div className="min-h-screen bg-black/95 flex flex-col overflow-x-hidden relative">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-3xl -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,136,0.08),transparent_50%)] -z-10"></div>

      <div className="flex-1 container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center space-x-4">
            <div className="glass-card p-4 rounded-2xl border border-white/10">
              <h1 className="text-3xl font-cyber font-bold text-white">
                Hi, {user?.name || 'Guardian'}
              </h1>
              <p className="text-white/70 mt-1">Ready to secure your digital life?</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* XP Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card rounded-full px-6 py-3 flex items-center space-x-3 border border-primary/20 shadow-lg shadow-primary/10"
            >
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-white font-semibold">{user?.xp || 245} XP</span>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <Button
                onClick={() => navigate('/alerts')}
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-primary transition-all duration-300 hover:bg-white/5 backdrop-blur-sm rounded-xl"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate('/settings')}
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-primary transition-all duration-300 hover:bg-white/5 backdrop-blur-sm rounded-xl"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
              onClick={() => navigate(feature.route)}
              className={`${feature.color} glass-card rounded-3xl p-8 cursor-pointer hover:scale-105 transition-all duration-500 group border-2 border-white/10 hover:border-white/20 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`${feature.accentColor} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-12 w-12 drop-shadow-lg" />
                </div>
                <ChevronRight className="h-6 w-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="text-2xl font-cyber font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/80 text-base mb-6 leading-relaxed">
                {feature.subtitle}
              </p>

              <Button
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-primary/30 transition-all duration-300 group-hover:bg-primary/20"
              >
                Start Check
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-card rounded-3xl p-8 mb-12 border-2 border-white/10 shadow-xl shadow-black/20"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-cyber font-semibold text-white">
              Security Summary
            </h3>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + (index * 0.1), duration: 0.6 }}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10"
              >
                <div className={`
                  p-2 rounded-xl ${
                    activity.type === 'success' ? 'bg-accent-password/20 text-accent-password' :
                    activity.type === 'warning' ? 'bg-accent-safety/20 text-accent-safety' :
                    'bg-primary/20 text-primary'
                  }
                `}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.message}</p>
                </div>
                <span className="text-white/60 text-sm">{activity.time}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8"
          >
            <Button
              onClick={() => navigate('/alerts')}
              variant="ghost"
              className="w-full text-primary hover:text-accent-password transition-all duration-300 hover:bg-primary/5 py-4 text-lg font-medium border border-primary/20 hover:border-primary/40"
            >
              View Full History
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="glass-card rounded-3xl p-6 border-2 border-white/10 shadow-xl shadow-black/20"
        >
          <div className="flex justify-around">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-2 text-primary bg-primary/10 p-4 rounded-2xl border border-primary/20"
            >
              <Shield className="h-6 w-6" />
              <span className="text-sm font-medium">Dashboard</span>
            </Button>
            <Button
              onClick={() => navigate('/alerts')}
              variant="ghost"
              className="flex flex-col items-center space-y-2 text-white/70 hover:text-primary transition-all duration-300 p-4 rounded-2xl hover:bg-white/5"
            >
              <Bell className="h-6 w-6" />
              <span className="text-sm font-medium">Alerts</span>
            </Button>
            <Button
              onClick={() => navigate('/settings')}
              variant="ghost"
              className="flex flex-col items-center space-y-2 text-white/70 hover:text-primary transition-all duration-300 p-4 rounded-2xl hover:bg-white/5"
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm font-medium">Settings</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
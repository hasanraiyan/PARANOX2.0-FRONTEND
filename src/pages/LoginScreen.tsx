import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/App";
import { toast } from "@/hooks/use-toast";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "demo@cybersec.com",
    password: "SecurePass123!",
    name: "Demo User",
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate authentication
    const userName = isLogin ? formData.email.split('@')[0] : formData.name;
    login(userName);

    toast({
      title: "Success!",
      description: isLogin ? "Welcome back!" : "Account created successfully!",
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-black/95 flex flex-col overflow-x-hidden relative">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-3xl -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,136,0.08),transparent_50%)] -z-10"></div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative z-10 max-w-7xl mx-auto w-full min-h-[80vh]">
        {/* Left Side - Features */}
        <motion.div
          className="lg:w-1/2 lg:pr-12 text-center lg:text-left mb-8 sm:mb-12 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8">
            {/* Main Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="text-white">Security</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                Advanced cybersecurity protection powered by artificial intelligence
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="glass-card rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex p-3 rounded-xl bg-blue-500/20 mb-4 text-blue-400">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  Phishing Detection
                </h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Real-time email & message scanning
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex p-3 rounded-xl bg-green-500/20 mb-4 text-green-400">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Password Security
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Strength analysis & breach monitoring
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex p-3 rounded-xl bg-purple-500/20 mb-4 text-purple-400">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Safety Mode
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Content filtering & threat protection
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex p-3 rounded-xl bg-yellow-500/20 mb-4 text-yellow-400">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Gamified Learning
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Interactive challenges & security quests
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login/Signup Form */}
        <motion.div
          className="lg:w-1/2 w-full max-w-sm mx-auto px-4 lg:px-0 lg:max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="mb-8 text-white/70 hover:text-primary transition-all duration-300 hover:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent-password/20 backdrop-blur-sm border border-white/10">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-cyber font-bold text-white mb-3">
              {isLogin ? "Welcome Back" : "Create Your Secure Space"}
            </h1>
            <p className="text-white/70 text-lg">
              {isLogin ? "Sign in to your account" : "Join the cybersecurity revolution"}
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {!isLogin && (
                  <div>
                    <Label htmlFor="name" className="text-white font-semibold text-lg mb-3 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-lg"
                    />
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Label htmlFor="email" className="text-white font-semibold text-lg mb-3 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Label htmlFor="password" className="text-white font-semibold text-lg mb-3 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 pr-12 text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {isLogin && (
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, rememberMe: checked as boolean })
                      }
                      className="border-white/30"
                    />
                    <Label htmlFor="remember" className="text-white/80 font-medium cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Button
                  type="submit"
                  className="w-full max-w-sm mx-auto bg-gradient-to-r from-primary to-accent-password hover:from-primary/90 hover:to-accent-password/90 text-white text-lg sm:text-xl py-4 sm:py-6 px-6 sm:px-8 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 touch-manipulation"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-black/40 px-4 py-2 text-white/60 backdrop-blur-sm rounded-lg border border-white/10">OR</span>
                </div>
              </motion.div>

              {/* Google Authentication - Temporarily disabled
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white text-lg py-6 px-8 rounded-2xl backdrop-blur-sm transition-all duration-300"
                  onClick={() => {
                    login("Google User");
                    navigate('/dashboard');
                  }}
                >
                  Continue with Google
                </Button>
              </motion.div>
              */}
            </form>

            {/* Toggle Login/Register */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-white/70">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-accent-password font-semibold transition-all duration-300 hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </motion.div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-xs sm:text-sm text-white/60 text-center mt-6 sm:mt-8 px-4"
          >
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:text-accent-password transition-colors duration-300 underline">
              Terms
            </a>
            {" & "}
            <a href="#" className="text-primary hover:text-accent-password transition-colors duration-300 underline">
              Privacy Policy
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;
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
    <div className="min-h-screen bg-black/95 relative overflow-x-hidden">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-3xl -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,136,0.08),transparent_50%)] -z-10"></div>
      
      {/* Back to Home - Fixed Top Left */}
      <div className="fixed top-5 left-5 z-30">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg group touch-manipulation flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
          <span className="text-sm font-medium sm:hidden">Back</span>
        </Button>
      </div>
      
      {/* PARANOX Logo - Fixed Top Right */}
      <div className="fixed top-5 right-5 z-30 flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent-password/20 backdrop-blur-sm border border-white/10">
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <span className="text-base sm:text-lg font-cyber font-bold text-white hidden sm:block">PARANOX</span>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10 min-h-screen flex items-center justify-center" style={{maxWidth: '1200px'}}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full">
          {/* Left Side - Features */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0"
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
            className="w-full lg:w-1/2 max-w-md mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >

            {/* Logo & Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-6 sm:mb-8"
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent-password/20 backdrop-blur-sm border border-white/10">
                  <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-cyber font-bold text-white mb-2 sm:mb-3">
                {isLogin ? "Welcome Back" : "Create Your Secure Space"}
              </h1>
              <p className="text-white/70 text-base sm:text-lg">
                {isLogin ? "Sign in to your account" : "Join the cybersecurity revolution"}
              </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 border-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl w-full"
              style={{maxWidth: '400px', margin: '0 auto', boxSizing: 'border-box'}}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" style={{width: '100%', boxSizing: 'border-box'}}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mb-4 sm:mb-6"
                  style={{width: '100%', boxSizing: 'border-box'}}
                >
                  {!isLogin && (
                    <div style={{width: '100%', boxSizing: 'border-box'}}>
                      <Label htmlFor="name" className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3 block">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border-white/10 rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-white/20 text-base sm:text-lg"
                        style={{width: '100%', boxSizing: 'border-box'}}
                      />
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-4 sm:mb-6"
                  style={{width: '100%', boxSizing: 'border-box'}}
                >
                  <Label htmlFor="email" className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border-white/10 rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-white/20 text-base sm:text-lg"
                    style={{width: '100%', boxSizing: 'border-box'}}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mb-4 sm:mb-6"
                  style={{width: '100%', boxSizing: 'border-box'}}
                >
                  <Label htmlFor="password" className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3 block">
                    Password
                  </Label>
                  <div className="relative" style={{width: '100%', boxSizing: 'border-box'}}>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-white/5 border-white/10 rounded-xl px-3 sm:px-4 py-3 sm:py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 hover:border-white/20 pr-12 text-base sm:text-lg"
                      style={{width: '100%', boxSizing: 'border-box'}}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary transition-all duration-300 p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mb-4 sm:mb-6"
                  style={{width: '100%', boxSizing: 'border-box'}}
                >
                  {isLogin && (
                    <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10" style={{width: '100%', boxSizing: 'border-box'}}>
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, rememberMe: checked as boolean })
                        }
                        className="border-white/30 focus:ring-2 focus:ring-primary/50"
                      />
                      <Label htmlFor="remember" className="text-white/80 font-medium cursor-pointer text-sm sm:text-base">
                        Remember me
                      </Label>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="mb-4 sm:mb-6"
                  style={{width: '100%', boxSizing: 'border-box'}}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-accent-password hover:from-primary/90 hover:to-accent-password/90 text-white text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-black touch-manipulation"
                    style={{width: '100%', boxSizing: 'border-box'}}
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </Button>
                </motion.div>

              {/* Divider - Only show for login */}
              {isLogin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="relative my-6"
                >
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-black/40 px-4 py-2 text-white/60 backdrop-blur-sm rounded-lg border border-white/10">OR</span>
                  </div>
                </motion.div>
              )}

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
                className="text-center"
              >
                <p className="text-white/70 text-sm sm:text-base">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  {" "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary hover:text-accent-password font-semibold transition-all duration-300 hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-1"
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
              className="text-xs sm:text-sm text-white/60 text-center mt-4 sm:mt-6 leading-relaxed"
            >
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:text-accent-password transition-colors duration-300 underline focus:outline-none focus:ring-1 focus:ring-primary/50 rounded">
                Terms
              </a>
              {" & "}
              <a href="#" className="text-primary hover:text-accent-password transition-colors duration-300 underline focus:outline-none focus:ring-1 focus:ring-primary/50 rounded">
                Privacy Policy
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
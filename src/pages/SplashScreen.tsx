import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Brain, Lock, Users, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";

const features = [
  {
    icon: Brain,
    title: "Stop Phishing & Scams Before They Get You",
    subtitle: "AI-powered real-time phishing detection",
    color: "accent-phishing"
  },
  {
    icon: Lock,
    title: "Check Password Strength & Leaks in Seconds",
    subtitle: "Stay safe from breaches instantly",
    color: "accent-password"
  },
  {
    icon: Users,
    title: "Protect Kids with Safe Mode",
    subtitle: "AI ensures safe browsing for children",
    color: "accent-safety"
  }
];

const SplashScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % features.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black/95 flex flex-col overflow-x-hidden scroll-smooth relative">
      {/* Glass Morphism Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-3xl -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,136,0.08),transparent_50%)] -z-10"></div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 transition-all duration-500 hover:bg-black/70">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary drop-shadow-lg filter brightness-110" />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary via-accent-password to-primary bg-clip-text text-transparent">CyberGuardian</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="relative text-white/90 hover:text-primary transition-all duration-300 font-medium px-4 py-3 rounded-lg group overflow-hidden"
            >
              <span className="relative z-10">Features</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent-password transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent-password/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="relative text-white/90 hover:text-primary transition-all duration-300 font-medium px-4 py-3 rounded-lg group overflow-hidden"
            >
              <span className="relative z-10">About</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent-password transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent-password/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="relative text-white/90 hover:text-primary transition-all duration-300 font-medium px-4 py-3 rounded-lg group overflow-hidden"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent-password transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent-password/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white/80 hover:text-primary transition-all duration-300 p-3 sm:p-2 rounded-lg hover:bg-white/5 backdrop-blur-sm touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} className="sm:w-6 sm:h-6" /> : <Menu size={28} className="sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden mx-4 sm:mx-6 mb-4"
            >
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-white/80 hover:text-primary transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/5 text-lg touch-manipulation"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-white/80 hover:text-primary transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/5 text-lg touch-manipulation"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-white/80 hover:text-primary transition-all duration-300 text-left px-4 py-3 rounded-lg hover:bg-white/5 text-lg touch-manipulation"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Animated Background */}
      <div className="absolute inset-0 opacity-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/60 rounded-full" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent-password/60 rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-accent-phishing/60 rounded-full" />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 py-20 sm:py-32 lg:py-40 relative z-10 max-w-7xl mx-auto w-full min-h-[90vh] pt-24 sm:pt-32 md:pt-40">
        {/* Left Side - Text Content */}
        <motion.div 
          className="lg:w-1/2 lg:pr-12 text-center lg:text-left mb-8 sm:mb-12 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cyber font-bold text-white mb-6 sm:mb-8 mt-4 sm:mt-8 md:mt-12">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Cybersecurity
            </span>
            <br />
            <span className="text-white">Guardian</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-body mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
            Your AI-powered cybersecurity assistant that protects you from online threats in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-4 px-4 sm:px-0">
            <Button
              onClick={() => navigate('/login')}
              className="bg-gradient-primary hover:glow-primary btn-cyber text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 font-semibold w-full sm:w-auto touch-manipulation"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 w-full sm:w-auto touch-manipulation"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right Side - Feature Card */}
        <motion.div
          className="lg:w-1/2 max-w-md w-full px-4 sm:px-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Feature Carousel - Hidden on mobile */}
          <div className="w-full hidden sm:block">
            <div className="relative h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 glass-card rounded-3xl p-8 text-center border-2 border-white/10 shadow-2xl shadow-black/20"
                >
                  <div className="flex justify-center mb-4">
                    <div className={
                      features[currentSlide].color === 'accent-phishing'
                        ? 'text-accent-phishing'
                        : features[currentSlide].color === 'accent-password'
                        ? 'text-accent-password'
                        : 'text-accent-safety'
                    }>
                      {(() => {
                        const Icon = features[currentSlide].icon;
                        return <Icon className="h-16 w-16 drop-shadow-lg" />;
                      })()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-cyber drop-shadow-md">
                    {features[currentSlide].title}
                  </h3>
                  <p className="text-white/80 font-body leading-relaxed">
                    {features[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary transition-all duration-300 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-primary/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-primary transition-all duration-300 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-primary/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-primary shadow-lg shadow-primary/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-md border-t border-white/5 py-16 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary drop-shadow-lg" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-password bg-clip-text text-transparent">CyberGuardian</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Advanced AI-powered cybersecurity protection for individuals and enterprises worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300 cursor-pointer border border-primary/20">
                  <span className="text-sm font-bold">T</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300 cursor-pointer border border-primary/20">
                  <span className="text-sm font-bold">L</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300 cursor-pointer border border-primary/20">
                  <span className="text-sm font-bold">G</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection('features')}
                  className="block text-white/70 hover:text-primary transition-all duration-300 text-left hover:translate-x-1"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block text-white/70 hover:text-primary transition-all duration-300 text-left hover:translate-x-1"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block text-white/70 hover:text-primary transition-all duration-300 text-left hover:translate-x-1"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Support</h4>
              <div className="space-y-2 text-white/70">
                <p className="hover:text-primary transition-colors duration-300 cursor-pointer">support@cyberguardian.com</p>
                <p className="hover:text-primary transition-colors duration-300 cursor-pointer">+1 (555) 123-4567</p>
                <p className="hover:text-primary transition-colors duration-300 cursor-pointer">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/70 hover:text-primary transition-all duration-300 hover:translate-x-1">Privacy Policy</a>
                <a href="#" className="block text-white/70 hover:text-primary transition-all duration-300 hover:translate-x-1">Terms of Service</a>
                <a href="#" className="block text-white/70 hover:text-primary transition-all duration-300 hover:translate-x-1">Security</a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} CyberGuardian. All rights reserved.
              </p>
              <p className="text-white/70 text-sm mt-2 md:mt-0 bg-gradient-to-r from-primary/20 to-accent-password/20 px-4 py-2 rounded-full backdrop-blur-sm">
                Developed by - Team AGENT FORGE
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SplashScreen;
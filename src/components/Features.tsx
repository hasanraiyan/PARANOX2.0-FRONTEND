import { motion } from "framer-motion";
import { ShieldCheck, Globe, Lock, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "AI Detection of Phishing & Scams",
      subtitle: "Real-time Threat Intelligence",
      description: "Advanced AI algorithms detect phishing emails, scam calls, and fraud SMS before they reach you. Our machine learning models analyze patterns, sender behavior, and content to identify malicious communications instantly.",
      features: ["Email phishing detection", "Scam call identification", "SMS fraud alerts", "Real-time blocking"],
      color: "primary",
      rightContent: {
        title: "Advanced AI Protection",
        stats: ["99.7% Accuracy", "24/7 Monitoring", "Instant Alerts", "Zero False Positives"]
      }
    },
    {
      icon: Lock,
      title: "Password Security & Dark Web Monitoring",
      subtitle: "Comprehensive Credential Protection",
      description: "Check password strength in real-time and get instant alerts if your credentials appear on the dark web. Our system continuously monitors breach databases to keep your accounts secure.",
      features: ["Real-time strength analysis", "Dark web monitoring", "Breach notifications", "Secure password storage"],
      color: "accent-password",
      rightContent: {
        title: "Password Intelligence",
        stats: ["Military-grade encryption", "Dark web scanning", "Instant breach alerts", "Secure vault storage"]
      }
    },
    {
      icon: Users,
      title: "Cyberbullying Detection & Safety Mode",
      subtitle: "AI-Powered Protection for All Ages",
      description: "Detect cyberbullying across social media and messaging platforms. Our child and student safety mode provides age-appropriate protection with customizable content filtering and usage monitoring.",
      features: ["Cyberbullying detection", "Content filtering", "Usage monitoring", "Safe search enforcement"],
      color: "accent-safety",
      rightContent: {
        title: "Family Safety Suite",
        stats: ["AI content analysis", "Behavioral monitoring", "Customizable filters", "Real-time alerts"]
      }
    },
    {
      icon: Globe,
      title: "Gamified Security Awareness",
      subtitle: "Interactive Learning Experience",
      description: "Transform security education into an engaging game. Users learn cybersecurity best practices through interactive challenges, quizzes, and real-world simulations that make learning fun and effective.",
      features: ["Interactive challenges", "Security quizzes", "Progress tracking", "Achievement badges"],
      color: "accent-phishing",
      rightContent: {
        title: "Security Education Platform",
        stats: ["85% Engagement Rate", "Interactive Learning", "Progress Analytics", "Certification Ready"]
      }
    }
  ];

  return (
    <>
      {/* Features Section Header */}
      <section className="py-20 lg:py-32 px-6 bg-gradient-to-b from-black/20 to-black/40 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-password/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-cyber font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Advanced Security
            </span>
            <br />
            <span className="text-white">Features</span>
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-primary mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          ></motion.div>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Comprehensive protection powered by cutting-edge AI technology. Our advanced security suite
            provides multiple layers of defense against modern cyber threats.
          </motion.p>
        </div>
      </section>

      {features.map((feature, index) => (
        <section
          key={index}
          className={`py-20 lg:py-32 px-6 relative overflow-hidden ${
            index % 2 === 0
              ? 'bg-gradient-to-b from-black/20 to-black/40'
              : 'bg-gradient-to-b from-black/40 to-black/60'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:20px_20px]"></div>
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-password/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div>
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-password/20 flex items-center justify-center mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
                  >
                    <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                  </motion.div>

                  <motion.h2
                    className="text-4xl md:text-5xl font-cyber font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    {feature.title}
                  </motion.h2>

                  <motion.p
                    className="text-xl text-primary font-semibold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  >
                    {feature.subtitle}
                  </motion.p>

                  <motion.div
                    className="w-24 h-1 bg-gradient-primary mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  ></motion.div>
                </div>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                >
                  {feature.description}
                </motion.p>

                {/* Feature List */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-4"
                >
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center text-muted-foreground group">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-sm group-hover:text-white/80 transition-colors duration-300">{item}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Text Based */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
                  className="group"
                >
                  <div className="glass-card p-8 lg:p-12 rounded-3xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                    <div className="space-y-6">
                      <motion.h3
                        className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                      >
                        {feature.rightContent.title}
                      </motion.h3>

                      <div className="grid grid-cols-2 gap-4">
                        {feature.rightContent.stats.map((stat, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.6 + (i * 0.1),
                              duration: 0.5,
                              ease: "backOut"
                            }}
                            className="bg-gradient-to-br from-primary/10 to-accent-password/10 rounded-xl p-4 border border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                          >
                            <div className="text-primary font-bold text-sm group-hover:scale-105 transition-transform duration-300">
                              {stat}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Additional visual element */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                        className="flex items-center justify-center mt-6"
                      >
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${feature.color} to-accent-password flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Features;

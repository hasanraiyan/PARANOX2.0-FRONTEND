import { motion } from "framer-motion";
import { Brain, Shield, Zap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32 px-6 bg-gradient-to-b from-black/40 to-black/60 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] [background-size:20px_20px]"></div>
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
              <motion.h2
                className="text-4xl md:text-5xl font-cyber font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  About
                </span>
                <br />
                <span className="text-white">CyberGuardian</span>
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-primary mb-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              ></motion.div>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >
                <strong className="text-white">CyberGuardian</strong> was founded in 2023 with a simple yet powerful mission:
                to democratize advanced cybersecurity protection and make it accessible to everyone, from individuals
                to large enterprises.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                Our team of world-class security experts, AI researchers, and software engineers work tirelessly
                to stay ahead of emerging cyber threats. We believe that effective cybersecurity shouldn't be
                complex or expensive.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                Today, <strong className="text-white">CyberGuardian</strong> protects over 10 million users worldwide,
                from individual consumers to Fortune 500 companies. Our AI-powered platform processes billions
                of security events daily, continuously learning and adapting to new threats.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              {[
                { number: "10M+", label: "Protected Users" },
                { number: "99.9%", label: "Uptime SLA" },
                { number: "24/7", label: "Expert Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="glass-card p-4 rounded-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {[
              {
                title: "Our Technology",
                content: "We leverage cutting-edge machine learning algorithms and behavioral analysis to detect threats that traditional security solutions miss.",
                icon: Brain
              },
              {
                title: "Our Mission",
                content: "To make advanced cybersecurity accessible to everyone, empowering users with the tools they need to stay safe online.",
                icon: Shield
              },
              {
                title: "Our Vision",
                content: "A world where cybersecurity is seamless, invisible, and effective - protecting users without compromising their digital experience.",
                icon: Zap
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + (index * 0.1),
                  duration: 0.6,
                  ease: "backOut"
                }}
                className="group"
              >
                <div className="glass-card p-6 lg:p-8 rounded-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent-password/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

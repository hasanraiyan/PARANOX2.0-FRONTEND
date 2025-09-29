import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-32 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-black/60 to-black relative overflow-hidden w-full">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-password/5 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-cyber font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Get In
            </span>
            <br />
            <span className="text-white">Touch</span>
          </motion.h2>
          <motion.div
            className="w-32 h-1 bg-gradient-primary mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          ></motion.div>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Have questions about our cybersecurity solutions? Need technical support? Our expert team is here
            to help you with all your security needs. Reach out to us today.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you need technical support, have questions about our features, or want to discuss
                enterprise solutions, we're here to help. Choose the method that works best for you.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email Support",
                  content: "support@cyberguardian.com",
                  description: "Get help within 24 hours",
                  color: "primary"
                },
                {
                  icon: Phone,
                  title: "Phone Support",
                  content: "+1 (555) 123-4567",
                  description: "Mon-Fri, 9AM-6PM EST",
                  color: "accent-password"
                },
                {
                  icon: MapPin,
                  title: "Visit Us",
                  content: "123 Cyber Street, Tech City, TC 12345",
                  description: "Schedule an appointment",
                  color: "accent-phishing"
                }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + (index * 0.1),
                    duration: 0.6,
                    ease: "backOut"
                  }}
                  className="group"
                >
                  <div className="glass-card p-4 sm:p-5 lg:p-6 rounded-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 w-full">
                    <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-password/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <contact.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${contact.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          {contact.title}
                        </h4>
                        <p className="text-lg sm:text-xl md:text-2xl font-mono text-primary mb-1 font-bold break-all">
                          {contact.content}
                        </p>
                        <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="pt-8"
            >
              <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  { name: 'Twitter', initial: 'T' },
                  { name: 'LinkedIn', initial: 'L' },
                  { name: 'GitHub', initial: 'G' },
                  { name: 'Discord', initial: 'D' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.7 + (index * 0.1),
                      duration: 0.5,
                      ease: "backOut"
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-password/20 flex items-center justify-center text-white font-bold hover:border-primary/50 border border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    {social.initial}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="glass-card p-5 sm:p-6 lg:p-8 rounded-2xl max-h-[600px] overflow-y-auto w-full"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Send Us a Message</h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:py-3 text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-sm max-w-full"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 sm:py-3 text-white placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-sm max-w-full"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 text-sm"
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 hover:border-white/20 resize-none text-sm"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
              >
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent-password text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base md:text-base lg:text-lg"
                  style={{ minWidth: "250px" }}
                >
                  <span className="flex items-center justify-center">
                    Send Message
                  </span>
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="text-xs text-muted-foreground text-center"
              >
                We typically respond within 24 hours. For urgent issues, please call us directly.
              </motion.p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

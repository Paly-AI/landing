import { motion } from "framer-motion";
import { Mail, Twitter, Instagram, Github, Youtube, YoutubeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Logo } from "./Logo";
import links from "../../links.json";

export function Footer() {
  const socialLinks = [
    { icon: Mail, href: links.email, label: "Email" },
    { icon: YoutubeIcon, href: links.youtube, label: "Youtube" },
    { icon: Twitter, href: links.twitter, label: "Twitter" },
    { icon: Instagram, href: links.instagram, label: "Instagram" },
    { icon: Github, href: links.github, label: "GitHub" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 25,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div 
                className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Logo />
              </motion.div>
              <span className="text-xl font-bold text-foreground">Paly AI</span>
            </motion.div>
            <p className="text-muted-foreground max-w-sm">
              A student-run club empowering Paly students to build AI apps, start companies, and create the next generation of innovators.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <motion.div 
              className="flex flex-col space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {["About Us", "Programs", "Contact"].map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '')}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }
                  }}
                  whileHover={{ 
                    x: 4,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Connect With Us</h3>
            <motion.div 
              className="flex space-x-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.4
                  }
                }
              }}
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      scale: 0.8,
                      y: 10
                    },
                    visible: { 
                      opacity: 1, 
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="rounded-full hover:bg-primary/10 hover:text-primary"
                  >
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Disclaimer: Paly AI is a student-run club, not <br />
              managed by Palo Alto Unified School District.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="border-t border-border mt-8 pt-8 text-center"
        >
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Paly AI. Building the future, one idea at a time.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
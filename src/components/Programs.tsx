import { motion } from "framer-motion";
import { Code, Users, MessageCircle, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Programs() {
  const programs = [
    {
      icon: Code,
      title: "Superintelligence Labs",
      description: "Got a cool app idea? Want to build the next big startup? Join our labs where we brainstorm, code, and turn your wildest ideas into real products as a team.",
      highlights: ["Build Sessions", "Startup Mentorship", "AI & Full-Stack Dev", "Demo Days"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Speaker Series",
      description: "Speaker series featuring leaders at the forefront of AI revolution. Every month we invite a new guest to share their journey and insights.",
      // highlights: ["Industry Leaders", "Fireside Chats", "Career Advice", "Networking Opportunities"],
      highlights: [],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Bay Area HS Ambassador Program",
      description: "Help us spread the Paly AI movement to other high schools across the Bay Area. Lead workshops, start clubs, and build a network of teen innovators.",
      highlights: ["Leadership Experience", "Public Speaking", "Event Planning", "Regional Impact"],
      color: "from-green-500 to-emerald-500",
      disabled: true
    },
    {
      icon: Briefcase,
      title: "Mentorship + Internship Program",
      description: "Skip the coffee runs. Get matched with industry mentors and land real internships at AI companies where you'll work on actual products.",
      highlights: ["1-on-1 Mentorship", "Real Internships", "Resume Building", "Industry Connections"],
      color: "from-orange-500 to-red-500",
      disabled: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  const highlightVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="programs" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-foreground mb-6 scroll-mt-60"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            Main Programs in 2025
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            Four hands-on programs where you'll build real products, meet industry leaders, and launch your journey into AI and entrepreneurship.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
            >
              {/* Backdrop Glow */}
              {!program.disabled && (
                <div className="absolute z-10">
                  <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${program.color} rounded-full blur-3xl opacity-30 transition-opacity`}></div>
                </div>
              )}

              <Card className={`h-full hover:shadow-soft transition-all duration-500 group border-border/50 hover:border-primary/20 overflow-clip relative flex flex-col justify-between ${program.disabled ? "cursor-not-allowed" : ""}`}>
                {program.disabled && (
                  <div className="w-full h-full bg-card absolute z-10 opacity-85 rounded-lg flex items-center justify-center">
                    {/* <span className="font-light text-2xl">Coming Soon</span> */}
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-gradient-to-br from-background to-card border border-primary/20 rounded-xl px-6 py-3 shadow-lg"
                      >
                        <span className="font-medium text-base sm:text-lg text-foreground">Coming Soon</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                <CardHeader className={`pb-4 ${program.disabled ? "blur-[.1rem]" : ""}`}>
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center flex-shrink-0`}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                      }}
                    >
                      <program.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.div
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <CardTitle className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {program.title}
                        </CardTitle>
                      </motion.div>
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {program.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={`pt-0 pb-0 ${program.disabled ? "blur-[.1rem]" : ""}`}>
                  <motion.div 
                    className="grid grid-cols-2 gap-2 mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: index * 0.1 + 0.3
                        }
                      }
                    }}
                  >
                    {program.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlight}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        variants={highlightVariants}
                        whileHover={{ 
                          x: 3,
                          transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                      >
                        <motion.div 
                          className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 hover:bg-primary/80 transition-colors"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ 
                            delay: index * 0.1 + highlightIndex * 0.05 + 0.4,
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          viewport={{ once: true }}
                        />
                        {highlight}
                      </motion.div>
                    ))}
                  </motion.div>
                  {/* <motion.div
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button variant="hero-outline" size="sm" className="group">
                      Learn More
                      <ArrowRight className="w-4 h-4 scale-100 transition-all" />
                    </Button>
                  </motion.div> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              y: -2
            }}
            whileTap={{ 
              scale: 0.98,
              y: 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              mass: 0.8
            }}
          >
            <Button variant="hero" size="lg" className="h-9 rounded-md px-3 md:h-10 md:px-4 md:py-2 group disabled:opacity-25" disabled>
              Become a Club Officer (Closed)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
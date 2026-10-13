import { motion } from "framer-motion";
import { Target, Lightbulb, Rocket, Users } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Target,
      title: "Student-Led Impact",
      description: "Run by students, for students — we know what it's like to balance school, coding, and big dreams."
    },
    {
      icon: Lightbulb,
      title: "Learn by Building",
      description: "Skip the boring theory. Build real AI apps, launch actual startups, and solve problems that matter."
    },
    {
      icon: Rocket,
      title: "Silicon Valley Access",
      description: "Meet founders, engineers, and VCs from top companies. Get internships and mentorship you can't find anywhere else."
    },
    {
      icon: Users,
      title: "Your Startup Squad",
      description: "Find co-founders, collaborate on projects, and build lasting friendships with equally ambitious students."
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

  const featureVariants = {
    hidden: { 
      opacity: 0, 
      y: 25,
      scale: 0.9
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
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            id="aboutus"
            className="text-3xl lg:text-4xl font-bold text-foreground mb-6 scroll-mt-40"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true }}
          >
            About Paly AI
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-[50rem] mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true }}
          >
            We're students at Palo Alto High School who believe the next generation of AI & tech companies should start 
            in high schools, not college dorms. Through hands-on projects, guest speaker events, 
            and real startup incubation, we're giving Paly students the skills and connections to build 
            the future right here in Silicon Valley.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={featureVariants}
              className="text-center group cursor-pointer"
              whileHover={{
                y: -8,
                transition: { 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25 
                }
              }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-glow transition-all duration-300"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25 
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{
                    rotate: 360,
                    transition: { 
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold text-foreground mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 + 0.3
                }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1 + 0.4
                }}
                viewport={{ once: true }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.9, 
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <motion.blockquote 
            className="text-2xl font-medium text-foreground max-w-4xl mx-auto leading-relaxed"
            whileHover={{
              scale: 1.02,
              transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }
            }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              className="block"
              whileHover={{
                scale: 1.02,
                filter: "brightness(1.1)",
                transition: { 
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }}
            >
              The last generation of Silicon Valley technology companies — Apple, Google, etc. — were started 
              in garages, grad schools, and college dorm rooms. Paly AI wishes to make high schools the 
              launchpad of future Silicon Valley technology giants led by our generation.
            </motion.span>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
};
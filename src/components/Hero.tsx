import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-ai-background.jpg";
import palyCampusBackground from "@/assets/paly-campus.jpeg";
import links from "../../links.json";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-25 dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0,1)), url(${palyCampusBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Join the AI Revolution at Paly
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
        >
          High Schoolers Building{" "}
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            the Future of AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Paly AI, officially known as Paly Superintelligence Lab, is a
          student-led AI club at Palo Alto High School dedicated to empowering
          the next generation of AI builders, entrepreneurs, and engineers.
          {/* A student-run club where Paly students learn to build AI apps, start companies, 
          and connect with Silicon Valley leaders. From coding workshops to startup incubation — 
          we're turning ideas into reality. */}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.45,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="hero" size="lg" className="group">
            <a href={links.interest_form} target="_blank">Join Our Mission</a>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="hero-outline" size="lg">
            <a href="#aboutus">Learn More</a>
          </Button>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.8,
            ease: "easeOut"
          }}
          className="mt-12 text-sm text-muted-foreground/90"
        >
          Making high schools the launchpad of future Silicon Valley technology giants
        </motion.div> */}
      </div>
    </section>
  );
}
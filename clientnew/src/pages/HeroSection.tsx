import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-medium tracking-widest uppercase text-sm mb-4"
        >
           I am Afham Sathath
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1]"
        >
          I Craft <span className="text-gradient">Digital</span>
          <br />
          Experiences
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Software Engineer specializing in building premium, high-performance web & mobile applications with robust, scalable architectures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            to="/projects"
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 active:scale-95 transition-all duration-300 glow group flex items-center gap-2"
          >
            <span>View My Work</span>
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-all duration-300 hover:bg-primary/5 shadow-sm"
          >
            Get In Touch
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/AfhamSathath" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/afhamsathath/" },
            { icon: Twitter, href: "https://twitter.com/afhamsathath" }
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 rounded-full glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary transition-colors glow-sm shadow-xl"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link
            to="/about"
            className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
    </section>
  );
};

export default Hero;

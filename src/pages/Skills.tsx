import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Tailwind CSS", level: 95 },
  { name: "MongoDB", level: 95 },
  { name: "MySQL", level: 90 },
  { name: "Figma / Design", level: 75 },
  { name: "java", level: 70 },
  { name: "php", level: 70 },
  { name: "c++", level: 70 },
  { name: "javascript", level: 90 },
];

const technologies = [
  "React", "TypeScript", "Node.js", "MySQL", "MongoDB", "php",
  "Docker", "Figma", "Git", "Tailwind", "Next.js", "Java", "javascript"
];

const Skills = () => {
  return (
    <Layout>
      <section id="skills" className="section-padding bg-secondary/30 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
              My Skills
            </p>
            <h2 className="text-4xl md:text-6xl font-bold">
              Tools & <span className="text-gradient">Technologies</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Skill Bars */}
            <div className="space-y-8">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider">{skill.name}</span>
                    <span className="text-sm font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted/50 overflow-hidden shadow-inner border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full relative"
                      style={{
                        backgroundImage: "var(--gold-gradient)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-4 content-start">
              {technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    boxShadow: "0 10px 20px -5px hsl(var(--primary) / 0.4)"
                  }}
                  className="px-6 py-3 rounded-2xl glass text-sm font-bold text-foreground border border-white/5 hover:border-primary/50 transition-all duration-300 cursor-default shadow-lg"
                >
                  {tech}
                </motion.span>
              ))}

              {/* Additional moving element */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="mt-12 p-8 rounded-3xl glass border border-primary/10 shadow-2xl relative z-10"
              >
                <h4 className="text-xl font-bold mb-3 text-gradient">Full-Stack Capability</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Expertise in both frontend and backend development, delivering
                  robust and scalable solutions with a focus on performance and quality.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Skills;

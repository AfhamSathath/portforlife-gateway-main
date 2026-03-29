import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Coffee } from "lucide-react";
import Layout from "@/components/Layout";
import profileImg from "@/assets/profile.png";

const stats = [
  { icon: Briefcase, value: "1+", label: "Years Experience" },
  { icon: Award, value: "10+", label: "Projects Done" },
  { icon: GraduationCap, value: "3", label: "Certifications" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
];

const About = () => {
  return (
    <Layout>
      <section id="about" className="section-padding overflow-hidden">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glow shadow-2xl group">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width={512}
                  height={512}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
              {/* Decorative accent */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl border-2 border-primary/20 -z-10"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-primary font-bold tracking-widest uppercase text-sm mb-4">
                About Me
              </p>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Passionate about creating{" "}
                <span className="text-gradient">meaningful</span> work
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                I'm a full-stack developer with a keen eye for design and a passion
                for building seamless digital experiences. From concept to
                deployment, I bring ideas to life with clean code and creative
                solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge through
                blog posts and mentoring.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass rounded-2xl p-6 text-center glow-sm border border-white/5 hover:border-primary/20 transition-all duration-300 shadow-xl"
                  >
                    <Icon className="mx-auto mb-3 text-primary" size={28} />
                    <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

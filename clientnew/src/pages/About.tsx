import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Coffee, Code2, Server, Database, Smartphone, Check } from "lucide-react";
import Layout from "@/components/Layout";
import profileImg from "@/assets/profile.jpg";

const stats = [
  { icon: Briefcase, value: "1+", label: "Years Experience" },
  { icon: Award, value: "10+", label: "Projects Done" },
  { icon: GraduationCap, value: "3+", label: "Certifications" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
];

const focusAreas = [
  { icon: Code2, title: "Frontend Engineering", desc: "React, Next.js, TypeScript, Tailwind" },
  { icon: Server, title: "Backend Architecture", desc: "Node.js, Express, RESTful APIs, JWT" },
  { icon: Database, title: "Database Systems", desc: "PostgreSQL, MongoDB, Prisma, SQL" },
  { icon: Smartphone, title: "Mobile Development", desc: "Flutter, Dart, Mobile UI UX Design" },
];

const About = () => {
  return (
    <Layout>
      <section id="about" className="section-padding overflow-hidden relative">
        {/* Abstract background elements */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Column: Image & Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer decorative card */}
              <div className="relative rounded-3xl overflow-hidden glass p-3 border border-white/10 shadow-2xl group">
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Glass overlay with label */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass border border-white/10 backdrop-blur-md shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Current Status</p>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open to New Opportunities
                    </p>
                  </div>
                </div>
              </div>

              {/* Backside decorative glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-transparent rounded-[32px] -z-10 blur-xl group-hover:blur-2xl transition-all" />
            </motion.div>

            {/* Right Column: Detailed Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-primary" /> Get to Know Me
              </p>
              
              <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-foreground tracking-tight leading-tight mb-6">
                Passionate about building{" "}
                <span className="text-gradient">meaningful</span> digital solutions
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                I am a full-stack engineer and designer dedicated to shaping high-performance, visually stunning web and mobile applications. Balancing a sharp eye for layout aesthetics with robust technical architectures, I bring complex ideas to life with clean, modular, and maintainable codebases.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-10 text-sm md:text-base">
                Whether deploying responsive platforms in React/Next.js, designing databases with PostgreSQL, or building performant mobile apps with Flutter, I focus on optimizing user engagement and technical efficiency at every layer.
              </p>

              {/* Core Focus Grid */}
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground mb-4">Core Competencies</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {focusAreas.map((area, idx) => {
                  const FocusIcon = area.icon;
                  return (
                    <div key={idx} className="flex gap-3 items-start p-3.5 glass rounded-xl border border-white/5">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                        <FocusIcon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground mb-1">{area.title}</h4>
                        <p className="text-[11px] text-muted-foreground">{area.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -5 }}
                    className="glass rounded-2xl p-5 text-center border border-white/5 hover:border-primary/20 transition-all duration-300 shadow-md"
                  >
                    <Icon className="mx-auto mb-2 text-primary" size={20} />
                    <p className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">{value}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
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

import { useState, ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Check, Code, Cpu, Smartphone, Globe, Layers, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import doctimeAdmin from "@/assets/doctime-admin.png";
import doctimeMobile from "@/assets/doctime-mobile.jpg";

import { useQuery } from "@tanstack/react-query";

interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  icon?: string;
  category: "mobile" | "web" | "fullstack";
  isFeatured?: boolean;
  tags: string[];
  features: string[];
  architecture: string[];
  liveUrl: string;
  githubUrl: string;
}

const staticProjects: ProjectItem[] = [
  {
    title: "DocTime Telemedicine App",
    subtitle: "Full-Stack Telemedicine & Doctor Appointment Suite",
    description: "A comprehensive telemedicine platform featuring secure patient-doctor consultations, digital prescriptions, and an administrative dashboard.",
    longDescription: "DocTime is a production-ready, full-stack doctor appointment and telemedicine platform designed to bridge the gap between patients and healthcare professionals. The system consists of a feature-rich Flutter mobile application for patients and doctors, coupled with a highly responsive Next.js web dashboard for administrators to manage operations, verify user identities, and analyze platform statistics. The backend is powered by a robust REST API designed with security and scalability at its core.",
    image: doctimeAdmin,
    icon: doctimeMobile,
    category: "mobile",
    isFeatured: true,
    tags: ["Flutter", "Next.js", "React", "TypeScript", "Prisma ORM", "PostgreSQL", "Supabase", "REST API", "JWT", "Nodemailer"],
    features: [
      "Real-time doctor search with dynamic specialty and availability filtering",
      "Secure real-time chat and video consultations for remote diagnosis",
      "Automatic digital prescription generation with direct patient delivery",
      "Comprehensive administration dashboard with charts and operational metrics",
      "Automated verification workflows and email notification dispatches"
    ],
    architecture: [
      "Client: Flutter Mobile Application (iOS & Android) & Next.js React SPA (Admin)",
      "Database: Supabase PostgreSQL instance optimized with Prisma ORM",
      "API Layer: Node.js/Next.js secure serverless routes with strict Zod validation",
      "Infrastructure: High-availability hosting on Vercel with real-time logging"
    ],
    liveUrl: "https://doctor-appoinment-iota.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/doctor-appoinment",
  },
  {
    title: "Career LK Matchmaker",
    subtitle: "Sri Lankan Qualification-based Job Finder",
    description: "A specialized career matchmaking engine connecting job seekers and students directly to vacancies aligned with their qualifications.",
    longDescription: "Career LK is a highly tailored education and job matchmaking platform engineered specifically for the Sri Lankan job market. It bridges the gap between aspirations and opportunities by analyzing users' current academic qualifications, certificates, and skills to recommend matching job opportunities and higher-education pathways. The application prioritizes absolute data privacy and security.",
    image: project1,
    category: "fullstack",
    isFeatured: true,
    tags: ["React", "Node.js", "Express.js", "MongoDB", "TypeScript", "Zod", "JWT", "OTP Verification", "Tailwind CSS"],
    features: [
      "Intelligent matching algorithm comparing user profile qualifications to job criteria",
      "Highly secure authentication utilizing JWT and multi-factor OTP verification via SMS/Email",
      "Recruiter portal with student profile search, tracking, and direct shortlist invites",
      "Clean course explorer suggesting diploma and degree programs to bridge skill gaps"
    ],
    architecture: [
      "Frontend: Single Page React application with styled Tailwind UI and motion elements",
      "Backend: Express.js server utilizing MongoDB and Mongoose ODM models",
      "Validation: Runtime schema validations using Zod for rock-solid security"
    ],
    liveUrl: "https://carrelink-yy4j.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/final-master-main-Final-",
  },
  {
    title: "Exam Paper Moderation System",
    subtitle: "Secure Academic Assessment Moderation",
    description: "An institutional workflow platform designed to streamline, review, and approve exam papers securely.",
    longDescription: "This specialized workflow management platform is crafted for educational institutions to transition their exam paper review, moderation, and approvals to a secure digital environment. It minimizes human error and information leaks by maintaining strict role-based access control and detailed review histories.",
    image: project2,
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "TypeScript", "JWT", "Bcrypt", "Mongoose", "Tailwind CSS"],
    features: [
      "Custom multi-step approval workflow for educators, moderators, and deans",
      "Secure document viewing pane preventing unauthorized downloads or prints",
      "Interactive comment threads directly tied to specific paper sections",
      "Detailed activity log capturing every review, modification, and state change"
    ],
    architecture: [
      "Frontend: React with client-side routes and secure context state storage",
      "Backend: RESTful API built on Node/Express with JWT verification middleware",
      "Data: Document schema models on MongoDB with automated backups"
    ],
    liveUrl: "https://exams-pearl.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/exam-manager-pro",
  },
  {
    title: "MechAlert Assistance",
    subtitle: "Real-time Mechanic Location & Booking Platform",
    description: "A location-aware vehicle breakdown assistance platform connecting motorists with mechanics instantly.",
    longDescription: "MechAlert solves roadside vehicle breakdowns by pairing stranded drivers with the nearest qualified mechanic in real-time. Emulating modern ride-hailing UX, the system provides live tracking, transparent pricing, and instant communication to turn a stressful situation into a seamless resolution.",
    image: project3,
    category: "fullstack",
    isFeatured: true,
    tags: ["React", "Node.js", "MongoDB", "Express.js", "Geolocation", "WebSockets", "Payment API", "Tailwind CSS"],
    features: [
      "Live GPS-based location tracking showing active mechanics on an interactive map",
      "Bidirectional WebSocket messaging system for instant chat and status updates",
      "Integrated secure payment processing for roadside service fees",
      "Dynamic distance-calculating algorithms to assign tasks to the closest mechanic"
    ],
    architecture: [
      "Client: Responsive mobile-first React dashboard for both drivers and mechanics",
      "Server: Express.js with Socket.io server layer handling concurrent live connections",
      "Database: MongoDB with GeoJSON indexes to support rapid spatial queries"
    ],
    liveUrl: "https://mech-alert.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/mech-alert-system",
  },
  {
    title: "Skill Management & Analyzer",
    subtitle: "Competency Matrix & Skill Mapping Platform",
    description: "An enterprise tool designed to analyze, map, and track individual and organization-wide capabilities.",
    longDescription: "A comprehensive tool designed for HR managers and team leads to understand their talent pool's strengths, map skill gaps, and coordinate targeted training programs. The application converts complex assessment data into visual, actionable insights.",
    image: project4,
    category: "web",
    tags: ["React", "Node.js", "MySQL", "Express.js", "TypeScript", "Chart.js", "JWT", "Tailwind CSS"],
    features: [
      "Interactive skill matrix radar charts and radar graphs for employees",
      "Automated organizational skill gap analysis generating automated learning paths",
      "Self-assessment and peer-review request workflow channels",
      "Manager dash facilitating performance review data and certification logs"
    ],
    architecture: [
      "Frontend: React SPA with Chart.js visualization libraries",
      "Backend: Node.js API server connected via SQL connection pools",
      "Data: Structured MySQL database with custom analytics views"
    ],
    liveUrl: "https://skillmanagment.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/skillmanagment",
  },
  {
    title: "Student Management System",
    subtitle: "Centralized Academic Registry & Communications",
    description: "A centralized administration portal for managing student registry records, attendance, and reporting.",
    longDescription: "A modern student information system (SIS) crafted to reduce administrative workloads for schools. It integrates student profiles, attendance tracking, and reporting tools into a single, intuitive interface, promoting transparency and quick communication.",
    image: project5,
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "TypeScript", "Bcrypt", "Mongoose", "Tailwind CSS"],
    features: [
      "Robust student registry with history, profile details, and grade trackers",
      "Real-time attendance registration with automated parent notifications",
      "Dynamic grade book computing term averages and generating digital report cards",
      "Internal messaging hub for secure teacher, administrator, and parent updates"
    ],
    architecture: [
      "Frontend: React using Tailwind UI and modular layout elements",
      "Backend: Express server utilizing Mongoose schemas",
      "Data Storage: Secure MongoDB Atlas cloud database instances"
    ],
    liveUrl: "https://lms-system-frontends.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/Lms-System",
  },
];

const fetchProjects = async () => {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const Projects = () => {
  const { data: apiProjects } = useQuery<ProjectItem[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : staticProjects;

  const [activeFilter, setActiveFilter] = useState<"all" | "featured" | "mobile" | "web" | "fullstack">("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "features" | "architecture">("overview");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return !!project.isFeatured;
    return project.category === activeFilter;
  });

  interface FilterTab {
    id: "all" | "featured" | "mobile" | "web" | "fullstack";
    label: string;
    icon?: ComponentType<any>;
  }

  const filterTabs: FilterTab[] = [
    { id: "all", label: "All Projects" },
    { id: "featured", label: "Featured" },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
    { id: "web", label: "Web Apps", icon: Globe },
    { id: "fullstack", label: "Full-Stack", icon: Layers },
  ];

  return (
    <Layout>
      <section id="projects" className="section-padding overflow-hidden relative">
        {/* Glow elements */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
              Case Studies & Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Explore my collection of production-grade systems, mobile applications, and web tools designed with clean code and robust user experiences.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 glass rounded-2xl border border-white/5 max-w-3xl">
              {filterTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isActive 
                        ? "text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {IconComponent && <IconComponent size={14} />}
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: ProjectItem, i: number) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col glass rounded-3xl overflow-hidden hover:glow transition-all duration-500 shadow-xl border border-white/5 cursor-pointer h-full"
                  onClick={() => {
                    setSelectedProject(project);
                    setModalTab("overview");
                  }}
                >
                  {/* Thumbnail Image Wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40 border-b border-white/5">
                    {project.icon && (
                      <div className="absolute top-4 left-4 z-10 w-12 h-12 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40 backdrop-blur-sm p-0.5">
                        <img src={project.icon} alt="App Icon" className="w-full h-full object-cover rounded-lg" />
                      </div>
                    )}
                    {project.isFeatured && (
                      <span className="absolute top-4 right-4 z-10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                        ★ Featured
                      </span>
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <span className="text-primary font-bold text-xs uppercase tracking-widest">Case Study</span>
                      <h4 className="text-xl font-bold text-foreground line-clamp-1">{project.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 max-w-xs">{project.subtitle}</p>
                      <span className="mt-2 flex items-center gap-1.5 text-xs text-primary font-semibold px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                        View Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
                          {project.category === "mobile" ? "Mobile Application" : project.category === "fullstack" ? "Full-Stack System" : "Web Application"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.slice(0, 4).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-[9px] font-semibold uppercase tracking-wider rounded-md bg-muted/60 text-muted-foreground border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-3 py-1 text-[9px] font-semibold uppercase tracking-wider rounded-md bg-primary/10 text-primary border border-primary/20">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-background/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header Cover */}
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/20 border-b border-white/5 flex-shrink-0">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-foreground border border-white/10 transition-all z-20"
                >
                  <X size={18} />
                </button>

                {/* Cover info */}
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30 backdrop-blur-md mb-2 inline-block">
                      {selectedProject.category === "mobile" ? "Mobile App" : selectedProject.category === "fullstack" ? "Full-Stack System" : "Web App"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight drop-shadow-md">
                      {selectedProject.title}
                    </h3>
                    <p className="text-muted-foreground text-sm drop-shadow-sm line-clamp-1">{selectedProject.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Modal Tabs Header */}
              <div className="flex border-b border-white/5 px-6 bg-secondary/30 flex-shrink-0">
                {(["overview", "features", "architecture"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setModalTab(tab)}
                    className={`relative py-4 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                      modalTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {modalTab === tab && (
                      <motion.div
                        layoutId="modalTabLine"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-8 flex-grow">
                <AnimatePresence mode="wait">
                  {modalTab === "overview" && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">Project Overview</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">Technologies Leveraged</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-secondary text-foreground border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {modalTab === "features" && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-bold text-foreground mb-2">Key Functionalities & Features</h4>
                      <div className="grid gap-3">
                        {selectedProject.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-3 items-start p-3 bg-secondary/20 rounded-xl border border-white/5">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                              <Check size={12} className="stroke-[3]" />
                            </span>
                            <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {modalTab === "architecture" && (
                    <motion.div
                      key="architecture"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-bold text-foreground mb-2">System Architecture & Deployment</h4>
                      <div className="grid gap-3">
                        {selectedProject.architecture.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start p-3 bg-secondary/20 rounded-xl border border-white/5">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                              <Cpu size={12} className="stroke-[3]" />
                            </span>
                            <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-t border-white/5 bg-secondary/20 flex-shrink-0">
                <div className="flex gap-4">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg hover:shadow-primary/20 transition-all"
                  >
                    <ExternalLink size={14} /> Launch Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-white/5 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <Github size={14} /> Source Code
                  </a>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Projects;

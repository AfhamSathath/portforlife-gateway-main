import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Layout from "@/components/Layout";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

import { useQuery } from "@tanstack/react-query";

const staticProjects = [
  {
    title: "Carrer LK(Education & Job Master)",
    description: "Qualififcation Based Education and Job finder System fro SriLankan's",
    image: project1,
    tags: ["React", "axios", "zod validations", "Node.js", "OTP verification", "API integration", "MongoDB", "Express.js", "typescript", "jwt", "bcrypt", "cors", "dotenv", "express", "mongoose", "nodemon", "react", "react-dom", "react-router-dom", "react-scripts", "tailwindcss"],
    liveUrl: "https://carrelink-yy4j.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/final-master-main-Final-",
  },
  {
    title: "Exam Paper Moderation System",
    description: "This system is designed to streamline the process of exam paper moderation for educational institutions. It provides a secure and efficient platform for educators to review, edit, and approve exam papers before they are distributed to students.",
    image: project2,
    tags: ["React", "Node.js", "MongoDB", "API integration", "Express.js", "typescript", "jwt", "bcrypt", "cors", "dotenv", "express", "mongoose", "nodemon", "react", "react-dom", "react-router-dom", "react-scripts", "tailwindcss"],
    liveUrl: "https://exams-pearl.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/exam-manager-pro",
  },
  {
    title: "MechAlert: Nearby Mechanic Assistance System",
    description: "A real-time vehicle breakdown assistance platform connecting drivers with nearby mechanics through an intelligent, location-aware matching system.",
    image: project3,
    tags: ["React", "Node.js", "MongoDB", "API integration", "live location tracking", "real time chat", "payment integration", "Express.js", "typescript", "jwt", "bcrypt", "cors", "dotenv", "express", "mongoose", "nodemon", "react", "react-dom", "react-router-dom", "react-scripts", "tailwindcss"],
    liveUrl: "https://mech-alert.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/mech-alert-system",
  },
  {
    title: "Skill Managment and Analyzing System",
    description: "A comprehensive skill management and analysis platform designed to help individuals and organizations track, evaluate, and enhance their professional skills.",
    image: project4,
    tags: ["React", "Node.js", "MySQL", "API integration", "Express.js", "typescript", "jwt", "bcrypt", "cors", "dotenv", "express", "nodemon", "react", "react-dom", "react-router-dom", "react-scripts", "tailwindcss"],
    liveUrl: "https://skillmanagment.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/skillmanagment",
  },
  {
    title: "Student Management System",
    description: "A comprehensive student management platform designed to streamline administrative tasks for educational institutions. It provides a centralized system for managing student records, attendance, grades, and communication, enabling educators to focus more on teaching and less on paperwork.",
    image: project5,
    tags: ["React", "Node.js", "API integration", "MongoDB", "Express.js", "typescript", "jwt", "bcrypt", "cors", "dotenv", "express", "mongoose", "nodemon", "react", "react-dom", "react-router-dom", "react-scripts", "tailwindcss"],
    liveUrl: "https://lms-system-frontends.vercel.app/",
    githubUrl: "https://github.com/AfhamSathath/Lms-System",
  },
];

const fetchProjects = async () => {
  const response = await fetch('/api/projects');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

const Projects = () => {
  const { data: apiProjects } = useQuery<ProjectItem[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const projects = apiProjects && apiProjects.length > 0 ? apiProjects : staticProjects;
  return (
    <Layout>
      <section id="projects" className="section-padding overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
              My Work
            </p>
            <h2 className="text-4xl md:text-6xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project: ProjectItem, i: number) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group glass rounded-3xl overflow-hidden hover:glow transition-all duration-500 shadow-2xl border border-white/5"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width={640}
                    height={512}
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-primary text-primary-foreground shadow-2xl"
                    >
                      <ExternalLink size={24} />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: -360 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-primary text-primary-foreground shadow-2xl"
                    >
                      <Github size={24} />
                    </motion.a>
                  </div>
                </div>
                <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-muted/50 text-muted-foreground border border-white/5 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                    {project.tags.length > 6 && (
                      <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
                        +{project.tags.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10 glass p-16 rounded-[3rem] border border-white/5 shadow-2xl max-w-2xl w-full"
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-9xl font-bold text-gradient mb-4 font-serif"
        >
          404
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4">Lost in Space?</h2>
          <p className="mb-10 text-xl text-muted-foreground leading-relaxed">
            Oops! The page you're looking for at <span className="text-primary font-mono">{location.pathname}</span> doesn't exist.
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 group shadow-xl glow"
            >
              <Home size={20} />
              <span>Back Home</span>
            </motion.button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-2xl glass border border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

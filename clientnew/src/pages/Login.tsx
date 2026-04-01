import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Connect socket once
    if (!socketRef.current) {
      socketRef.current = io(window.location.origin);
    }

    socketRef.current.on('connect', () => {
      console.log('Socket connected for magic login');
      if (email) {
        socketRef.current.emit('join', email);
      }
    });

    socketRef.current.on('magic-login-success', (data: { token: string; user: { name: string; id: string; email: string; role: string } }) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [navigate]); // Only on mount

  useEffect(() => {
    if (email && socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('join', email);
    }
  }, [email]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSent(true);
        toast.success("Magic link sent! Check your inbox.");
      } else {
        toast.error("Failed to send magic link. Please try again.");
      }
    } catch (error) {
      toast.error("Connection error. Check your backend status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-10 rounded-3xl border border-white/5 shadow-2xl max-w-md w-full"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome <span className="text-gradient">Back</span></h2>
            <p className="text-muted-foreground">Sign in securely using a magic link.</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-muted/50 border border-white/10 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl glow"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Send Magic Link <ArrowRight size={20} /></>}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <p>We've sent a secure login link to <strong>{email}</strong>.</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Click the link in your email to be automatically logged in here. You can keep this tab open.
              </p>
              <button 
                onClick={() => setIsSent(false)} 
                className="text-primary hover:underline text-sm font-medium"
              >
                Use a different email
              </button>
            </div>
          )}
        </motion.div>
      </section>
    </Layout>
  );
};

export default Login;

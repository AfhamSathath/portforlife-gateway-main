import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your secure link...");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Verification successful! You can now close this window or return to the original tab.");
          toast.success("Login verified successfully!");
          
          // If we want to support direct login on this tab too:
          if (data.token && data.user) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setTimeout(() => navigate('/'), 2000);
          }
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. The link may have expired.");
          toast.error("Verification failed.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Connection error. Please try again later.");
        toast.error("Could not connect to the server.");
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-3xl border border-white/5 shadow-2xl max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-6">
            {status === "loading" && (
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="w-16 h-16 text-green-500 animate-in zoom-in duration-300" />
            )}
            {status === "error" && (
              <XCircle className="w-16 h-16 text-destructive animate-in zoom-in duration-300" />
            )}
          </div>

          <h2 className="text-2xl font-bold mb-4">
            {status === "loading" && "Securing access..."}
            {status === "success" && "Access Granted"}
            {status === "error" && "Access Denied"}
          </h2>
          
          <p className="text-muted-foreground mb-8">
            {message}
          </p>

          {status === "error" && (
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all"
            >
              Back to Login
            </button>
          )}
          
          {status === "success" && (
            <p className="text-sm text-primary animate-pulse">
              Redirecting you to dashboard...
            </p>
          )}
        </motion.div>
      </section>
    </Layout>
  );
};

export default Verify;

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Layout from "@/components/Layout";

import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <section id="contact" className="section-padding overflow-hidden relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-6xl font-bold">
              Let's <span className="text-gradient">connect</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Have a project in mind or want to collaborate? I'd love to hear
                from you. Drop me a message and I'll get back within 24 hours.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "dddummy296@gmail.com", type: "Email" },
                  { icon: Phone, label: "+94 75 418 9115", type: "Phone" },
                  { icon: MapPin, label: "Kinniya,Trincomalee,Sri Lanka", type: "Location" },
                ].map(({ icon: Icon, label, type }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-5 group cursor-default"
                  >
                    <div className="p-4 rounded-2xl glass glow-sm group-hover:bg-primary/20 transition-all duration-300 border border-white/5 group-hover:border-primary/50 shadow-xl">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-tighter text-muted-foreground mb-0.5">{type}</p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-all underline-offset-4 decoration-primary/50">{label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-10 rounded-3xl border border-white/5 shadow-2xl relative z-10"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={sent}
                  className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-300 shadow-xl glow"
                >
                  {sent ? (
                    <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }}>Message Sent! ✓</motion.span>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      </section>
    </Layout>
  );
};

export default Contact;

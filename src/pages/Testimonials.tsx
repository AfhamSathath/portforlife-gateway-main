import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [

];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-6xl font-bold">
            What clients <span className="text-gradient">say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-3xl p-10 relative glow-sm border border-white/5 shadow-2xl overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/15 transition-all duration-500" />
              <Quote className="text-primary/10 absolute top-8 right-8 group-hover:scale-125 transition-transform duration-500" size={56} />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-primary text-primary drop-shadow-glow" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-8 italic text-lg relative z-10">
                "{t.text}"
              </p>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <div>
                  <p className="font-bold text-lg text-foreground uppercase tracking-wider">{t.name}</p>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

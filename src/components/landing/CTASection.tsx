import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Start renting today</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Why Own When You Can Rent?
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of smart renters who save money and reduce waste by renting 
            instead of buying. Get started in minutes.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="accent" 
              size="xl" 
              className="shadow-glow-lg"
              asChild
            >
              <Link to="/browse">
                Start Browsing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              className="text-primary-foreground border-primary-foreground/20"
              asChild
            >
              <Link to="/how-it-works">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-primary-foreground/10"
          >
            {[
              { value: "10K+", label: "Happy Renters" },
              { value: "500+", label: "Items Available" },
              { value: "₹2M+", label: "Saved by Users" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

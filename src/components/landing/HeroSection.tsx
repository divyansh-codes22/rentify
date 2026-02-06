import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Sparkles } from "lucide-react";
import cameraProduct from "@/assets/camera-product.png";
import consoleProduct from "@/assets/console-product.png";
import speakerProduct from "@/assets/speaker-product.png";

const floatingProducts = [
  { src: cameraProduct, alt: "Camera", delay: 0, x: -120, y: -40 },
  { src: consoleProduct, alt: "Console", delay: 0.2, x: 120, y: -80 },
  { src: speakerProduct, alt: "Speaker", delay: 0.4, x: 0, y: 60 },
];

const trustBadges = [
  { icon: Shield, label: "Damage Protection", desc: "Covered from day one" },
  { icon: Clock, label: "Flexible Duration", desc: "Rent 1-30 days" },
  { icon: Sparkles, label: "Like New Quality", desc: "Inspected & certified" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden mesh-gradient">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Everything on Rent
              </motion.div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                Rent Premium Gear,{" "}
                <span className="gradient-text">Pay Less</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Cameras, consoles, speakers, and more. Rent high-value items with 
                complete transparency, damage protection, and hassle-free returns.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/browse">
                  Browse Rentals
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button variant="outline-accent" size="xl" asChild>
                <Link to="/how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <badge.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{badge.label}</p>
                    <p className="text-xs text-muted-foreground">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Floating products */}
          <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
            {floatingProducts.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + product.delay, duration: 0.7, ease: "easeOut" }}
                className="absolute"
                style={{
                  left: `calc(50% + ${product.x}px)`,
                  top: `calc(50% + ${product.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl scale-75" />
                  <img
                    src={product.src}
                    alt={product.alt}
                    className="relative w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

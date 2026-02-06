import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Search, Calendar, CreditCard, Package, RefreshCw, Shield } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore our curated collection of premium items across categories like cameras, gaming consoles, speakers, and more.",
  },
  {
    icon: Calendar,
    title: "Choose Duration",
    description: "Use our interactive slider to select your rental period. See real-time pricing updates as you adjust the duration.",
  },
  {
    icon: Shield,
    title: "Add Protection",
    description: "Review the damage-risk meter and optionally add a protection plan for peace of mind during your rental.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description: "Complete your order with our secure payment system. Pay only the rental fee plus a refundable security deposit.",
  },
  {
    icon: Package,
    title: "Receive & Enjoy",
    description: "Get your item delivered to your doorstep or pick it up from our location. Start using it immediately!",
  },
  {
    icon: RefreshCw,
    title: "Return & Refund",
    description: "Schedule a return when you're done. Once we verify the item's condition, your deposit is refunded within 48 hours.",
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              How <span className="text-accent">Rentify</span> Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Renting has never been easier. Follow these simple steps to get started with your first rental.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-8 h-full hover:shadow-glow transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-4xl font-bold text-accent/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Why Rent with Rentify?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Verified Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">48hr</div>
                  <div className="text-sm text-muted-foreground">Deposit Refund</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Customer Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;

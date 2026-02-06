import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Browse & Compare",
    description: "Explore our curated collection of premium rentals. Use our Rent vs Buy calculator to make smart decisions.",
    features: ["Search & filter by category", "Compare rental costs", "See damage risk ratings"],
  },
  {
    number: "02",
    title: "Choose Duration",
    description: "Slide to set your rental period. Watch prices, deposits, and protection plans update in real-time.",
    features: ["Flexible 1-30 day rentals", "Dynamic pricing", "Optional damage protection"],
  },
  {
    number: "03",
    title: "Checkout & Deliver",
    description: "Complete your order with transparent pricing. Choose delivery or pickup, and track your order live.",
    features: ["Secure payments", "Doorstep delivery", "Real-time tracking"],
  },
  {
    number: "04",
    title: "Return & Refund",
    description: "Schedule a pickup when you're done. Get your deposit back after a quick condition check.",
    features: ["Easy return scheduling", "Fast deposit release", "No hidden fees"],
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Rentify Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Renting made as simple as online shopping. Four easy steps to get what you need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-accent/50 to-accent/10" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 border border-border hover:shadow-card transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-display font-bold text-accent/30">
                    {step.number}
                  </span>
                  <ArrowRight className="w-5 h-5 text-accent hidden lg:block" />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {step.description}
                </p>
                
                <ul className="space-y-2">
                  {step.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

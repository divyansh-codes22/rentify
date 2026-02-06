import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Pay As You Go",
    description: "Perfect for occasional renters",
    price: "No subscription",
    priceDetail: "Pay per rental",
    features: [
      "Access to all products",
      "Standard delivery (2-3 days)",
      "Basic damage protection included",
      "Email support",
      "Standard deposit rates",
    ],
    cta: "Start Renting",
    popular: false,
  },
  {
    name: "Rentify Plus",
    description: "For regular renters who want more",
    price: "₹499",
    priceDetail: "/month",
    features: [
      "Everything in Pay As You Go",
      "10% off all rentals",
      "Priority delivery (1 day)",
      "Enhanced damage protection",
      "Priority 24/7 support",
      "Lower deposit rates",
      "Early access to new items",
    ],
    cta: "Get Plus",
    popular: true,
  },
  {
    name: "Rentify Pro",
    description: "For power users and businesses",
    price: "₹1,499",
    priceDetail: "/month",
    features: [
      "Everything in Plus",
      "20% off all rentals",
      "Same-day delivery",
      "Premium damage protection",
      "Dedicated account manager",
      "Minimal deposits",
      "Exclusive items access",
      "Multi-user accounts",
    ],
    cta: "Get Pro",
    popular: false,
  },
];

const PricingPage = () => {
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
              Simple, Transparent <span className="text-accent">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your rental needs. No hidden fees, no surprises.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <div
                  className={`glass-card p-8 h-full flex flex-col ${
                    plan.popular
                      ? "border-accent shadow-glow"
                      : "hover:shadow-glow"
                  } transition-all duration-300`}
                >
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.priceDetail}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "accent" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link to="/browse">{plan.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground">
              Have questions?{" "}
              <Link to="/faqs" className="text-accent hover:underline">
                Check our FAQs
              </Link>{" "}
              or{" "}
              <a
                href="mailto:support@rentify.com"
                className="text-accent hover:underline"
              >
                contact us
              </a>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;

import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Package className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Rentify
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Everything on Rent. Premium quality items at a fraction of the cost. 
              Rent smart, save more.
            </p>
            <div className="flex items-center gap-3">
              {["twitter", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Browse Rentals", href: "/browse" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQs", href: "/faqs" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Cameras & Lenses", href: "/browse?category=cameras" },
                { label: "Gaming Consoles", href: "/browse?category=gaming" },
                { label: "Speakers & Audio", href: "/browse?category=audio" },
                { label: "Books & Study", href: "/browse?category=books" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-accent" />
                support@rentify.com
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-accent" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                123 Tech Hub, Koramangala<br />
                Bangalore, Karnataka 560034
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Rentify. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

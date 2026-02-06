import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Package, Search, ShoppingCart, Menu, X, User } from "lucide-react";

const navLinks = [
  { label: "Browse", href: "/browse" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/browse");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-0">
              <div className="w-9 h-9  flex items-center justify-center">
                <img src="/favicon.ico" alt="Rentify" className="w-7 h-7 object-contain" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Rentify
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    location.pathname === link.href
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleSearchClick}>
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/account">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="accent" asChild>
                <Link to="/browse">Start Renting</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-background border-b border-border shadow-lg lg:hidden"
          >
            <div className="container py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2 text-lg font-medium text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <Button variant="accent" className="w-full" asChild>
                  <Link to="/browse">Start Renting</Link>
                </Button>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/cart">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/account">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

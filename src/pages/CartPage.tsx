import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  days: number;
  deposit: number;
  protection?: boolean;
  protectionCost?: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("rentifyCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("rentifyCart", JSON.stringify(items));
  };

  const updateDays = (id: string, delta: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, days: Math.max(1, Math.min(30, item.days + delta)) }
        : item
    );
    updateCart(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCart(updatedItems);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.pricePerDay * item.days + (item.protectionCost || 0),
    0
  );
  const totalDeposit = cartItems.reduce((sum, item) => sum + item.deposit, 0);
  const deliveryFee = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Your Cart
            </h1>

            {cartItems.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any rentals yet.
                </p>
                <Button variant="accent" asChild>
                  <Link to="/browse">Start Browsing</Link>
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="glass-card p-4 md:p-6"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg bg-secondary overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground truncate">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.category}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">
                                Duration:
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateDays(item.id, -1)}
                                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/20 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-semibold">
                                  {item.days} days
                                </span>
                                <button
                                  onClick={() => updateDays(item.id, 1)}
                                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/20 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-foreground">
                                ₹{item.pricePerDay * item.days + (item.protectionCost || 0)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ₹{item.pricePerDay}/day
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-6 sticky top-24"
                  >
                    <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-foreground">₹{deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Security Deposit
                        </span>
                        <span className="text-foreground">₹{totalDeposit}</span>
                      </div>
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between">
                          <span className="font-semibold text-foreground">
                            Total
                          </span>
                          <span className="font-bold text-xl text-foreground">
                            ₹{total}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          + ₹{totalDeposit} refundable deposit
                        </p>
                      </div>
                    </div>

                    <Button 
                      variant="accent" 
                      size="lg" 
                      className="w-full gap-2"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Deposit is fully refundable upon safe return
                    </p>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, MapPin, Calendar, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    deliveryDate: "",
    deliverySlot: "morning",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("rentifyCart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      if (items.length === 0) {
        navigate("/cart");
      }
      setCartItems(items);
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.pricePerDay * item.days + (item.protectionCost || 0),
    0
  );
  const totalDeposit = cartItems.reduce((sum, item) => sum + item.deposit, 0);
  const deliveryFee = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + deliveryFee;
  const grandTotal = total + totalDeposit;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    localStorage.removeItem("rentifyCart");
    
    toast({
      title: "Order Placed Successfully!",
      description: "You will receive a confirmation email shortly.",
    });
    
    navigate("/account");
  };

  const steps = [
    { id: 1, name: "Delivery", icon: MapPin },
    { id: 2, name: "Schedule", icon: Calendar },
    { id: 3, name: "Payment", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/cart">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Link>
            </Button>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
              Checkout
            </h1>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      step >= s.id
                        ? "bg-accent border-accent text-accent-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {step > s.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <s.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:block ${
                      step >= s.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-4 ${
                        step > s.id ? "bg-accent" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 space-y-6"
                  >
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Delivery Address
                    </h2>
                    <div className="grid gap-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main Street, Apartment 4B"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Mumbai"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="400001"
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="accent"
                      className="w-full"
                      onClick={() => setStep(2)}
                    >
                      Continue to Schedule
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 space-y-6"
                  >
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Delivery Schedule
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                        <Input
                          id="deliveryDate"
                          name="deliveryDate"
                          type="date"
                          value={formData.deliveryDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Delivery Slot</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {["morning", "afternoon", "evening"].map((slot) => (
                            <button
                              key={slot}
                              onClick={() =>
                                setFormData({ ...formData, deliverySlot: slot })
                              }
                              className={`p-4 rounded-xl border-2 text-center transition-all ${
                                formData.deliverySlot === slot
                                  ? "border-accent bg-accent/10"
                                  : "border-border hover:border-accent/50"
                              }`}
                            >
                              <span className="block font-medium text-foreground capitalize">
                                {slot}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {slot === "morning"
                                  ? "9AM - 12PM"
                                  : slot === "afternoon"
                                  ? "12PM - 5PM"
                                  : "5PM - 9PM"}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="accent"
                        className="flex-1"
                        onClick={() => setStep(3)}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 space-y-6"
                  >
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Payment
                    </h2>
                    
                    {/* Payment Method Selection */}
                    <div className="space-y-3">
                      <Label>Select Payment Method</Label>
                      <div className="grid gap-3">
                        {[
                          { id: "card", label: "Credit/Debit Card", icon: "card" },
                          { id: "upi", label: "UPI (Razorpay)", icon: "upi" },
                          { id: "netbanking", label: "Net Banking", icon: "bank" },
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              paymentMethod === method.id
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                              {method.icon === "card" && <CreditCard className="w-4 h-4" />}
                              {method.icon === "upi" && <span className="text-lg font-bold">₹</span>}
                              {method.icon === "bank" && <span className="text-sm font-semibold">🏦</span>}
                            </div>
                            <span className="font-medium text-foreground">{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card Payment Form */}
                    {paymentMethod === "card" && (
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-4">
                        <div className="space-y-2">
                          <Label>Card Number</Label>
                          <Input placeholder="4242 4242 4242 4242" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Expiry</Label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* UPI Payment Form */}
                    {paymentMethod === "upi" && (
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Pay securely using Razorpay UPI
                        </p>
                        <div className="space-y-2">
                          <Label>UPI ID</Label>
                          <Input placeholder="yourname@upi" />
                        </div>
                        <div className="text-center py-4">
                          <div className="inline-block p-4 bg-white rounded-xl">
                            <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                              <span className="text-muted-foreground text-xs">QR Code</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Or scan QR code with any UPI app
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Net Banking Form */}
                    {paymentMethod === "netbanking" && (
                      <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Select your bank to proceed
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "Other Banks"].map((bank) => (
                            <button
                              key={bank}
                              className="p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-sm font-medium text-foreground"
                            >
                              {bank}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="accent"
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : `Pay ₹${grandTotal}`}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 sticky top-24">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.days} days × ₹{item.pricePerDay}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          ₹{item.pricePerDay * item.days}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="text-foreground">₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deposit</span>
                      <span className="text-foreground">₹{totalDeposit}</span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-lg text-foreground">
                          ₹{grandTotal}
                        </span>
                      </div>
                    </div>
                  </div>
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

export default CheckoutPage;

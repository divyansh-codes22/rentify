import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Star, 
  Shield, 
  ShoppingCart, 
  Heart,
  ChevronRight,
  Check,
  AlertTriangle,
  TrendingUp,
  Clock,
  Truck,
  RotateCcw,
  Info
} from "lucide-react";
import cameraProduct from "@/assets/camera-product.png";
import consoleProduct from "@/assets/console-product.png";
import speakerProduct from "@/assets/speaker-product.png";
import booksProduct from "@/assets/books-product.png";

// Product database
const products: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Sony A7 IV Mirrorless Camera",
    category: "Cameras",
    description: "Full-frame mirrorless camera with 33MP sensor, advanced autofocus, and 4K video capabilities. Perfect for professional photography and videography projects.",
    image: cameraProduct,
    gallery: [cameraProduct, cameraProduct, cameraProduct],
    pricePerDay: 89,
    buyPrice: 185000,
    rating: 4.9,
    reviews: 124,
    riskLevel: "high",
    deposit: 5000,
    specs: [
      { label: "Sensor", value: "33MP Full-Frame" },
      { label: "Video", value: "4K 60fps" },
      { label: "ISO Range", value: "100-51200" },
      { label: "Weight", value: "658g" },
    ],
    includes: ["Camera body", "24-70mm lens", "Battery", "Charger", "Strap", "Carrying case"],
  },
  "2": {
    id: "2",
    name: "PlayStation 5 Console Bundle",
    category: "Gaming",
    description: "Next-gen gaming experience with lightning-fast SSD, ray tracing, and 4K gaming. Includes two controllers and popular games.",
    image: consoleProduct,
    gallery: [consoleProduct, consoleProduct, consoleProduct],
    pricePerDay: 35,
    buyPrice: 55000,
    rating: 4.8,
    reviews: 89,
    riskLevel: "medium",
    deposit: 3000,
    specs: [
      { label: "Storage", value: "825GB SSD" },
      { label: "Resolution", value: "4K @ 120Hz" },
      { label: "Ray Tracing", value: "Yes" },
      { label: "Controllers", value: "2 DualSense" },
    ],
    includes: ["Console", "2 controllers", "HDMI cable", "Power cable", "3 games"],
  },
  "3": {
    id: "3",
    name: "JBL PartyBox 310 Speaker",
    category: "Audio",
    description: "Powerful portable party speaker with deep bass, light shows, and 18-hour battery. Perfect for events and parties.",
    image: speakerProduct,
    gallery: [speakerProduct, speakerProduct, speakerProduct],
    pricePerDay: 45,
    buyPrice: 42000,
    rating: 4.7,
    reviews: 156,
    riskLevel: "medium",
    deposit: 2500,
    specs: [
      { label: "Power", value: "240W RMS" },
      { label: "Battery", value: "18 hours" },
      { label: "Bluetooth", value: "5.1" },
      { label: "Weight", value: "17.4kg" },
    ],
    includes: ["Speaker", "Power cable", "Aux cable", "Mic (optional)"],
  },
  "4": {
    id: "4",
    name: "Engineering Textbook Bundle",
    category: "Books",
    description: "Complete set of engineering textbooks covering mechanics, electronics, thermodynamics, and more. Essential for exam preparation.",
    image: booksProduct,
    gallery: [booksProduct, booksProduct, booksProduct],
    pricePerDay: 8,
    buyPrice: 4500,
    rating: 4.6,
    reviews: 234,
    riskLevel: "low",
    deposit: 500,
    specs: [
      { label: "Books", value: "8 textbooks" },
      { label: "Condition", value: "Like new" },
      { label: "Subjects", value: "Core engineering" },
      { label: "Year", value: "2024 edition" },
    ],
    includes: ["8 core textbooks", "Formula sheets", "Previous year papers"],
  },
};

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  pricePerDay: number;
  buyPrice: number;
  rating: number;
  reviews: number;
  riskLevel: string;
  deposit: number;
  specs: { label: string; value: string }[];
  includes: string[];
}

const riskConfig = {
  low: { 
    color: "bg-success", 
    textColor: "text-success",
    label: "Low Risk",
    description: "Minimal damage risk. Simple inspection on return.",
    protectionRate: 0.02,
  },
  medium: { 
    color: "bg-warning", 
    textColor: "text-warning",
    label: "Medium Risk",
    description: "Moderate damage risk. Standard protection recommended.",
    protectionRate: 0.05,
  },
  high: { 
    color: "bg-destructive", 
    textColor: "text-destructive",
    label: "High Risk",
    description: "High-value item. Protection plan strongly recommended.",
    protectionRate: 0.08,
  },
};

export default function ProductPage() {
  const { id } = useParams();
  const product = products[id || "1"];
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rentalDays, setRentalDays] = useState([7]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addProtection, setAddProtection] = useState(true);

  const risk = riskConfig[product.riskLevel as keyof typeof riskConfig];

  const handleAddToCart = () => {
    // Store cart item in localStorage for now
    const cartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      pricePerDay: product.pricePerDay,
      days: rentalDays[0],
      deposit: product.deposit,
      protection: addProtection,
      protectionCost: pricing.protectionCost,
    };
    
    const existingCart = JSON.parse(localStorage.getItem("rentifyCart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex] = cartItem;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem("rentifyCart", JSON.stringify(existingCart));
    
    toast({
      title: "Added to cart!",
      description: `${product.name} for ${rentalDays[0]} days`,
    });
    
    navigate("/cart");
  };

  const pricing = useMemo(() => {
    const days = rentalDays[0];
    const baseRent = product.pricePerDay * days;
    const protectionCost = addProtection ? Math.round(baseRent * risk.protectionRate) : 0;
    const deliveryFee = 99;
    const deposit = product.deposit;
    const total = baseRent + protectionCost + deliveryFee;
    
    // Rent vs Buy calculation
    const breakEvenDays = Math.ceil(product.buyPrice / product.pricePerDay);
    const savings = product.buyPrice - total;
    const rentWorthIt = days < breakEvenDays * 0.3; // If renting for less than 30% of break-even

    return { days, baseRent, protectionCost, deliveryFee, deposit, total, breakEvenDays, savings, rentWorthIt };
  }, [rentalDays, addProtection, product, risk]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-muted-foreground hover:text-accent">Home</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/browse" className="text-muted-foreground hover:text-accent">Browse</Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={product.gallery[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                </AnimatePresence>
                
                {/* Wishlist */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                  <Heart className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-accent" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain bg-secondary p-2" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category & Title */}
              <div>
                <span className="text-sm font-medium text-accent uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Damage Risk Meter */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className={`w-5 h-5 ${risk.textColor}`} />
                  <span className="font-semibold text-foreground">Damage-Risk Meter</span>
                </div>
                <div className="flex gap-1 mb-2">
                  <div className={`h-2 flex-1 rounded-full ${product.riskLevel === "low" || product.riskLevel === "medium" || product.riskLevel === "high" ? risk.color : "bg-muted"}`} />
                  <div className={`h-2 flex-1 rounded-full ${product.riskLevel === "medium" || product.riskLevel === "high" ? risk.color : "bg-muted"}`} />
                  <div className={`h-2 flex-1 rounded-full ${product.riskLevel === "high" ? risk.color : "bg-muted"}`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${risk.textColor}`}>{risk.label}</span>
                  <span className="text-xs text-muted-foreground">{risk.description}</span>
                </div>
              </div>

              {/* Rental Duration Slider */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Rental Duration
                  </span>
                  <motion.span
                    key={pricing.days}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-display font-bold text-accent"
                  >
                    {pricing.days} days
                  </motion.span>
                </div>
                <Slider
                  value={rentalDays}
                  onValueChange={setRentalDays}
                  min={1}
                  max={30}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 day</span>
                  <span>30 days</span>
                </div>
              </div>

              {/* Protection Plan */}
              <button
                onClick={() => setAddProtection(!addProtection)}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-start gap-4 text-left ${
                  addProtection ? "border-accent bg-accent/5" : "border-border bg-card"
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                  addProtection ? "bg-accent text-accent-foreground" : "border-2 border-border"
                }`}>
                  {addProtection && <Check className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-accent" />
                      Damage Protection
                    </span>
                    <span className="font-semibold text-accent">+₹{pricing.protectionCost}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Covers accidental damage up to ₹{product.deposit * 2}. No questions asked.
                  </p>
                </div>
              </button>

              {/* Price Breakdown */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rental ({pricing.days} days × ₹{product.pricePerDay})</span>
                  <span className="font-medium text-foreground">₹{pricing.baseRent}</span>
                </div>
                {addProtection && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Damage Protection</span>
                    <span className="font-medium text-foreground">₹{pricing.protectionCost}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium text-foreground">₹{pricing.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    Refundable Deposit
                    <Info className="w-3 h-3" />
                  </span>
                  <span className="font-medium text-foreground">₹{pricing.deposit}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold text-foreground">Total (excl. deposit)</span>
                  <motion.span
                    key={pricing.total}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-display font-bold text-foreground"
                  >
                    ₹{pricing.total}
                  </motion.span>
                </div>
              </div>

              {/* Rent vs Buy Comparison */}
              <div className={`p-4 rounded-xl border ${pricing.rentWorthIt ? "bg-success/10 border-success/30" : "bg-warning/10 border-warning/30"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className={`w-5 h-5 ${pricing.rentWorthIt ? "text-success" : "text-warning"}`} />
                  <span className="font-semibold text-foreground">Rent vs Buy</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Buy price: <span className="font-semibold text-foreground">₹{product.buyPrice.toLocaleString()}</span>
                </p>
                <p className="text-sm mt-1">
                  {pricing.rentWorthIt ? (
                    <span className="text-success font-medium">
                      ✓ Renting saves you ₹{pricing.savings.toLocaleString()}! Great choice.
                    </span>
                  ) : (
                    <span className="text-warning font-medium">
                      Consider buying if you'll use it more than {Math.round(pricing.breakEvenDays * 0.3)} days.
                    </span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button variant="hero" size="xl" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline-accent" size="xl">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Truck className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Free Delivery</p>
                    <p className="text-xs text-muted-foreground">On orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <RotateCcw className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">Schedule pickup anytime</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Specs & Includes */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Specifications
              </h3>
              <div className="space-y-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                What's Included
              </h3>
              <ul className="space-y-3">
                {product.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

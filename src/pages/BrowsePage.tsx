import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Star, 
  SlidersHorizontal,
  Camera,
  Gamepad2,
  Speaker,
  BookOpen,
  Cpu,
  PartyPopper,
  X
} from "lucide-react";
import cameraProduct from "@/assets/camera-product.png";
import consoleProduct from "@/assets/console-product.png";
import speakerProduct from "@/assets/speaker-product.png";
import booksProduct from "@/assets/books-product.png";

const categories = [
  { id: "all", name: "All Items", icon: Filter },
  { id: "cameras", name: "Cameras", icon: Camera },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "audio", name: "Audio", icon: Speaker },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "kits", name: "Kits", icon: Cpu },
  { id: "events", name: "Events", icon: PartyPopper },
];

const allProducts = [
  {
    id: "1",
    name: "Sony A7 IV Mirrorless Camera",
    category: "cameras",
    image: cameraProduct,
    pricePerDay: 89,
    rating: 4.9,
    reviews: 124,
    riskLevel: "high",
    deposit: 5000,
  },
  {
    id: "2",
    name: "PlayStation 5 Console Bundle",
    category: "gaming",
    image: consoleProduct,
    pricePerDay: 35,
    rating: 4.8,
    reviews: 89,
    riskLevel: "medium",
    deposit: 3000,
  },
  {
    id: "3",
    name: "JBL PartyBox 310 Speaker",
    category: "audio",
    image: speakerProduct,
    pricePerDay: 45,
    rating: 4.7,
    reviews: 156,
    riskLevel: "medium",
    deposit: 2500,
  },
  {
    id: "4",
    name: "Engineering Textbook Bundle",
    category: "books",
    image: booksProduct,
    pricePerDay: 8,
    rating: 4.6,
    reviews: 234,
    riskLevel: "low",
    deposit: 500,
  },
  {
    id: "5",
    name: "Canon EOS R5 with 24-70mm",
    category: "cameras",
    image: cameraProduct,
    pricePerDay: 120,
    rating: 4.9,
    reviews: 87,
    riskLevel: "high",
    deposit: 8000,
  },
  {
    id: "6",
    name: "Xbox Series X Bundle",
    category: "gaming",
    image: consoleProduct,
    pricePerDay: 30,
    rating: 4.7,
    reviews: 112,
    riskLevel: "medium",
    deposit: 2800,
  },
  {
    id: "7",
    name: "Bose SoundLink Revolve+",
    category: "audio",
    image: speakerProduct,
    pricePerDay: 25,
    rating: 4.8,
    reviews: 203,
    riskLevel: "low",
    deposit: 1500,
  },
  {
    id: "8",
    name: "GATE Preparation Kit",
    category: "books",
    image: booksProduct,
    pricePerDay: 12,
    rating: 4.5,
    reviews: 178,
    riskLevel: "low",
    deposit: 600,
  },
];

const riskColors = {
  low: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get("category") || "all";

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.pricePerDay >= priceRange[0] && product.pricePerDay <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [activeCategory, searchQuery, priceRange]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse Rentals
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the perfect gear for your needs
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search cameras, consoles, speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            
            {/* Filter toggle (mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={false}
              animate={{ 
                width: showFilters ? "auto" : "0",
                opacity: showFilters ? 1 : 0 
              }}
              className={`lg:w-64 lg:opacity-100 lg:block overflow-hidden ${
                showFilters ? "w-full absolute z-30 bg-background p-4 rounded-xl border shadow-lg lg:relative lg:p-0 lg:border-0 lg:shadow-none" : "hidden lg:block"
              }`}
            >
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">Categories</h3>
                    <button onClick={() => setShowFilters(false)} className="lg:hidden">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                          activeCategory === category.id
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-4">
                    Price Range
                  </h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={150}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}/day</span>
                      <span>₹{priceRange[1]}/day</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredProducts.length}</span> items found
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/product/${product.id}`} className="group block">
                      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2">
                        {/* Risk badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${riskColors[product.riskLevel as keyof typeof riskColors]}`}>
                            {product.riskLevel} risk
                          </span>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-secondary to-muted p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <span className="text-xs font-medium text-accent uppercase tracking-wide">
                            {product.category}
                          </span>
                          <h3 className="font-display font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-warning text-warning" />
                              <span className="text-sm font-medium text-foreground">{product.rating}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              ({product.reviews})
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 mt-4">
                            <span className="text-2xl font-display font-bold text-foreground">
                              ₹{product.pricePerDay}
                            </span>
                            <span className="text-sm text-muted-foreground">/day</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                  <Button 
                    variant="outline-accent" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 150]);
                      handleCategoryChange("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

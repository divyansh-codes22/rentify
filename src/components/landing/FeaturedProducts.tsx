import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cameraProduct from "@/assets/camera-product.png";
import consoleProduct from "@/assets/console-product.png";
import speakerProduct from "@/assets/speaker-product.png";
import booksProduct from "@/assets/books-product.png";

const featuredProducts = [
  {
    id: "1",
    name: "Sony A7 IV Mirrorless Camera",
    category: "Cameras",
    image: cameraProduct,
    pricePerDay: 89,
    rating: 4.9,
    reviews: 124,
    riskLevel: "high",
  },
  {
    id: "2",
    name: "PlayStation 5 Console Bundle",
    category: "Gaming",
    image: consoleProduct,
    pricePerDay: 35,
    rating: 4.8,
    reviews: 89,
    riskLevel: "medium",
  },
  {
    id: "3",
    name: "JBL PartyBox 310 Speaker",
    category: "Audio",
    image: speakerProduct,
    pricePerDay: 45,
    rating: 4.7,
    reviews: 156,
    riskLevel: "medium",
  },
  {
    id: "4",
    name: "Engineering Textbook Bundle",
    category: "Books",
    image: booksProduct,
    pricePerDay: 8,
    rating: 4.6,
    reviews: 234,
    riskLevel: "low",
  },
];

const riskColors = {
  low: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Popular Rentals
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Top-rated items our customers love. Start here or explore all categories.
            </p>
          </div>
          <Button variant="outline-accent" asChild>
            <Link to="/browse">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        ({product.reviews} reviews)
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
      </div>
    </section>
  );
}

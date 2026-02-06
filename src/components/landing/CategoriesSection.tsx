import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Gamepad2, Speaker, BookOpen, Cpu, PartyPopper } from "lucide-react";

const categories = [
  { 
    id: "cameras", 
    name: "Cameras & Lenses", 
    icon: Camera, 
    count: 48, 
    color: "from-teal-500/20 to-cyan-500/20",
    description: "DSLRs, Mirrorless, Action Cams"
  },
  { 
    id: "gaming", 
    name: "Gaming Consoles", 
    icon: Gamepad2, 
    count: 24, 
    color: "from-violet-500/20 to-purple-500/20",
    description: "PS5, Xbox, Nintendo Switch"
  },
  { 
    id: "audio", 
    name: "Speakers & Audio", 
    icon: Speaker, 
    count: 36, 
    color: "from-orange-500/20 to-amber-500/20",
    description: "Party speakers, headphones, mics"
  },
  { 
    id: "books", 
    name: "Books & Study", 
    icon: BookOpen, 
    count: 120, 
    color: "from-emerald-500/20 to-green-500/20",
    description: "Textbooks, guides, references"
  },
  { 
    id: "kits", 
    name: "Project Kits", 
    icon: Cpu, 
    count: 32, 
    color: "from-blue-500/20 to-indigo-500/20",
    description: "Arduino, Raspberry Pi, robotics"
  },
  { 
    id: "events", 
    name: "Event Gear", 
    icon: PartyPopper, 
    count: 56, 
    color: "from-pink-500/20 to-rose-500/20",
    description: "Lights, props, decorations"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function CategoriesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Rent by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From professional cameras to gaming consoles, find everything you need without the commitment of buying.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={`/browse?category=${category.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <category.icon className="w-7 h-7 text-accent" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                      <p className="text-sm font-medium text-accent mt-2">
                        {category.count} items available
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

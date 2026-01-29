import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] overflow-hidden flex items-center justify-center">
         {/* Background Texture/Pattern */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} 
         />
         
         {/* Content */}
         <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
                <div className="inline-block px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-foreground)] rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                    New Collection 2026
                </div>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
                    Timeless <br/> <span className="text-[var(--color-accent)]">Elegance</span>
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed">
                    Discover handcrafted treasures that blend traditional Pakistani artistry with modern design sensibilities.
                </p>
                <div className="flex gap-4 pt-4">
                    <Link to="/products">
                        <Button size="lg" className="bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-white hover:text-[var(--color-primary)] text-lg px-8 py-6">
                            Shop Now
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-primary)] text-lg px-8 py-6">
                            Our Story
                        </Button>
                    </Link>
                </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative hidden md:block"
            >
                <div className="absolute inset-0 bg-[var(--color-accent)] rounded-tr-[5rem] rounded-bl-[5rem] translate-x-4 translate-y-4 opacity-50"></div>
                <img 
                    src="https://images.unsplash.com/photo-1585721838637-2e1d03b5722b?q=80&w=1000&auto=format&fit=crop" 
                    alt="Artisan crafts" 
                    className="relative rounded-tr-[5rem] rounded-bl-[5rem] shadow-2xl object-cover h-[500px] w-full"
                />
            </motion.div>
         </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Curated Categories</h2>
              <div className="h-1 w-20 bg-[var(--color-accent)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Handwoven Textiles', img: 'https://images.unsplash.com/photo-1610128456801-9f9363403d6d?q=80&w=800&auto=format&fit=crop' },
                { title: 'Truck Art Decor', img: 'https://images.unsplash.com/photo-1596468138768-3cead762dcc5?q=80&w=800&auto=format&fit=crop' }, // Fallback generic art
                { title: 'Ceramics & Pottery', img: 'https://images.unsplash.com/photo-1620317616174-8b8390b79377?q=80&w=800&auto=format&fit=crop' }
              ].map((cat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="group relative h-80 overflow-hidden rounded-lg cursor-pointer shadow-lg"
                  >
                      <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-white font-display text-2xl font-bold">{cat.title}</h3>
                          <span className="text-[var(--color-accent)] font-medium text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Explore Collection &rarr;
                          </span>
                      </div>
                  </motion.div>
              ))}
          </div>
      </section>
    </div>
  );
}

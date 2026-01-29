import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/axios';
import { Button } from '../components/ui/button';

const fetchProducts = async () => {
    const { data } = await api.get('/products/getAllProducts');
    return data.products; 
};

const Products = () => {
  const { data: products, isLoading, isError } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
  });
  
  const [filter, setFilter] = useState('all');

  // Mock categories if real data doesn't provide them distinctly
  const categories = ['apparel', 'decor', 'crafts']; 

  const filteredProducts = products?.filter(p => filter === 'all' || p.category === filter);

  if(isLoading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  
  if(isError){
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Products</h2>
                <p className="text-gray-500">Please try again later.</p>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-display font-bold text-[var(--color-primary)]">Collection</h1>
                <p className="text-gray-500 mt-2">Browse our exclusive range of heritage items.</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <Button variant={filter === 'all' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
                {categories.map(cat => (
                    <Button 
                        key={cat} 
                        variant={filter === cat ? 'primary' : 'outline'} 
                        size="sm" 
                        onClick={() => setFilter(cat)}
                        className="capitalize"
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
                {filteredProducts?.map((product) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={product._id} 
                        className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                        <Link to={`/products/${product._id}`}>
                            <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                                <img 
                                    src={product.imageUrl || "https://placehold.co/400x500?text=No+Image"} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                     <Button className="w-full bg-white/90 text-[var(--color-primary)] hover:bg-white backdrop-blur-sm shadow-lg">Quick Add</Button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">{product.name}</h3>
                                    <span className="font-bold text-[var(--color-primary)] ml-2 whitespace-nowrap">Rs. {product.price}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
        
        {(!filteredProducts || filteredProducts.length === 0) && (
             <div className="text-center py-20 opacity-50">
                 No products found.
             </div>
        )}
    </div>
  )
}

export default Products
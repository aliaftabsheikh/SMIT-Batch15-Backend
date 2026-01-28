import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import api from '../lib/axios';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const fetchProduct = async (id) => {
  const { data } = await api.get(`/products/getProduct/${id}`);
  return data.product;
};

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  if (isError) return <div className="min-h-[50vh] flex items-center justify-center text-red-500">Error loading product</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
             <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <img 
                    src={product.imageUrl || "https://placehold.co/600x600?text=No+Image"} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
             </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display text-[var(--color-primary)] mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="text-sm text-gray-500">(24 reviews)</span>
                </div>
                <p className="text-2xl font-bold text-[var(--color-neutral-900)]">
                    PKR {product.price?.toLocaleString()}
                </p>
             </div>

             <div className="prose prose-sm text-gray-600">
                <p>{product.description}</p>
             </div>

             <div className="space-y-4 pt-6 border-t border-gray-100">
                 <div className="flex items-center gap-4">
                     <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button className="w-full h-12 text-lg shadow-lg hover:shadow-xl transition-shadow bg-[var(--color-primary)]">
                            Add to Cart
                        </Button>
                     </motion.div>
                     <Button variant="outline" size="icon" className="h-12 w-12 text-gray-400 hover:text-red-500 hover:border-red-500">
                         <Heart className="w-6 h-6" />
                     </Button>
                 </div>
             </div>

             <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                     <Truck className="w-5 h-5 text-[var(--color-accent)]" />
                     <span>Free delivery in major cities</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
                     <span>Authenticity Guaranteed</span>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}

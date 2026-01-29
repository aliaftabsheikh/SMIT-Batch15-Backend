import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Search, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
// import { useAuth } from '../hooks/useAuth'; // To be implemented

// A subtle geometric pattern background (simplified representation)
const PatternBackground = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden z-0">
     <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="mughal-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="currentColor" strokeWidth="1"/>
           <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#mughal-pattern)" />
    </svg>
  </div>
);

export function Header() {
  const navigate = useNavigate();
  // const { user, logout } = useAuth(); // Placeholder
  const user = null; // Mock

  return (
    <header className="relative bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg z-50">
      <PatternBackground />
      <div className="container mx-auto px-4 py-4 relative z-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold font-display tracking-wider">
              BAZAAR
            </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
          <Link to="/products" className="hover:text-[var(--color-accent)] transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-[var(--color-accent)] transition-colors">About</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-[var(--color-primary-foreground)] hover:bg-white/10 hover:text-[var(--color-accent)]">
                <Search className="w-5 h-5" />
            </Button>
            
            <Link to="/cart">
                <Button variant="ghost" size="icon" className="text-[var(--color-primary-foreground)] hover:bg-white/10 hover:text-[var(--color-accent)] relative">
                    <ShoppingCart className="w-5 h-5" />
                    {/* Badge */}
                    <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--color-accent)] text-[var(--color-accent-foreground)] text-[10px] flex items-center justify-center rounded-full font-bold">
                        0
                    </span>
                </Button>
            </Link>

            {user ? (
                 <div className="flex items-center gap-2">
                    <Link to="/account">
                        <Button variant="ghost" size="icon" className="text-[var(--color-primary-foreground)] hover:bg-white/10">
                            <User className="w-5 h-5" />
                        </Button>
                    </Link>
                 </div>
            ) : (
                <div className="hidden md:flex items-center gap-2">
                    <Link to="/login">
                        <Button variant="ghost" className="text-[var(--color-primary-foreground)] hover:bg-white/10 hover:text-[var(--color-accent)]">Login</Button>
                    </Link>
                     <Link to="/signup">
                        <Button variant="accent" size="sm" className="font-bold">Sign Up</Button>
                    </Link>
                </div>
            )}

             <Button variant="ghost" size="icon" className="md:hidden text-[var(--color-primary-foreground)]">
                <Menu className="w-6 h-6" />
            </Button>
        </div>
      </div>
    </header>
  );
}

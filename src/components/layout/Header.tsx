import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChefHat, Search, ShoppingCart, User } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header component loaded');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Branding */}
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight">FoodApp</span>
        </Link>

        {/* Primary Navigation Links - visible on medium screens and up */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/restaurant-listing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Restaurants
          </Link>
          {/* Add more primary navigation links here if needed */}
        </nav>

        {/* Search Input & User Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-md bg-background pl-10 sm:w-40 lg:w-64"
            />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user-profile" aria-label="User Profile">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>
          
          {/* Placeholder for Mobile Menu Trigger - uncomment and implement if needed
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;
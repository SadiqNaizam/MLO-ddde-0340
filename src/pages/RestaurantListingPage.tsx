import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Lucide Icons
import { Search, Filter, SlidersHorizontal, Star } from 'lucide-react';

interface Restaurant {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
  cuisineType: string;
  rating: number;
  deliveryTime: string;
  priceRange: string; // e.g., "$", "$$", "$$$"
  priceValue: number; // e.g. 1 for "$", 2 for "$$", 3 for "$$$"
  isFavorite?: boolean; // Example additional filter
}

const ITEMS_PER_PAGE = 8;

// Sample Restaurant Data
const allRestaurantsData: Restaurant[] = [
  { id: '1', slug: 'bella-italia', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Bella Italia Trattoria', cuisineType: 'Italian', rating: 4.5, deliveryTime: '30-40 min', priceRange: '$$', priceValue: 2, isFavorite: true },
  { id: '2', slug: 'sushi-zen', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Sushi Zen Garden', cuisineType: 'Japanese', rating: 4.8, deliveryTime: '40-50 min', priceRange: '$$$', priceValue: 3 },
  { id: '3', slug: 'burger-bliss', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Burger Bliss Joint', cuisineType: 'American', rating: 4.2, deliveryTime: '25-35 min', priceRange: '$', priceValue: 1 },
  { id: '4', slug: 'taco-fiesta', imageUrl: 'https://images.unsplash.com/photo-1565299585323-BA4d69068e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Taco Fiesta Express', cuisineType: 'Mexican', rating: 4.6, deliveryTime: '20-30 min', priceRange: '$', priceValue: 1, isFavorite: true },
  { id: '5', slug: 'veggie-delight', imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Veggie Delight Cafe', cuisineType: 'Vegetarian', rating: 4.3, deliveryTime: '30-40 min', priceRange: '$$', priceValue: 2 },
  { id: '6', slug: 'spice-kingdom', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Spice Kingdom', cuisineType: 'Indian', rating: 4.7, deliveryTime: '35-45 min', priceRange: '$$', priceValue: 2 },
  { id: '7', slug: 'ocean-catch', imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'The Ocean Catch', cuisineType: 'Seafood', rating: 4.4, deliveryTime: '45-55 min', priceRange: '$$$', priceValue: 3 },
  { id: '8', slug: 'pasta-amore', imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Pasta Amore', cuisineType: 'Italian', rating: 4.9, deliveryTime: '30-40 min', priceRange: '$$', priceValue: 2 },
  { id: '9', slug: 'thai-orchid', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fbefc9ff99ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Thai Orchid', cuisineType: 'Thai', rating: 4.6, deliveryTime: '35-45 min', priceRange: '$$', priceValue: 2, isFavorite: true },
  { id: '10', slug: 'mediterranean-grill', imageUrl: 'https://images.unsplash.com/photo-1600335895940-16071436501a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Mediterranean Grill', cuisineType: 'Mediterranean', rating: 4.5, deliveryTime: '30-40 min', priceRange: '$$', priceValue: 2 },
  { id: '11', slug: 'pho-real', imageUrl: 'https://images.unsplash.com/photo-1585109649440-51001b7cbc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'Pho Real Vietnamese Kitchen', cuisineType: 'Vietnamese', rating: 4.7, deliveryTime: '25-35 min', priceRange: '$', priceValue: 1 },
  { id: '12', slug: 'bbq-pitmasters', imageUrl: 'https://images.unsplash.com/photo-1626078297424-4c683c9541a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', name: 'BBQ Pitmasters', cuisineType: 'BBQ', rating: 4.3, deliveryTime: '40-50 min', priceRange: '$$$', priceValue: 3 },
];

const cuisineTypes = Array.from(new Set(allRestaurantsData.map(r => r.cuisineType))).sort();

const RestaurantListingPage: React.FC = () => {
  console.log('RestaurantListingPage loaded');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 3]); // 1 for $, 2 for $$, 3 for $$$
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('rating_desc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredAndSortedRestaurants = useMemo(() => {
    let restaurants = allRestaurantsData;

    // Filter by search term
    if (searchTerm) {
      restaurants = restaurants.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by cuisine
    if (selectedCuisine) {
      restaurants = restaurants.filter(r => r.cuisineType === selectedCuisine);
    }

    // Filter by rating
    if (minRating > 0) {
      restaurants = restaurants.filter(r => r.rating >= minRating);
    }

    // Filter by price range
    restaurants = restaurants.filter(r => r.priceValue >= priceRange[0] && r.priceValue <= priceRange[1]);
    
    // Filter by favorites
    if (showFavorites) {
        restaurants = restaurants.filter(r => r.isFavorite);
    }

    // Sort
    switch (sortBy) {
      case 'rating_desc':
        restaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'rating_asc':
        restaurants.sort((a, b) => a.rating - b.rating);
        break;
      case 'delivery_time_asc':
        restaurants.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
        break;
      case 'name_asc':
        restaurants.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        restaurants.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return restaurants;
  }, [searchTerm, selectedCuisine, minRating, priceRange, showFavorites, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedRestaurants.length / ITEMS_PER_PAGE);
  const currentRestaurants = filteredAndSortedRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCuisine, minRating, priceRange, showFavorites, sortBy]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  const priceLabels: { [key: number]: string } = { 1: "$", 2: "$$", 3: "$$$" };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-grow">
        <section aria-labelledby="restaurant-listing-title" className="mb-8">
          <h1 id="restaurant-listing-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Find Your Next Meal
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search restaurants by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-base h-12"
              aria-label="Search restaurants"
            />
          </div>
        </section>

        <section aria-labelledby="filters-and-sorting" className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 space-y-4" align="start">
                <div>
                  <Label htmlFor="cuisine-select" className="text-sm font-medium">Cuisine Type</Label>
                  <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                    <SelectTrigger id="cuisine-select" className="w-full mt-1">
                      <SelectValue placeholder="All Cuisines" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Cuisines</SelectItem>
                      {cuisineTypes.map(cuisine => (
                        <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Minimum Rating</Label>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map(rate => (
                       <Button 
                         key={rate} 
                         variant={minRating === rate ? "default" : "outline"}
                         size="icon"
                         onClick={() => setMinRating(minRating === rate ? 0 : rate)}
                         aria-label={`Minimum ${rate} stars`}
                         className="h-8 w-8"
                       >
                         {rate}
                       </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="price-range-slider" className="text-sm font-medium">
                    Price Range: {priceLabels[priceRange[0]]} - {priceLabels[priceRange[1]]}
                  </Label>
                  <Slider
                    id="price-range-slider"
                    min={1}
                    max={3}
                    step={1}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="favorites-checkbox" 
                    checked={showFavorites}
                    onCheckedChange={(checked) => setShowFavorites(checked as boolean)}
                  />
                  <Label htmlFor="favorites-checkbox" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Show Favorites Only
                  </Label>
                </div>
                
              </PopoverContent>
            </Popover>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-auto md:min-w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="rating_desc">Rating (High to Low)</SelectItem>
                  <SelectItem value="rating_asc">Rating (Low to High)</SelectItem>
                  <SelectItem value="delivery_time_asc">Delivery Time (Fastest)</SelectItem>
                  <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>

        {currentRestaurants.length > 0 ? (
          <section aria-label="List of available restaurants" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {currentRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </section>
        ) : (
          <section className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Restaurants Found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </section>
        )}

        {totalPages > 1 && (
          <section aria-label="Pagination for restaurant list" className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* Consider adding PaginationEllipsis if many pages */}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;
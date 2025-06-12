import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParallaxImageSection from '@/components/ParallaxImageSection';
import DishCard from '@/components/DishCard';

// Shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Lucide Icons
import { Star, MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface Dish {
  dishId: string;
  dishSlug: string;
  name: string;
  price: number;
  imageUrl: string;
  shortDescription?: string;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Restaurant {
  slug: string;
  name: string;
  ambianceImageUrl: string;
  logoUrl?: string;
  description: string;
  cuisineType: string;
  address: string;
  phone?: string;
  openingHours: string;
  averageRating: number;
  numberOfReviews: number;
  menuItems: Dish[];
  reviewsList: Review[];
}

// Placeholder data for a restaurant
const sampleRestaurantData: Restaurant = {
  slug: "the-epicurean-eden",
  name: "The Epicurean Eden",
  ambianceImageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  logoUrl: "https://via.placeholder.com/120x120?text=Eden+Logo",
  description: "Nestled in the heart of the city, The Epicurean Eden offers a tranquil escape with its lush greenery and sophisticated decor. We pride ourselves on a farm-to-table philosophy, serving contemporary cuisine that delights the senses. Each dish is crafted with passion, using only the freshest seasonal ingredients. Join us for an unforgettable dining experience where nature's bounty meets culinary excellence.",
  cuisineType: "Contemporary Fusion",
  address: "456 Paradise Ave, Serene City, SC 12345",
  phone: "(555) 987-6543",
  openingHours: "Tue-Sun: 5 PM - 10 PM, Mon: Closed",
  averageRating: 4.9,
  numberOfReviews: 212,
  menuItems: [
    { dishId: "dish_eden_1", dishSlug: "seared-scallops-risotto", name: "Seared Scallops & Saffron Risotto", price: 32.00, imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60", shortDescription: "Perfectly seared scallops on a bed of creamy saffron risotto." },
    { dishId: "dish_eden_2", dishSlug: "lamb-rack-herb-crust", name: "Herb Crusted Lamb Rack", price: 38.50, imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60", shortDescription: "Tender lamb rack with a fragrant herb crust, served with rosemary jus." },
    { dishId: "dish_eden_3", dishSlug: "wild-mushroom-tart", name: "Wild Mushroom & Truffle Tart", price: 26.00, imageUrl: "https://images.unsplash.com/photo-1565031499149-d888a08a0f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60", shortDescription: "Flaky pastry filled with assorted wild mushrooms and black truffle." },
    { dishId: "dish_eden_4", dishSlug: "deconstructed-cheesecake", name: "Deconstructed Berry Cheesecake", price: 14.00, imageUrl: "https://images.unsplash.com/photo-1567327639343-50b727692ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60", shortDescription: "A modern take on a classic, with fresh berries and a graham cracker crumble." }
  ],
  reviewsList: [
    { id: "rev_eden_1", user: "Julia Gourmet", rating: 5, comment: "An oasis of culinary perfection. The scallops were divine!", date: "2024-07-20" },
    { id: "rev_eden_2", user: "Mark Foodlover", rating: 5, comment: "The ambiance is stunning and the food matches. Lamb was cooked to perfection. Highly recommend.", date: "2024-07-18" },
    { id: "rev_eden_3", user: "Sophie Taste Tester", rating: 4, comment: "Beautiful restaurant and very creative dishes. The mushroom tart was a highlight. Service was a little slow but friendly.", date: "2024-07-12" },
  ]
};


const RestaurantDetailPage: React.FC = () => {
  console.log('RestaurantDetailPage loaded');
  // In a real app, you'd use useSearchParams() to get slug and fetch data
  const restaurant = sampleRestaurantData;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow">
        <ParallaxImageSection 
          imageUrl={restaurant.ambianceImageUrl} 
          height="60vh" 
          overlayClassName="bg-black/40"
          contentWrapperClassName="justify-center items-center text-center"
        >
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">{restaurant.name}</h1>
            <p className="mt-2 text-lg sm:text-xl md:text-2xl font-light drop-shadow-md">{restaurant.cuisineType}</p>
            <div className="mt-4 flex items-center justify-center space-x-1 sm:space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-5 w-5 sm:h-6 sm:w-6 ${i < Math.round(restaurant.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
              ))}
              <span className="text-sm sm:text-base">({restaurant.numberOfReviews} reviews)</span>
            </div>
          </div>
        </ParallaxImageSection>

        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/restaurant-listing">Restaurants</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <section className="mb-10 p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Restaurant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
              <p className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary flex-shrink-0" /> {restaurant.address}</p>
              <p className="flex items-center"><Clock className="mr-2 h-5 w-5 text-primary flex-shrink-0" /> {restaurant.openingHours}</p>
              {restaurant.phone && <p className="flex items-center"><Phone className="mr-2 h-5 w-5 text-primary flex-shrink-0" /> {restaurant.phone}</p>}
              <Button variant="outline" className="mt-4 md:mt-0 md:col-start-2 md:justify-self-end w-full md:w-auto">
                 <Navigation className="mr-2 h-5 w-5" /> Get Directions
              </Button>
            </div>
          </section>

          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-slate-800 rounded-md">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({restaurant.reviewsList.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="focus-visible:ring-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurant.menuItems.map(dish => (
                  <DishCard key={dish.dishId} {...dish} />
                ))}
              </div>
              {restaurant.menuItems.length === 0 && <p className="text-center text-muted-foreground py-12">Menu information is currently unavailable.</p>}
            </TabsContent>

            <TabsContent value="about" className="focus-visible:ring-0">
              <Card className="bg-white dark:bg-slate-900 shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Story & Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <p>{restaurant.description}</p>
                  {restaurant.logoUrl && 
                    <div className="my-6 flex justify-center">
                      <img src={restaurant.logoUrl} alt={`${restaurant.name} logo`} className="h-28 w-auto rounded-md shadow-sm"/>
                    </div>
                  }
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="focus-visible:ring-0">
              <div className="space-y-6">
                {restaurant.reviewsList.map(review => (
                  <Card key={review.id} className="bg-white dark:bg-slate-900 shadow-md">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <CardTitle className="text-xl mb-1 sm:mb-0">{review.user}</CardTitle>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
                {restaurant.reviewsList.length === 0 && <p className="text-center text-muted-foreground py-12">No reviews yet. Be the first to share your experience!</p>}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DishDetailPage from "./pages/DishDetailPage";
import Homepage from "./pages/Homepage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import RestaurantListingPage from "./pages/RestaurantListingPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dish-detail" element={<DishDetailPage />} />
          <Route path="/restaurant-detail" element={<RestaurantDetailPage />} />
          <Route path="/restaurant-listing" element={<RestaurantListingPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;

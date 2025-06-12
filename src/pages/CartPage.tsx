import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2, PlusCircle, MinusCircle, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  slug?: string; // For linking back to dish detail page
}

const initialCartItems: CartItem[] = [
  {
    id: 'dish1',
    name: 'Exquisite Margherita Pizza',
    price: 14.99,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    slug: 'margherita-pizza'
  },
  {
    id: 'dish2',
    name: 'Artisanal Spaghetti Carbonara',
    price: 18.50,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1588013243126-aa8511c11895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    slug: 'spaghetti-carbonara'
  },
  {
    id: 'dish3',
    name: 'Gourmet Caesar Salad with Grilled Chicken',
    price: 12.75,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1550304943-432800395294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    slug: 'caesar-salad'
  }
];

const CartPage: React.FC = () => {
  console.log('CartPage loaded');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, change: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0) // Optionally remove if quantity becomes 0, though Math.max(1,...) prevents this
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const calculateItemTotal = (item: CartItem) => {
    return item.price * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const subtotal = calculateSubtotal();
  // For simplicity, fees and total are same as subtotal for now
  const shippingFee = 0; // Placeholder
  const taxes = 0; // Placeholder
  const total = subtotal + shippingFee + taxes;

  useEffect(() => {
    // Potentially fetch cart items from local storage or an API in a real app
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
              <CardTitle className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/restaurant-listing">Browse Restaurants</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            {/* Cart Items Section */}
            <section className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">Review Your Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden md:table-cell p-2">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <Link 
                              to={item.slug ? `/dish-detail/${item.slug}` : '#'} 
                              className="hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, -1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                readOnly // Or implement direct input handling
                                className="h-8 w-12 text-center px-1"
                                aria-label={`Quantity for ${item.name}`}
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleQuantityChange(item.id, 1)}
                                aria-label="Increase quantity"
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${calculateItemTotal(item).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>

            {/* Order Summary Section */}
            <aside className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24"> {/* Sticky for better UX on scroll */}
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-sm">{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : 'Calculated at checkout'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="text-sm">{taxes > 0 ? `$${taxes.toFixed(2)}` : 'Calculated at checkout'}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 pt-6">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/restaurant-listing">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
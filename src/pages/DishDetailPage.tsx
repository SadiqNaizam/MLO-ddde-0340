import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const DishDetailPage: React.FC = () => {
  console.log('DishDetailPage loaded');

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Regular (1/2 lb)");
  const [selectedSpice, setSelectedSpice] = useState("Medium");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Placeholder dish data based on page_type_info and user_journey
  const dishData = {
    id: "dish-123",
    name: "Gourmet Ember Burger",
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyJTIwZ291cm1ldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Indulge in our signature Gourmet Ember Burger. A perfectly grilled prime beef patty, nestled between a toasted artisan brioche bun, layered with aged cheddar, crispy onion straws, smoked paprika aioli, and fresh arugula.",
    price: 18.50,
    ingredients: ["Prime Beef Patty", "Artisan Brioche Bun", "Aged Cheddar", "Crispy Onion Straws", "Smoked Paprika Aioli", "Fresh Arugula"],
    customizationOptions: {
      sizes: ["Regular (1/2 lb)", "Large (3/4 lb)", "Double Stack (1 lb)"],
      spiceLevels: ["Mild", "Medium", "Fiery Hot"],
      // Example add-ons (could be checkboxes if needed, but RadioGroup/Select are in layout_info)
    }
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would dispatch an action to add to cart
    console.log({
      dishId: dishData.id,
      name: dishData.name,
      quantity,
      selectedSize,
      selectedSpice,
      specialInstructions,
      price: dishData.price,
    });
    toast.success(`${dishData.name} added to your cart!`, {
      description: `Quantity: ${quantity}, Size: ${selectedSize}, Spice: ${selectedSpice}`,
      action: {
        label: "View Cart",
        onClick: () => {
          // Assuming Link navigation or router.push('/cart') would be used here
          // For simplicity, just logging. In a real app, navigate to '/cart'
          console.log("Navigate to cart page");
          window.location.href = '/cart'; // Simple navigation for example
        },
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-900 dark:to-amber-950">
      <Header />

      <main className="flex-grow container mx-auto py-8 px-4 md:py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Dish Image Section */}
          <div className="w-full">
            <img
              src={dishData.imageUrl}
              alt={`Image of ${dishData.name}`}
              className="w-full h-auto aspect-[4/3] md:aspect-square lg:aspect-[4/3] object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800"
            />
          </div>

          {/* Dish Details and Customization Form Section */}
          <Card className="shadow-xl rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="border-b dark:border-slate-700 pb-4">
              <CardTitle className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                {dishData.name}
              </CardTitle>
              <p className="text-3xl font-bold text-primary mt-2">${dishData.price.toFixed(2)}</p>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">Description</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{dishData.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">Ingredients</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dishData.ingredients.join(', ')}</p>
              </div>

              <form onSubmit={handleAddToCart} className="space-y-6">
                {/* Size Customization */}
                <div className="space-y-2">
                  <Label htmlFor="dish-size" className="text-md font-medium text-slate-700 dark:text-slate-300">Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize} name="dish-size">
                    <SelectTrigger id="dish-size" className="w-full bg-slate-50 dark:bg-slate-700 dark:text-white">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {dishData.customizationOptions.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Spice Level Customization */}
                <div className="space-y-2">
                  <Label className="text-md font-medium text-slate-700 dark:text-slate-300">Spice Level</Label>
                  <RadioGroup value={selectedSpice} onValueChange={setSelectedSpice} className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                    {dishData.customizationOptions.spiceLevels.map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem value={level} id={`spice-${level.toLowerCase()}`} />
                        <Label htmlFor={`spice-${level.toLowerCase()}`} className="font-normal text-slate-600 dark:text-slate-400 cursor-pointer">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Quantity Input */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-md font-medium text-slate-700 dark:text-slate-300">Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="border-primary text-primary hover:bg-primary/10 dark:border-primary/70 dark:text-primary/90"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-16 text-center font-semibold text-lg bg-transparent border-0 focus-visible:ring-0 p-0 dark:text-white"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                       className="border-primary text-primary hover:bg-primary/10 dark:border-primary/70 dark:text-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Special Instructions Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="special-instructions" className="text-md font-medium text-slate-700 dark:text-slate-300">Special Instructions (Optional)</Label>
                  <Textarea
                    id="special-instructions"
                    placeholder="e.g., no pickles, extra sauce..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={3}
                    className="bg-slate-50 dark:bg-slate-700 dark:text-white"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DishDetailPage;
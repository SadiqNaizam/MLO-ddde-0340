import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Eye } from 'lucide-react';

interface DishCardProps {
  dishId: string;
  dishSlug: string; // Used to construct the link to the dish detail page, e.g., /dish-detail/:dishSlug
  name: string;
  price: number;
  imageUrl: string;
  shortDescription?: string; // Optional short description
}

const DishCard: React.FC<DishCardProps> = ({
  dishId,
  dishSlug,
  name,
  price,
  imageUrl,
  shortDescription,
}) => {
  const { toast } = useToast();
  console.log('DishCard loaded for:', name);

  const handleAddToCart = () => {
    // Placeholder for actual add to cart logic
    toast({
      title: "Added to cart!",
      description: `${name} has been added to your cart.`,
    });
    console.log(`Dish ${dishId} added to cart.`);
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl group flex flex-col">
      <CardHeader className="p-0 relative">
        <Link to={`/dish-detail/${dishSlug}`} aria-label={`View details for ${name}`}>
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Delicious+Dish'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-2 flex-grow">
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
          <Link to={`/dish-detail/${dishSlug}`} className="hover:underline">
            {name}
          </Link>
        </h3>
        {shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {shortDescription}
          </p>
        )}
        <p className="text-2xl font-bold text-primary">
          ${price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-3 border-t bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            asChild
          >
            <Link to={`/dish-detail/${dishSlug}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DishCard;
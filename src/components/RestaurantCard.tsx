import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  slug: string; // Used for navigation, e.g., in query params
  imageUrl: string;
  name: string;
  cuisineType: string;
  rating: number; // e.g., 4.5
  deliveryTime?: string; // e.g., "25-35 min"
  priceRange?: string; // e.g., "$$" or "€€"
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  slug,
  imageUrl,
  name,
  cuisineType,
  rating,
  deliveryTime,
  priceRange,
}) => {
  console.log(`RestaurantCard loaded for: ${name} (ID: ${id}, Slug: ${slug})`);

  return (
    <Link
      to={`/restaurant-detail?slug=${slug}`}
      className="block group outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
      aria-label={`View details for ${name}`}
    >
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-focus-within:shadow-xl bg-card text-card-foreground border border-border">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant+Image'}
              alt={`Promotional image for ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-3 md:p-4 space-y-1.5">
          <h3 className="text-base md:text-lg font-semibold leading-tight truncate" title={name}>
            {name}
          </h3>
          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
            <p className="truncate" title={cuisineType}>{cuisineType}</p>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </div>
          </div>
          {(deliveryTime || priceRange) && (
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              {deliveryTime && <span>{deliveryTime}</span>}
              {priceRange && <span className="font-semibold text-foreground">{priceRange}</span>}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
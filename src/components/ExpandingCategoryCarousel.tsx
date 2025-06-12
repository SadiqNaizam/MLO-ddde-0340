import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Define Item Data Structure
interface CarouselItemData {
  id: string;
  imageUrl: string;
  title: string;
  link: string; 
  altText?: string;
}

// Define Component Props
interface ExpandingCategoryCarouselProps {
  items: CarouselItemData[];
  title?: string;
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
}

const ExpandingCategoryCarousel: React.FC<ExpandingCategoryCarouselProps> = ({
  items,
  title,
  loop = false,
  align = 'start',
}) => {
  console.log('ExpandingCategoryCarousel loaded');

  if (!items || items.length === 0) {
    if (title) {
      return (
        <div className="w-full py-8 md:py-12">
          <h2 className="text-3xl font-bold mb-6 md:mb-8 text-center text-card-foreground">{title}</h2>
          <p className="text-muted-foreground text-center">No items to display at the moment.</p>
        </div>
      );
    }
    return null;
  }

  // Show navigation buttons if there's more than one item.
  // Embla Carousel (used by shadcn/ui) will disable buttons if not scrollable.
  const showNavigation = items.length > 1;

  return (
    <div className="w-full py-8 md:py-12">
      {title && <h2 className="text-3xl font-bold mb-6 md:mb-8 text-center text-card-foreground">{title}</h2>}
      <Carousel
        opts={{
          align,
          loop,
        }}
        className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-4"> {/* Negative margin for item padding visual alignment */}
          {items.map((item) => (
            <CarouselItem 
              key={item.id} 
              className="pl-4 basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 group"
            >
              <Link 
                to={item.link} 
                aria-label={`View ${item.title}`}
                className="block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg h-full"
              >
                <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-105 h-full flex flex-col bg-card text-card-foreground">
                  <CardContent className="p-0 flex-grow flex flex-col"> 
                    <AspectRatio ratio={3 / 4} className="w-full">
                      <img
                        src={item.imageUrl || 'https://via.placeholder.com/300x400?text=Food+Image'}
                        alt={item.altText || item.title}
                        className="object-cover w-full h-full rounded-t-lg"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <div className="p-3 sm:p-4 w-full border-t border-border">
                      <h3 className="text-base sm:text-lg font-semibold text-center truncate group-hover:text-primary">
                        {item.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            {/* Rely on shadcn/ui default positioning for navigation buttons, add z-index for safety */}
            <CarouselPrevious className="z-10" />
            <CarouselNext className="z-10" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ExpandingCategoryCarousel;
import React from 'react';
import { cn } from '@/lib/utils'; // Assumes cn is available from shadcn/ui setup

interface ParallaxImageSectionProps {
  /** The URL of the image to be displayed with parallax effect. */
  imageUrl: string;
  /** The height of the parallax section. Can be any valid CSS height value (e.g., '60vh', '400px'). Defaults to '60vh'. */
  height?: string;
  /** React nodes to be rendered as content on top of the parallax image. */
  children?: React.ReactNode;
  /** Additional Tailwind CSS classes to apply to the main container div. */
  className?: string;
  /** Tailwind CSS classes for an optional overlay element that sits between the background image and the content. E.g., 'bg-black/50' or 'bg-gradient-to-t from-black/70 to-transparent'. */
  overlayClassName?: string;
  /** Tailwind CSS classes for the content wrapper div if children are present. Use this to style and position the children. E.g. 'justify-start items-end p-8 text-white'. */
  contentWrapperClassName?: string;
}

const ParallaxImageSection: React.FC<ParallaxImageSectionProps> = ({
  imageUrl,
  height = '60vh',
  children,
  className,
  overlayClassName,
  contentWrapperClassName,
}) => {
  console.log('ParallaxImageSection loaded for image:', imageUrl);

  // Default styles for the content wrapper: centered, full size.
  // These can be overridden or extended by contentWrapperClassName.
  const defaultContentWrapperClasses = 'flex h-full w-full flex-col items-center justify-center text-center';

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed', // Core styles for parallax effect
        className // User-provided additional classes for the main container
      )}
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: height,
      }}
      // Consider adding role="region" and an aria-label if this section forms a distinct landmark
      // For example, if it represents a "Hero Banner" or "Ambiance Showcase".
      // For now, it's a generic div; context can be provided by its parent or children.
    >
      {/* Overlay: Rendered if overlayClassName is provided. 
          Sits on top of the background image and below the content. */}
      {overlayClassName && (
        <div className={cn('absolute inset-0 z-[1]', overlayClassName)} />
      )}

      {/* Content Wrapper: Rendered if children are provided. 
          Sits on top of the overlay (if any) or directly on the background image. */}
      {children && (
        <div
          className={cn(
            'relative z-[2]', // Ensures content is above the overlay
            defaultContentWrapperClasses, // Default layout for content (centered, etc.)
            contentWrapperClassName // User-provided classes to customize content layout and styling
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ParallaxImageSection;
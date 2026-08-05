'use client';

import React from 'react';
import { useCarousel } from './CarouselContext';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
};

const CarouselDots = ({ className }: Props) => {
  const { pageCount, activeIndex, scrollTo } = useCarousel();

  // Hide dots if there is only 1 page or less
  if (pageCount <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      {Array.from({ length: pageCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={cn(
            `appearance-none size-2 rounded-full shrink-0 transition-all duration-300 border-none p-0 m-0 opacity-75, ${
              activeIndex === index
                ? 'bg-white' // Active state (a wider pill shape looks modern)
                : 'bg-white/40 hover:bg-white/60' // Inactive state
            }`,
          )}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;

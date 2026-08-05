'use client';

import { PropsWithChildren } from 'react';

import React, { useEffect } from 'react';
import { useCarousel } from './CarouselContext';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
};

const CarouselContent = ({ children, className }: Props & PropsWithChildren) => {
  const { scrollRef, setActiveIndex, setPageCount } = useCarousel();

  // Automatically count how many items exist to generate the dots
  useEffect(() => {
    setPageCount(React.Children.count(children));
  }, [children, setPageCount]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const clientWidth = e.currentTarget.clientWidth;
    // Calculate current index based on scroll position
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={cn(`flex overflow-x-auto snap-x snap-mandatory w-full no-scrollbar`, className)}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides native scrollbar
    >
      {children}
    </div>
  );
};

export default CarouselContent;

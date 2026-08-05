'use client';

import React, { PropsWithChildren, useRef, useState } from 'react';
import { CarouselContext } from './CarouselContext';
import { cn } from '@/utilities/ui';

type Props = {className?: string};

const CarouselProvider = ({ children, className }: Props & PropsWithChildren) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

 

  // 2. Scroll to the correct page when a user clicks a dot
  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        scrollRef,
        scrollTo,
        pageCount,
        setPageCount,
      }}
    >
      <div className={cn(`relative flex flex-col gap-4 w-full`, className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

export default CarouselProvider;

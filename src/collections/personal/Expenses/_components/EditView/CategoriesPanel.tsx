'use client';

import React, { useContext, useRef, useState } from 'react';

import { expenseCategoriesArray, type ExpenseCategory } from '../../_types/expenseCategories';
import { cn } from '@/utilities/ui';
import { EditViewContext } from './EditViewContext';
import Collapsible from '@/components/layout/Collapsible';
import { chunkArray } from '../../../../../utilities/arrays/chunkArray';

type Props = {};

const CategoriesPanel = (props: Props) => {
  const ctx = useContext(EditViewContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const paginatedCategories = chunkArray<ExpenseCategory>(expenseCategoriesArray, 9);

  // 1. Update the active dot when the user swipes/scrolls
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const clientWidth = e.currentTarget.clientWidth;
    // Calculate which page we are mostly looking at
    const currentIndex = Math.round(scrollLeft / clientWidth);
    setActiveIndex(currentIndex);
  };

  // 2. Scroll to the correct page when a user clicks a dot
  const scrollToPage = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  function handleSelectCategory(category: ExpenseCategory) {
    ctx?.setSelectedCategory(category);
  }

  return (
    <Collapsible.Item>
      <Collapsible.Header className="flex justify-between">
        <p>Category</p> <p>{ctx?.selectedCategory?.label}</p>
      </Collapsible.Header>

      <Collapsible.Content>
        <div className="flex flex-col gap-4">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory w-full pb-2 no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides native scrollbar
          >
            {/* 3. Outer Map: The "Slides" */}
            {paginatedCategories.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="w-full flex-shrink-0 snap-start grid grid-cols-3 grid-rows-3 gap-3 px-4"
              >
                {/* 4. Inner Map: The Buttons on this specific slide */}
                {page.map((category) => (
                  <button
                    key={category.value}
                    className={cn(
                      'px-4 py-2 bg-neutral-800 text-white border border-white/50 rounded-full hover:bg-white/20 whitespace-nowrap',
                      ctx?.selectedCategory?.value === category.value &&
                        'bg-red-800 active:bg-red-600 hover:bg-red-800',
                    )}
                    onClick={() => handleSelectCategory(category)}
                    aria-pressed={ctx?.selectedCategory?.value === category.value}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* 3. Indicator Dots */}
          {/* Only render dots if there is more than 1 page */}
          {paginatedCategories.length > 1 && (
            <div className="flex justify-center items-center gap-2 h-4">
              {paginatedCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPage(index)}
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
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Item>
  );
};

export default CategoriesPanel;

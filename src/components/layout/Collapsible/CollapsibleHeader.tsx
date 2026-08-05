"use client";

import React, { PropsWithChildren } from 'react';
import { useCollapsibleItem } from './CollapsibleItem';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
};

const CollapsibleHeader = ({ children, className }: PropsWithChildren<Props>) => {
  const { toggle, isOpen } = useCollapsibleItem();

  return (
    <button 
      onClick={toggle} 
      className={cn(
        'bg-zinc-800 cursor-pointer w-full border-none px-8 py-4 m-0 text-xl font-bold',
        className)}
      aria-expanded={isOpen}

    >
      {children}
    </button>
  );
};

export default CollapsibleHeader;
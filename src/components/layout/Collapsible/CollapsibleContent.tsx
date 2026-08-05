"use client";

import React, { PropsWithChildren } from 'react';
import { useCollapsibleItem } from './CollapsibleItem';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
};

const CollapsibleContent = ({ children, className }: PropsWithChildren<Props>) => {
  const { isOpen } = useCollapsibleItem();

  if (!isOpen) return null;

  return (
    <div className={cn("py-4 px-8", className)}>
      {children}
    </div>
  );
};

export default CollapsibleContent;
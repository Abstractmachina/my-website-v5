import { cn } from '@/utilities/ui';
import React, { PropsWithChildren } from 'react';


type Props = {
  className?: string;
}

const H1 = ({children, className}:Props & PropsWithChildren) => {
  return (
    <h1 className={cn('text-2xl font-black', className)}>{children}</h1>
  )
}

export default H1;
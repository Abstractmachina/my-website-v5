import { cn } from '@/utilities/ui';
import React, { PropsWithChildren } from 'react';


type Props = {
  className?: string;
}

const H2 = ({children, className}:Props & PropsWithChildren) => {
  return (
    <h2 className={cn('text-xl font-bold', className)}>{children}</h2>
  )
}

export default H2;
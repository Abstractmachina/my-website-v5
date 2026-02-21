import { cn } from '@/utilities/ui';
import React, { PropsWithChildren } from 'react';


type Props = {
  className?: string;
}

const H3 = ({children, className}:Props & PropsWithChildren) => {
  return (
    <h3 className={cn('text-lg font-bold', className)}>{children}</h3>
  )
}

export default H3;
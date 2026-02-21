import { cn } from '@/utilities/ui';
import React, { PropsWithChildren } from 'react';


type Props = {
  className?: string;
}

const P = ({children, className}:Props & PropsWithChildren) => {
  return (
    <p className={cn('', className)}>{children}</p>
  )
}

export default P;
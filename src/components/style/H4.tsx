import { cn } from '@/utilities/ui';
import React, { PropsWithChildren } from 'react';


type Props = {
  className?: string;
}

const H4 = ({children, className}:Props & PropsWithChildren) => {
  return (
    <h4 className={cn('text-base font-bold', className)}>{children}</h4>
  )
}

export default H4;
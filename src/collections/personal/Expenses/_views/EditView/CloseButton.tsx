import { Button } from '@/components/shadcn/button';
import { cn } from '@/utilities/ui';
import { Loader, X } from 'lucide-react';
import Link from 'next/link';


type Props = {
  className?: string;
  variant?: "small";
}

const CloseButton = ({className, variant}:Props) => {
  
  
  
  return (
    <Button
      className={cn(
        'w-full flex justify-center p-8 hover:cursor-pointer rounded-none border-none',
        variant === 'small' && 'w-auto p-8 bg-my-bg-800 hover:bg-my-bg-700',
        className,
      )}
      // onClick={handleSubmit}
      // disabled={ctx?.isSaving}
      asChild
    >
      <Link href="/admin/collections/expenses">
        {false ? <Loader size={23} /> : <X />}
      </Link>
    </Button>
  )
}

export default CloseButton;
'use client';

import { Check } from 'lucide-react';
import React, { useContext } from 'react';
import { EditViewContext } from './EditViewContext';
import Loader from '@/components/animated/Loader';
import { cn } from '@/utilities/ui';

type Props = {
  className?: string;
};

const SubmitButton = ({ className }: Props) => {
  const ctx = useContext(EditViewContext);

  function handleSubmit() {
    ctx?.submit();
  }

  return (
    <button
      className={cn('w-full flex justify-center py-8 px-8 hover:cursor-pointer', className)}
      onClick={handleSubmit}
      disabled={ctx?.isSaving}
    >
      {ctx?.isSaving ? <Loader size={23} /> : <Check />}
    </button>
  );
};

export default SubmitButton;

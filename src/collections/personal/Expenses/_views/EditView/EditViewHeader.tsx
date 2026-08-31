"use client";

import { Separator } from '@/components/shadcn/separator';
import H2 from '@/components/style/H2';
import { Check, X } from 'lucide-react';
import { EditViewContext } from './EditViewContext';
import { useContext } from 'react';

type Props = {
};

const EditViewHeader = (props: Props) => {
  const ctx = useContext(EditViewContext);

  return (
    <div>
      <div className="flex justify-between py-8 px-8">
        <Check />
        <H2 className="text-2xl text-white ">{ctx?.isNew ? 'Add new Expense' : 'Edit Expense'}</H2>
        <X />
      </div>
      <Separator className="w-full bg-white" />
    </div>
  );
};

export default EditViewHeader;

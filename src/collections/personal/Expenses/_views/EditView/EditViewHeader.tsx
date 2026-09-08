"use client";

import { Separator } from '@/components/shadcn/separator';
import H2 from '@/components/style/H2';
import { Check, X } from 'lucide-react';
import { EditViewContext } from './EditViewContext';
import { useContext } from 'react';
import SubmitButton from './SubmitButton';
import CloseButton from './CloseButton';

type Props = {
};

const EditViewHeader = (props: Props) => {
  const ctx = useContext(EditViewContext);

  return (
    <div>
      <div className="flex justify-between">
        <SubmitButton variant="small" />
        <H2 className="text-2xl text-white flex items-center">{ctx?.isNew ? 'Add new Expense' : 'Edit Expense'}</H2>
        <CloseButton variant="small" />
      </div>
      <Separator className="w-full bg-white" />
    </div>
  );
};

export default EditViewHeader;

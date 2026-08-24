'use client';

import React, { PropsWithChildren, useState } from 'react';
import { ExpenseCategory } from '../../_types/expenseCategories';
import { EditViewContext } from './EditViewContext';
import { ExpenseTag } from '@/payload-types';

type Props = {
  initialTags?: ExpenseTag[];
};

const EditViewController = ({ children, initialTags }: Props & PropsWithChildren) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [selectedTag, setSelectedTag] = useState<ExpenseTag | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  function submit() {
    console.log('submit');
  }

  return (
    <EditViewContext.Provider
      value={{
        amount,
        setAmount,
        selectedCategory,
        setSelectedCategory,
        allTags: initialTags || null,
        selectedTag,
        setSelectedTag,
        selectedDate,
        setSelectedDate,
        comment,
        setComment,
        submit,
      }}
    >
      <p>amount: {amount}</p>
      {children}
    </EditViewContext.Provider>
  );
};

export default EditViewController;

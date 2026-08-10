"use client";

import React, { PropsWithChildren, useState } from 'react';
import { ExpenseCategory } from '../../_types/expenseCategories';
import { EditViewContext } from './EditViewContext';
import { ExpenseTag } from '@/payload-types';


type Props = {
  initialTags?: ExpenseTag[]
}

const EditViewController = ({ children, initialTags }: Props & PropsWithChildren) => {
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [selectedTag, setSelectedTag] = useState<ExpenseTag | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  return (
    <EditViewContext.Provider value={
      {
        selectedCategory,
        setSelectedCategory,
        allTags: initialTags || null,
        selectedTag,
        setSelectedTag,
        selectedDate,
        setSelectedDate
      }
    }>{children}</EditViewContext.Provider>
  )
}

export default EditViewController;
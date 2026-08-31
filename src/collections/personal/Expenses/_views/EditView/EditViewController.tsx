'use client';

import { PropsWithChildren, useState } from 'react';
import { ExpenseCategory, getExpenseCategory } from '../../_types/expenseCategories';
import { EditViewContext } from './EditViewContext';
import { Expense, ExpenseTag } from '@/payload-types';
import { createExpense, updateExpense } from '@/lib/serverActions/expenseActions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { sendMessage } from '@/components/informative/sendMessage';

type Props = {
  existingDoc?: Expense;
  initialTags?: ExpenseTag[];
};

const EditViewController = ({ children, initialTags, existingDoc }: Props & PropsWithChildren) => {
  const isNew = !existingDoc?.id;

  const router = useRouter();
  const [amount, setAmount] = useState<number | null>(isNew ? null : existingDoc?.amount || null);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(
    isNew ? null : getExpenseCategory(existingDoc?.category) || null,
  );
  const [selectedTag, setSelectedTag] = useState<ExpenseTag | null>(
    isNew || !existingDoc.tag
      ? null
      : typeof existingDoc?.tag !== 'number'
        ? existingDoc?.tag
        : initialTags?.find((tag) => tag.id === existingDoc?.tag) || null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    isNew ? new Date() : new Date(existingDoc?.date),
  );
  const [comment, setComment] = useState<string | null>(
    isNew ? null : existingDoc?.comment || null,
  );

  const [isSaving, setIsSaving] = useState(false);

  const saveMutation = useMutation({
    mutationFn: async () => {
      setIsSaving(true);

      let result: null | Expense = null;
      if (isNew) {
        result = await createExpense({
          amount,
          category: selectedCategory?.value,
          tag: selectedTag?.id,
          date: selectedDate?.toISOString(),
          comment,
        });
      } else {
        result = await updateExpense(existingDoc?.id || '', {
          amount,
          category: selectedCategory?.value,
          tag: selectedTag?.id,
          date: selectedDate?.toISOString(),
          comment,
        });
      }
      return result;
    },
    onError: (error: any) => {
      sendMessage({ message: 'Error creating expense', description: error.message });
    },
    onSuccess: (data) => {
      // data.doc should be the newly created document returned from Payload
      if (data) {
        console.log('Expense created successfully', data);
        router.push('/admin/collections/expenses/');
      }
      // if (!existingDocId) {
      //   // 1. If we just CREATED a doc, redirect to its specific edit page
      //   // Adjust the base URL if your admin panel is not at /admin
      //   router.push(`/admin/collections/expenses/${data.doc.id}`);
      // } else {
      //   // 2. If we just UPDATED a doc, tell the Server Component to re-fetch its data
      //   router.refresh();
      // }
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  async function submit() {
    console.log('submit');

    saveMutation.mutate();
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
        isSaving,
        isNew,
      }}
    >
      {children}
    </EditViewContext.Provider>
  );
};

export default EditViewController;

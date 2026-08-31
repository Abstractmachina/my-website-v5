import React from 'react';

import { DocumentViewServerProps } from 'payload';
import { Check, X } from 'lucide-react';
import CategoriesPanel from './CategoriesPanel';
import EditViewController from './EditViewController';
import TagsPanel from './TagsPanel';
import DatePanel from './DatePanel';
import CommentPanel from './CommentPanel';
import AmountPanel from './AmountPanel';
import SubmitButton from './SubmitButton';
import Providers from './Providers';
import { Separator } from '@/components/shadcn/separator';
import Collapsible from '@/components/layout/Collapsible';
import { Expense } from '@/payload-types';
import EditViewHeader from './EditViewHeader';

export const EditView = async (props: DocumentViewServerProps) => {
  const { doc, initPageResult } = props;
  const { payload } = initPageResult.req;

  // This runs securely on the server with direct database access
  const { docs: tags } = await payload.find({
    collection: 'expenseTags', // Replace with your actual categories collection slug
    limit: 0, // Set a limit or use pagination if you have many
    depth: 0, // Keep depth low if you only need the ID and title
  });

  const typedDoc = doc as unknown as Expense;

    return (
      <Providers>
        <EditViewController existingDoc={typedDoc} initialTags={tags}>
          <main className="text-white flex flex-col h-full mytheme-primary-400">

            <EditViewHeader />
            <AmountPanel />
            <Collapsible>
              <CategoriesPanel />
              <TagsPanel allTags={tags} />
              <DatePanel />
              <CommentPanel />
            </Collapsible>
            <SubmitButton className="fixed bottom-0"/>
          </main>
        </EditViewController>
      </Providers>
    );

};

export default EditView;

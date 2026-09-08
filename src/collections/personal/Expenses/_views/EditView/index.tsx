import React from 'react';

import { DocumentViewServerProps } from 'payload';
import CategoriesPanel from './CategoriesPanel';
import EditViewController from './EditViewController';
import TagsPanel from './TagsPanel';
import DatePanel from './DatePanel';
import CommentPanel from './CommentPanel';
import AmountPanel from './AmountPanel';
import SubmitButton from './SubmitButton';
import Providers from './Providers';
import Collapsible from '@/components/layout/Collapsible';
import { Expense } from '@/payload-types';
import EditViewHeader from './EditViewHeader';
import Centered from '@/components/shadcn/Centered';

export const EditView = async (props: DocumentViewServerProps) => {
  const { doc, initPageResult } = props;
  const { payload } = initPageResult.req;

  // This runs securely on the server with direct database access
  const { docs: tags } = await payload.find({
    collection: 'expenseTags', // Replace with your actual categories collection slug
    limit: 0, // Set a limit or use pagination if you have many
    depth: 0, // Keep depth low if you only need the ID and title
    sort: '-count',
  });

  const typedDoc = doc as unknown as Expense;

  const componentKey = typedDoc?.id ? typedDoc.id : `new-${Date.now()}`;

    return (
      <Providers>
        <EditViewController existingDoc={typedDoc} initialTags={tags} key={componentKey}>
          
          <Centered>
            <main className="text-white flex flex-col h-full mytheme-primary-400">
              <EditViewHeader />
              <AmountPanel />
              <Collapsible>
                <CategoriesPanel />
                <TagsPanel />
                <DatePanel />
                <CommentPanel />
              </Collapsible>

              <Centered className="fixed bottom-0">
                <SubmitButton />
              </Centered>
            </main>
          </Centered>
        </EditViewController>
      </Providers>
    );

};

export default EditView;

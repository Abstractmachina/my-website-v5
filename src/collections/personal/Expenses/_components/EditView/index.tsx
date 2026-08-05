import React from 'react';

import { DocumentViewServerProps } from 'payload';
import { Check, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Collapsible from '@/components/layout/Collapsible';
import CategoriesPanel from './CategoriesPanel';
import EditViewController from './EditViewController';
import TagsPanel from './TagsPanel';
import DatePanel from './DatePanel';
import CommentPanel from './CommentPanel';

export const EditView = async (props: DocumentViewServerProps) => {
  const { doc, initPageResult } = props;
  const { payload } = initPageResult.req;

  // This runs securely on the server with direct database access
  const { docs: tags } = await payload.find({
    collection: 'expenseTags', // Replace with your actual categories collection slug
    limit: 0, // Set a limit or use pagination if you have many
    depth: 0, // Keep depth low if you only need the ID and title
  });

  //creating new doc
  if (!doc) {
    return (
      <EditViewController>
        <main className="text-white">
          <div className="flex justify-between py-8 px-8">
            <Check />
            <p className="text-2xl text-white ">Add new Expense</p>
            <X />
          </div>
          <Separator className="w-full bg-white" />

          <div className="flex justify-end items-end p-8 gap-2">
            <p className="text-[8rem] leading-tight h-full bg-red-900text-right">10</p>
            <div className="size-12 mb-6 border border-solid border-white rounded-full flex justify-center items-center text-2xl">
              &euro;
            </div>
          </div>

          <Collapsible>
            
            <CategoriesPanel />

            <TagsPanel allTags={tags} />

            <DatePanel />

            <CommentPanel />
            
          </Collapsible>
        </main>
      </EditViewController>
    );
  }

  return (
    <p className="text-2xl text-white">Edit Expense</p>
  );
};

export default EditView;

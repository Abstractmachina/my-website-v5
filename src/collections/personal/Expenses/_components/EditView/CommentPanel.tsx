import Collapsible from '@/components/layout/Collapsible';
import React from 'react';

type Props = {};

const CommentPanel = (props: Props) => {
  return (
    <Collapsible.Item>
      <Collapsible.Header>Comment</Collapsible.Header>
      <Collapsible.Content>
        <div className="flex justify-end items-end p-8 bg-green-900">
          <p className="text-[8rem] leading-tight h-full bg-red-900 text-right">10</p>
          <div className="size-12 border border-solid border-white rounded-full flex justify-center items-center text-2xl">
            &euro;
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Item>
  );
};

export default CommentPanel;

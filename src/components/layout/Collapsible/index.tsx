import React, { PropsWithChildren } from 'react';
import CollapsibleProvider from './CollapsibleProvider';
import CollapsibleItem from './CollapsibleItem';
import CollapsibleHeader from './CollapsibleHeader';
import CollapsibleContent from './CollapsibleContent';


type Props = {
  className?: string
}

const Collapsible = ({className, children}:Props & PropsWithChildren) => {
  return (
    <div className={className}>
      <CollapsibleProvider>{children}</CollapsibleProvider>
    </div>
  )
}

Collapsible.Item = CollapsibleItem;
Collapsible.Header = CollapsibleHeader;
Collapsible.Content = CollapsibleContent;

export default Collapsible;
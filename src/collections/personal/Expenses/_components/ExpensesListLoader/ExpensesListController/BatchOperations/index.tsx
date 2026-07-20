import Card from '@/components/layout/Card';
import H2 from '@/components/styledComponents/H2';
import React from 'react';
import ChangeCategoryForm from './ChangeCategoryForm';


type Props = {
}

const BatchOperationsPanel = (props:Props) => {
  return (
    <Card>
      <section>
        <H2>Change Category</H2>
        <ChangeCategoryForm />
      </section>
    </Card>
  )
}

export default BatchOperationsPanel;
"use client";

import { Check } from 'lucide-react';
import React, { useContext } from 'react';
import { EditViewContext } from './EditViewContext';

type Props = {};

const SubmitButton = (props: Props) => {
  const ctx = useContext(EditViewContext);


  function handleSubmit() {
    console.log('submit');
    ctx?.submit();
  }

  return (
    <button className="w-full flex justify-center py-8 px-8 hover:cursor-pointer" onClick={handleSubmit}>
      <Check />
    </button>
  );
};

export default SubmitButton;

'use client';

import React, { useContext, useEffect, useState } from 'react';
import { EditViewContext } from './EditViewContext';

type Props = {};

const AmountPanel = (props: Props) => {
  const ctx = useContext(EditViewContext);

  const [inputValue, setInputValue] = useState<string>(ctx?.amount?.toString() ?? '');


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    // Strictly limit to 2 decimals while typing
    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
      setInputValue(val); // Save as STRING so "12.50" and "12." don't break
    }
  }

  function handleBlur() {
    // Commit the actual number to your context when they click away
    ctx?.setAmount(inputValue === "" ? null : Number(inputValue));
    
    // Optional: Auto-format to 2 decimals on blur (e.g., turn "12.5" into "12.50")
    if (inputValue !== "") {
      setInputValue(Number(inputValue).toFixed(2));
    }
  }

  return (
    <div className="flex justify-end items-end p-8 gap-2">
      <input
        className="text-[8rem] w-full leading-tight h-40 text-right bg-transparent border-none"
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        step="0.01"
      />
      <div className="size-12 shrink-0 mb-6 border border-solid border-white rounded-full flex justify-center items-center text-2xl">
        &euro;
      </div>
    </div>
  );
};

export default AmountPanel;

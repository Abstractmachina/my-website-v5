"use client";

import { useState } from "react";

import { DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";


type Props = {
  /** The selected date when the component is controlled */
  value?: Date | null;
  /** Callback fired when a date is selected */
  onChange?: (date: Date | null) => void;
}

function DatePicker({value, onChange } : Props) {
  const [internalDate, setInternalDate] = useState<Date | null>(null);

  // If `value` is passed, the component is controlled by the parent
  const isControlled = value !== undefined;

  // Use the prop if controlled, otherwise use the internal state
  const selected = isControlled ? value : internalDate;

  const handleSelect = (date: Date | undefined) => {
    // Only update internal state if we aren't being controlled by a parent
    if (!isControlled) {
      setInternalDate(date || null);
    }
    // Always fire the onChange callback if the parent provided one
    onChange?.(date || null);
  };

  return (
    <DayPicker
      mode="single"
      selected={selected || undefined}
      onSelect={handleSelect}
      // footer={
      //   selected ? `Selected: ${selected?.toISOString()}` : "Pick a day."
      // }
    />
  );
};

export default DatePicker;
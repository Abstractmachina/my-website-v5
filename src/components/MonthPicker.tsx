"use client";

import { cn } from "@/utilities/ui";
import { Triangle } from "lucide-react";
import React from "react";

type Props = {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
};

const MonthPicker = ({selectedMonth, setSelectedMonth, selectedYear, setSelectedYear}: Props) => {



	function handleDecrease() {
		if (selectedMonth === 0) {
			setSelectedMonth(11);
			setSelectedYear(selectedYear - 1);
		} else {
			setSelectedMonth(selectedMonth - 1);
		}
	}

	function handleIncrease() {
		// if the month is the current month and the year is the current year, do nothing
		if (
			selectedMonth === new Date().getMonth() &&
			selectedYear === new Date().getFullYear()
		) {
			return;
		}
		if (selectedMonth === 11) {
			setSelectedMonth(0);
			setSelectedYear(selectedYear + 1);
		} else {
			setSelectedMonth(selectedMonth + 1);
		}
	}

	return (
		<div className="flex items-center">
			<Triangle
				className="size-4 cursor-pointer stroke-none fill-zinc-700 hover:fill-zinc-200 transition-all transition-duration-300"
				style={{ transform: "rotate(-90deg)" }}
				onClick={handleDecrease}
			/>
			<span className="w-40 text-center">
				{months[selectedMonth]} {selectedYear}
			</span>
			<Triangle
				className={cn(
					" size-4 cursor-pointer stroke-none fill-zinc-700 hover:fill-zinc-200 transition-all transition-duration-300",
					selectedMonth === new Date().getMonth() &&
						selectedYear === new Date().getFullYear() &&
						"hidden",
				)}
				style={{ transform: "rotate(90deg)" }}
				onClick={handleIncrease}
			/>
		</div>
	);
};

export default MonthPicker;

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

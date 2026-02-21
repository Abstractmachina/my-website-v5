import MonthPicker from "@/components/MonthPicker";
import Link from "next/link";
import React from "react";

type Props = {
	selectedMonth: number;
	setSelectedMonth: (month: number) => void;
	selectedYear: number;
	setSelectedYear: (year: number) => void;
};

const ControlPanel = ({
	selectedMonth,
	setSelectedMonth,
	selectedYear,
	setSelectedYear,
}: Props) => {
	return (
		<div className="flex flex-col items-center gap-2 justify-center py-4">
			<div className="flex gap-2">
				<Link href="/admin/globals/budget">Budget</Link>
				<Link href="/admin/collections/income">Income</Link>
			</div>
			<MonthPicker
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
				selectedYear={selectedYear}
				setSelectedYear={setSelectedYear}
			/>
		</div>
	);
};

export default ControlPanel;

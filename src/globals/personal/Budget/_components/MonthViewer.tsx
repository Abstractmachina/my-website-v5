"use client";

import React, { useState } from "react";
import SummaryCard from "./SummaryCard";
import H2 from "@/components/styledComponents/H2";
import MonthPicker from "@/components/MonthPicker";
import { useExpensesQuery } from "@/lib/queries/expensesQueries";
import { useIncomeQuery } from "@/lib/queries/incomeQueries";

type Props = {};

const MonthViewer = (props: Props) => {
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth(),
	);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear(),
	);

	const expensesQuery = useExpensesQuery(
		new Date().getFullYear(),
		new Date().getMonth(),
	);
	const incomeQuery = useIncomeQuery(
		new Date().getFullYear(),
		new Date().getMonth(),
	);

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-center">
        <MonthPicker
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>
			<SummaryCard expenses={expensesQuery.data} income={incomeQuery.data} />
			<section className="bg-zinc-700 rounded-lg p-8">
				<H2>Income & Expense Trends</H2>
				<div>
					<p>-------------------------------------------------------------</p>
					<p>| ¸·´¯`·.¸💵 Income ———— |</p>
					<p>| ¸·´¯`·.¸💸 Expenses ———— |</p>
					<p>|-----------------------------------------------------------|</p>
					<p>| Jan Feb Mar Apr May Jun Jul Aug Sep ... |</p>
					<p>-------------------------------------------------------------</p>
				</div>
			</section>

			<section className="bg-zinc-700 rounded-lg p-8">
				<H2>CATEGORY BREAKDOWN (Donut + Bars)</H2>
				------------------------------------------------------------- | 🍔
				Dining 25% | 🏠 Rent 35% | 🚗 Transport 15% | 🎮 Leisure 10% |
				|-------------------------------------------------------------| |
				Horizontal Bar Chart → Amount per Category (€) |
				-------------------------------------------------------------
			</section>
			<section className="bg-zinc-700 rounded-lg p-8">
				<H2>BUDGET PERFORMANCE (Planned vs. Actual)</H2>
				<div>
					------------------------------------------------------------- |
					Category | Planned | Actual | % Used | Variance | | | Rent | 1500 |
					1500 | 100% | 0% | ▇▇▇▇▇ | | Groceries | 400 | 480 | 120% | +20% |
					▇▇▇▇▇▇ | | Dining Out | 300 | 230 | 77% | -23% | ▇▇▇▇ |
					-------------------------------------------------------------
				</div>
			</section>

			<section className="bg-zinc-700 rounded-lg p-8">
				<H2>💰 SAVINGS & GOALS (Progress Bars)</H2>
				<div>
					------------------------------------------------------------- | Goal |
					Target | Current | Progress | Time Left | | Emergency Fund | 6000€ |
					3800€ | ████░░░░ 63% | 5 mo | | Travel Fund | 2000€ | 1200€ | ████░░░░
					60% | 3 mo | | Investments | 15000€ | 12400€ | █████░░░ 83% | 1 yr |
					-------------------------------------------------------------
				</div>
			</section>

			<section className="bg-zinc-700 rounded-lg p-8">
				<H2>📉 LONG-TERM INDICATORS (Mini Cockpit)</H2>
				<div>
					------------------------------------------------------------- | 📈 Net
					Worth Trend: ──── rising line | | 💳 DTI Ratio Gauge: 32% (good) | |
					📊 Investment Ratio: 18% of income | | 🪙 FI Ratio: 45% → halfway
					there! | -------------------------------------------------------------
				</div>
			</section>

			<section className="bg-zinc-700 rounded-lg p-8">
				<H2>🧠 BEHAVIORAL INSIGHTS</H2>
				<div>
					------------------------------------------------------------- | ✅
					Budget Adherence: 9/12 months on budget | | ⚠️ Impulse Spends: 5 this
					month (+2 vs. last) | | ⚙️ Category Adjustments: 2 changes this month
					| ------------------------------------------------------------- | 💡
					Insight: Dining expenses ↑23%. Set weekly cap to save €40 |
					-------------------------------------------------------------
				</div>
			</section>
		</div>
	);
};

export default MonthViewer;

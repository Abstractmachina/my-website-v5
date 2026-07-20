"use client";

import React, { useMemo } from "react";

import { Expense, ExpenseTag } from "@/payload-types";
import { formatDateTime } from "@/utilities/formatDateTime";
import Link from "next/link";
import H3 from "@/components/styledComponents/H3";
import { capitalizeFirstLetter } from "@/utilities/string/capitalizeFirstLetter";
import { roundToDecimal } from "@/utilities/math/round";
import P from "@/components/styledComponents/P";

type Props = {
	expensesByDate?: Map<string, Expense[]>;
	expensesByCategory?: Map<string, Map<string, Expense[]>>;
	sortBy?: "date" | "category";
};

const ExpensesListTable = ({ expensesByDate, expensesByCategory, sortBy }: Props) => {
	const total = useMemo(() => {

		if (sortBy === "date") {
			if (!expensesByDate) return 0;
			const result = _getTotal(
				Array.from(expensesByDate.values()).map((expenseArray) => {
					const sub = _getTotal(
						expenseArray.map((doc: Expense) => doc.amount || 0),
					);
					return sub;
				}),
			);
			return result;
		}
		if (sortBy === "category") {
			if (!expensesByCategory) return 0;
			const result = _getTotal(
				Array.from(expensesByCategory.values()).map((tagMap) => {
					const sub = _getTotal(
						Array.from(tagMap.values()).map((expenseArray) =>
							_getTotal(expenseArray.map((doc: Expense) => doc.amount || 0)),
						),
					);
					return sub;
				}
			));
			return result;
		}
	}, [expensesByDate, expensesByCategory, sortBy]);

	if (expensesByDate) {
	return (
		<div className="flex flex-col gap-4">
			<div className="w-full bg-zinc-400 bg-opacity-25 p-8 rounded-md flex justify-center">
				<H3>Monthly Total: &euro; {_formatCurrency(total || 0)}</H3>
			</div>
			<div id="expenses_list_table_container" className="w-full">
				{Array.from(expensesByDate).map(([key, val]) => {
					const total = _getTotal(val.map((doc: Expense) => doc.amount || 0));
					return (
						<table key={key} className="w-full border-collapse mb-4">
							<thead>
								<tr className="px-2">
									<th className="text-left pl-2">{key}</th>
									<th className="text-right pr-2">{_formatCurrency(total)}</th>
								</tr>
							</thead>
							<tbody className="bg-zinc-800">
								{val.map((doc: Expense, index: number) => (
									<tr key={key + "_" + index}>
										<td className="pl-8">
											<Link href={`/admin/collections/expenses/${doc.id}`}>
												<span className="font-bold">
													{sortBy === "category"
														? formatDateTime(doc.updatedAt)
														: doc.category}
												</span>
												<span> {(doc.tag as ExpenseTag)?.name}</span>
											</Link>
											<span className="text-zinc-400 italic text-xxs ml-2">
												{" "}
												{doc.comment}
											</span>
										</td>
										<td className="w-20 text-right pr-2">
											{_formatCurrency(doc.amount || 0)}
										</td>
									</tr>
								))}
							</tbody>
							<tfoot></tfoot>
						</table>
					);
				})}
			</div>
		</div>
		);
	}
	
	if (expensesByCategory) {
		let variableExpenditure: number = 0;
		let fixedExpenditure: number = 0;
		for (const category of Array.from(expensesByCategory.keys())) {
			if (category === "taxes" || category === "business") {
				for (const expenses of Array.from(expensesByCategory.get(category)?.values() || [])) {
					const total = _getTotal(expenses.map((doc: Expense) => doc.amount || 0));
					fixedExpenditure += total;
				}
			} else {
				for (const expenses of Array.from(expensesByCategory.get(category)?.values() || [])) {
					const total = _getTotal(expenses.map((doc: Expense) => doc.amount || 0));
					variableExpenditure += total;
				}
			}

			
		}
		const today = new Date();
		const dayOfMonth = today.getDate();
		const dailyExpenditure = (variableExpenditure / dayOfMonth);
		const now = new Date();
		// month is 0-indexed (Jan=0, Feb=1, etc.)
		// We get the next month and set the day to 0
		const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
		const projectedExpenditure = dailyExpenditure * daysInMonth;
		return (
			<div className="flex flex-col gap-4">
			<div className="w-full bg-zinc-400 bg-opacity-25 p-8 rounded-md flex flex-col items-center justify-center">
					<H3>Monthly Total: &euro; {_formatCurrency(total || 0)}</H3>
					<P>Variable: {_formatCurrency(variableExpenditure)} | Fixed: {_formatCurrency(fixedExpenditure)}</P>
					<P>Daily variable expenditure: {_formatCurrency(dailyExpenditure)}</P>
					<P>Projected variable expenditure: {_formatCurrency(projectedExpenditure)}</P>
					<P>Projected total expenditure: {_formatCurrency(projectedExpenditure + fixedExpenditure)}</P>
			</div>
			<div id="expenses_list_table_container" className="w-full">
					{
						Array.from(expensesByCategory).map(([key, val]) => {
						
						const rawTotal = _getTotal(Array.from(val).map((group) => {
							return _getTotal(group[1].map((doc: Expense) => doc.amount || 0));
						}
						));
							
							const total = roundToDecimal(rawTotal, 2);


						return (
							<table key={"categoryTable_" + key} className="w-full border-collapse">
								<thead className="w-full">
									<tr className="px-2 bg-red-500/20 text-lg">
										<th className="text-left pl-4 py-2">{capitalizeFirstLetter(key)}</th>
										<th className="text-right pr-4">{total}</th>
									</tr>
								</thead>
								<tbody className=" pl-4 w-full">

									{
										Array.from(val).map(([key2, val2]) => {
											return (
												<tr key={"tagGroup_" + key2} id={"tag-group-container_" + key2 } className="w-full">
													<td colSpan={2} className="w-full">
														<div className="w-full bg-opacity-50">
															<table className="border-collapse w-full" id={"tag-group-table_" + key2}>
																<thead>
																<tr className=" font-bold">
																	<th className="text-left pl-8">{key2}</th>
																	<th className="text-right pr-8">{ _formatCurrency( _getTotal(val2.map((doc: Expense) => doc.amount || 0)))}</th>
																</tr>
																</thead>
																<tbody className="bg-zinc-800">
																		{
																			val2.map((doc: Expense, index: number) => {
																				return (
																					<tr key={key2 + "_" + index} className="">
																						<td className="pl-12">
																							<Link href={`/admin/collections/expenses/${doc.id}`}>
																								<span className="font-bold">
																									{sortBy === "category"
																										? formatDateTime(doc.date)
																										: doc.category}
																								</span>
																							</Link>
																							<span className="text-zinc-400 italic text-xxs ml-2">
																								{" "}
																								{doc.comment}
																							</span>
																						</td>
																						<td className="text-right pr-8">
																							{_formatCurrency(doc.amount || 0)}
																						</td>
																					</tr>
																				)
																			})
																		}
																</tbody>

															</table>
														</div>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						)
				})}
			</div>
		</div>)
	}
	return null;
};

export default ExpensesListTable;

function _getTotal(vals: number[]): number {
	return vals.reduce((accumulator, currentVal) => accumulator + currentVal, 0);
}

function _formatCurrency(val: number): string {
	return (Math.round(val * 100) / 100).toFixed(2);
}

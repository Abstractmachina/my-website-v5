"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Centered from "@/components/ui/Centered";
import H1 from "@/components/styledComponents/H1";
import SummaryCard from "./SummaryCard";
import H2 from "@/components/styledComponents/H2";
import MonthViewer from "./MonthViewer";

/***
 * income metrics
 * total income
 * regular vs irregular income
 * income growth rate
 *
 * expense metrics
 * total expenses
 * projected expenses for period
 * expense growth rate
 * essential vs discretionary
 *
 * savings & cash flow
 * net savings
 * savings rate
 * cashlfow balance
 *
 */

type Props = {};

const EditDefaultViewController = (props: Props) => {
	const [selectedTab, setSelectedTab] = useState<string>("monthly");

	return (
		<Centered>
			<H1>Overview</H1>
			<Tabs
				value={selectedTab}
				className=""
				onValueChange={(value) => setSelectedTab(value)}
			>
				<TabsList className="w-full">
					<TabsTrigger value="monthly">Monthly</TabsTrigger>
					<TabsTrigger value="yearly">Yearly</TabsTrigger>
				</TabsList>
				<TabsContent value="monthly">
					<MonthViewer />
				</TabsContent>
				<TabsContent value="yearly">
					{/* {loading ? <span>... Loading ...</span> :
							<ExpensesListTable
								expensesByDate={sortedExpensesByDate}
								expensesByCategory={sortedExpensesByCategory}
								sortBy={"category"}
							/>
						} */}
					year
				</TabsContent>
			</Tabs>
		</Centered>
	);
};

export default EditDefaultViewController;

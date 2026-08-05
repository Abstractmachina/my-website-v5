"use client";

import React from "react";

import { ListViewServerProps } from "payload";

import ExpensesListController from "./ExpensesListController";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const ExpensesListLoader = (props: ListViewServerProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ExpensesListController />
      <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default ExpensesListLoader;


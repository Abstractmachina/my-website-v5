"use client";

import React from "react";
import type {
	DocumentViewServerProps,
} from "payload";
import EditDefaultViewController from "./EditDefaultViewController";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

// type Props = {
// }

const EditDefaultViewLoader = ({
	initPageResult,
	doc,
	params,
	searchParams,
	payload,
}: DocumentViewServerProps) => {


  return (
		<QueryClientProvider client={queryClient}>
      <EditDefaultViewController />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>)
};

export default EditDefaultViewLoader;

import { fetchExpenses } from "@/lib/serverFetchers/expensesFetchers";
import { fetchExpenseTags } from "@/lib/serverFetchers/expenseTagFetchers";
import { Expense, ExpenseTag } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";

export function useExpenseTagsQuery() {
  return useQuery<ExpenseTag[] | null>({
    queryKey: ['expensetags', "all"], queryFn: async () => {
      return fetchExpenseTags({ depth: 2 });
    }
  });
}
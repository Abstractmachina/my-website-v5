import { fetchExpenses } from "@/lib/serverFetchers/expensesFetchers";
import { Expense } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";

export function useExpensesQuery(year:number, month:number) {
  return useQuery<Expense[] | null>({
    queryKey: ['expenses', year.toString(), month.toString()], queryFn: async () => {
      return fetchExpenses({ year, month });
    }
  });
}
import { fetchIncome } from "@/lib/serverFetchers/incomeFetchers";
import { Income } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";

export function useIncomeQuery(year:number, month:number) {
  return useQuery<Income[] | null>({
    queryKey: ['income', year.toString(), month.toString()], queryFn: async () => {
      return fetchIncome({ year, month });
    }
  });
}
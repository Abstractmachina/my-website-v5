import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpenses } from "../serverActions/expenseActions";
import { Expense } from "@/payload-types";

export function useUpdateExpensesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {where: any, data: any}) => {
      const result = await updateExpenses(data.where, data.data);
      return result.docs as Expense[];
    },
    onSuccess: async () => {
      console.log("Expenses updated successfully.");
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["expenses"] });
      // queryClient.refetchQueries({ queryKey: ["users", "me"] });
    },
  });
}
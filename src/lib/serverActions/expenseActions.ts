"use server";

import { Expense } from "@/payload-types";
import { BulkOperationResult, getPayload, SelectType } from "payload";
import config from '@payload-config'

export async function createExpense(
  data: any
): Promise<Expense> {
  const payload = await getPayload({ config })

  try {
    const result = await payload.create({
      collection: 'expenses',
      data,
    })

    return result as Expense;
  } catch (error) {
    console.error("Error creating Expense:", error);
    throw new Error(`Failed to create Expense.`)
  }
}


export async function updateExpense(
  id: string,
  data: any
): Promise<Expense> {
  const payload = await getPayload({ config })

  try {

    const result = await payload.update({
      collection: 'expenses',
      id, // required
      data,
    })

    console.log("Updated Expense:", result);
    return result as Expense;
  } catch (error) {
    console.error("Error updating Expense:", error);
    throw new Error(`failed to update Expense.`);
  }
}

/***
 * Batch update multiple Expenses
 * 
 * 
 */
export async function updateExpenses(
  where: any,
  data: any
): Promise<BulkOperationResult<"expenses", SelectType>> {
  const payload = await getPayload({ config });

  try {
    
      const result = await payload.update({
        collection: 'expenses',
        where, // required
        data,
      });

    return result;
  } catch (error) {
    console.error("Error updating expenses: ",error);
    throw new Error(`Failed to update expenses.`);
  }
}
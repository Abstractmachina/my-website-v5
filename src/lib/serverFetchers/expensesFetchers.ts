"use server";

import { Expense, ExpenseTag } from '@/payload-types';
import qs from 'qs';

// const payload = await getPayload({ config });

export async function fetchExpenses(args: { year:number, month:number}) : Promise<Expense[] | null> {


  const { year, month } = args;
  	if (Number.isNaN(year) || Number.isNaN(month)) return null;


	const startISO = new Date(year, month, 1).toISOString();
	const endISO = new Date(year, month+1, 0).toISOString();
  const range = { greater_than_equal: startISO, less_than_equal: endISO }
  
  const query = {
      date: range,
    };

    const queryString = qs.stringify(
      {
        // sort: "-createdAt",
        where: query,
        // locale: locale ? locale : "en",
        depth: 3,
        limit: false,
        pagination:false,
      },
      { addQueryPrefix: true }
    );

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
    },
    // credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Error fetching expense tag: ${res.statusText}`);
  }
  const json = await res.json();

  return json["docs"] as Expense[];
}

// export async function _findByMonth(
// 	payload: Payload,
// 	collection: string,
// 	year: number,
// 	month: number,
// ): Promise<Expense[] | undefined> {
// 	if (Number.isNaN(year) || Number.isNaN(month)) return undefined;

// 	const startISO = new Date(year, month, 1).toISOString();
// 	const endISO = new Date(year, month + 1, 0).toISOString();
// 	const range = { greater_than_equal: startISO, less_than_equal: endISO };

// 	const result = await payload.find({
// 		collection,
// 		where: { date: range },
// 		sort: `-date`,
// 		pagination: false,
// 		depth: 2,
// 	});

// 	return result["docs"] as Expense[];
// }

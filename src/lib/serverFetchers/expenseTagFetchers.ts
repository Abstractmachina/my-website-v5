"use server";

import { ExpenseTag } from '@/payload-types';
import qs from 'qs';

// const payload = await getPayload({ config });

export async function fetchExpenseTag(id: string, depth?: number) : Promise<ExpenseTag> {

  // const query = {
    //   user: {
    //     equals: userID,
    //   },
  // };
  

    const queryString = qs.stringify(
      {
        // sort: "-createdAt",
        // where: query,
        // locale: locale ? locale : "en",
        depth: depth || 0,
      },
      { addQueryPrefix: true }
    );

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenseTags/${id}${queryString}`, {
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

  return json as ExpenseTag;
}

export async function fetchExpenseTags(args?:{depth?: number}) : Promise<ExpenseTag[] | null> {
  const { depth } = args || {};
    const queryString = qs.stringify(
      {
        // sort: "-createdAt",
        // where: query,
        // locale: locale ? locale : "en",
        depth: depth || 0,
        pagination: false,
      },
      { addQueryPrefix: true }
    );

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenseTags${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `users API-Key ${process.env.PAYLOAD_API_KEY}`,
    },
    // credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Error fetching expense tags: ${res.statusText}`);
  }
  const json = await res.json();

  return json["docs"] as ExpenseTag[];
}
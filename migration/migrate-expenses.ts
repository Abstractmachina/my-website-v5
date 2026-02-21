// 1. Load environment variables first!
import 'dotenv/config'; 

import { getPayload } from 'payload';
import config from '../src/payload.config'; // Adjust this path if your config is elsewhere
import fs from 'fs';

const run = async () => {
  // Initialize Payload connected to Postgres
  const payload = await getPayload({ config });

  // 2. Load the Tag Map we generated in the last step
  console.log('Loading tag map...');
  const mapData = fs.readFileSync('./migration/tag-map.json', 'utf-8');
  const tagIdMap = JSON.parse(mapData);

  // 3. Load the Expenses from Mongo
  console.log('Loading expenses backup...');
  const rawData = fs.readFileSync('./migration/expenses.json', 'utf-8');
  const expenses = JSON.parse(rawData);

  console.log(`Found ${expenses.length} expenses to migrate. Let's go!`);

  let successCount = 0;
  let failCount = 0;

  // 4. Loop and Insert
  for (const expense of expenses) {
    try {
      // Safely extract the old Mongo tag ID (handling MongoDB Extended JSON format)
      let oldTagId = null;
      if (expense.tag) {
        oldTagId = typeof expense.tag === 'object' && expense.tag.$oid ? expense.tag.$oid : expense.tag;
      }

      // Map it to the new Postgres ID
      const newTagId = oldTagId ? tagIdMap[oldTagId] : null;

      // Safely extract the Date (handling MongoDB Extended JSON format)
      let parsedDate = new Date().toISOString(); // Fallback
      if (expense.date) {
         parsedDate = typeof expense.date === 'object' && expense.date.$date ? expense.date.$date : expense.date;
      }

      // 5. Insert into Postgres using Payload's API
      await payload.create({
        collection: 'expenses',
        data: {
          amount: expense.amount,
          category: expense.category,
          tag: newTagId, // The newly mapped Postgres ID!
          comment: expense.comment || '', 
          date: parsedDate,
          recurring: expense.recurring || false,
        },
      });

      successCount++;
      console.log(`✅ Migrated: $${expense.amount} - ${expense.category}`);
    } catch (error) {
      failCount++;
      console.error(`❌ Failed to migrate expense ($${expense.amount}):`, error);
    }
  }

  console.log(`\n🎉 Expenses migration complete!`);
  console.log(`✅ Succeeded: ${successCount} | ❌ Failed: ${failCount}`);
  process.exit(0);
};

run();
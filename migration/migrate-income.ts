import 'dotenv/config';

import { getPayload } from 'payload';
import config from '../src/payload.config'; // Adjust path if needed
import fs from 'fs';

const run = async () => {
  const payload = await getPayload({ config });
  
  // 1. Read your exported tags
  const rawData = fs.readFileSync('./migration/incomes.json', 'utf-8');
  const incomes = JSON.parse(rawData);

  console.log(`Found ${incomes.length} incomes to migrate...`);

  // We will store the Old ID -> New ID mapping here
  const idMap: Record<string, string | number> = {};

  // 2. Loop and Insert
  for (const income of incomes) {
    try {
      // Get the old Mongo ID (handling the Extended JSON format)
      const oldId = income._id?.$oid || income._id;


      // Safely extract the Date (handling MongoDB Extended JSON format)
      let parsedDate = new Date().toISOString(); // Fallback
      if (income.date) {
         parsedDate = typeof income.date === 'object' && income.date.$date ? income.date.$date : income.date;
      }

      // Create the new tag in Postgres
      const newTag = await payload.create({
        collection: 'income',
        data: {
          amount: income.amount,
          description: income.description,
          date: parsedDate,
          recurring: income.recurring || false
        },
      });

      // Save the mapping!
      idMap[oldId] = newTag.id;
      
      console.log(`✅ Migrated Income: ${income.amount} ${income.description} (New ID: ${newTag.id})`);
    } catch (error) {
      console.error(`❌ Failed to migrate a tag:`, error);
    }
  }

  // 3. Save the map to a file so the Expenses script can use it
  fs.writeFileSync('./migration/income-map.json', JSON.stringify(idMap, null, 2));
  console.log('🎉 Income migration complete! Mapping saved to income-map.json');
  process.exit(0);
};

run();
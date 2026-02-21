import 'dotenv/config';

import { getPayload } from 'payload';
import config from '../src/payload.config'; // Adjust path if needed
import fs from 'fs';

const run = async () => {
  const payload = await getPayload({ config });
  
  // 1. Read your exported tags
  const rawData = fs.readFileSync('./migration/expensetags.json', 'utf-8');
  const tags = JSON.parse(rawData);

  console.log(`Found ${tags.length} tags to migrate...`);

  // We will store the Old ID -> New ID mapping here
  const idMap: Record<string, string | number> = {};

  // 2. Loop and Insert
  for (const tag of tags) {
    try {
      // Get the old Mongo ID (handling the Extended JSON format)
      const oldId = tag._id?.$oid || tag._id;

      // Create the new tag in Postgres
      const newTag = await payload.create({
        collection: 'expenseTags',
        data: {
          // Add your specific tag fields here based on your config
          // For example:
          name: tag.name,
          category: tag.category, 
        },
      });

      // Save the mapping!
      idMap[oldId] = newTag.id;
      
      console.log(`✅ Migrated tag: ${tag.name} (New ID: ${newTag.id})`);
    } catch (error) {
      console.error(`❌ Failed to migrate a tag:`, error);
    }
  }

  // 3. Save the map to a file so the Expenses script can use it
  fs.writeFileSync('./tag-map.json', JSON.stringify(idMap, null, 2));
  console.log('🎉 Tag migration complete! Mapping saved to tag-map.json');
  process.exit(0);
};

run();
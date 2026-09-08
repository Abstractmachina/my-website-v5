import 'dotenv/config';

import { getPayload } from 'payload';
import config from '../src/payload.config'; // Adjust path if needed
import fs from 'fs';

const run = async () => {
    const payload = await getPayload({ config });
  

  console.log('Starting bulk update...');

  // 2. Perform a bulk update
  const result = await payload.update({
    collection: 'expenseTags',
    where: {
      or: [
        {
          count: {
            exists: false,
          },
        },
        {
          count: {
            equals: null,
          },
        },
      ],
    },
    data: {
      count: 0,
    },
  });

  console.log(`Successfully updated ${result.docs.length} documents.`);
  process.exit(0);
};

run();
import { getPayload } from 'payload';
import config from '@payload-config';

/**
 * POST /api/verify-user
 *
 * Body: { "apiKey": string }
 * Responds with `true` if the key belongs to a user, otherwise `false`.
 */
export async function POST(request: Request): Promise<Response> {
  let apiKey: unknown;
  
  try {
    const json = await request.json();
    console.log("json", json);
    // ({ apiKey } = await request.json());
    ({ apiKey } = json);
  } catch {
    return Response.json(false);
  }

  if (typeof apiKey !== 'string' || apiKey.length === 0) {
    return Response.json(false);
  }

  const payload = await getPayload({ config });

  // Reuse Payload's API-key strategy so the lookup matches how the REST API authenticates.
  const headers = new Headers({ Authorization: `users API-Key ${apiKey}` });
  const { user } = await payload.auth({ headers });

  return Response.json(Boolean(user));
}

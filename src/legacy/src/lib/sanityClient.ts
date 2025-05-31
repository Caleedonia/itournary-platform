import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-05-01'; // Use a recent API version
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error('Missing Sanity project ID or dataset. Check your .env.local file.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: typeof document !== 'undefined', // server-side is statically generated, client-side uses CDN
  token: token, // Use token for authenticated requests if provided (e.g., for drafts)
  ignoreBrowserTokenWarning: true, // Suppress warning if token is used in browser, as it's a read-only token for public data
});

// Helper function to fetch data from Sanity
export async function fetchData(query, params = {}) {
  return sanityClient.fetch(query, params);
}


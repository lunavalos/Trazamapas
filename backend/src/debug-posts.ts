import { getPayload } from 'payload';
import config from './payload.config';

async function main() {
  try {
    console.log('Initializing payload...');
    const payload = await getPayload({ config });
    console.log('Finding posts...');
    const posts = await payload.find({
      collection: 'posts',
    });
    console.log('Posts count:', posts.docs.length);
    process.exit(0);
  } catch (err) {
    console.error('Error finding posts:', err);
    process.exit(1);
  }
}

main();

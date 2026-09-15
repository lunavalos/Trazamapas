import { getTrips, getTripCategories } from '@/lib/payload';
import HomeClient from '@/components/HomeClient';

export const revalidate = 3600; // Cache ISR

export default async function HomePage() {
  const [trips, categories] = await Promise.all([
    getTrips(),
    getTripCategories()
  ]);

  return <HomeClient trips={trips} categories={categories} />;
}
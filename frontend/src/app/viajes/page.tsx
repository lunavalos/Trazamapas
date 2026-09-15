import { Suspense } from 'react';
import { getTrips, getTripCategories } from '@/lib/payload';
import ViajesClient from '@/components/ViajesClient';

export const revalidate = 3600; // ISR, cache por 1 hora

export default async function ViajesPage() {
  const [trips, categories] = await Promise.all([
    getTrips(),
    getTripCategories(),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5f8]" />}>
      <ViajesClient trips={trips} initialCategories={categories} />
    </Suspense>
  );
}
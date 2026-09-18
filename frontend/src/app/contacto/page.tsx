import { getTripCategories, getTrips } from '@/lib/payload';
import ContactClient from './ContactClient';

export const revalidate = 3600;

export default async function ContactoPage() {
  const [categories, trips] = await Promise.all([
    getTripCategories(),
    getTrips()
  ]);
  
  return <ContactClient categories={categories} trips={trips} />;
}
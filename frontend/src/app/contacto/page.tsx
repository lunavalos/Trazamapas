import { getTripCategories } from '@/lib/payload';
import ContactClient from './ContactClient';

export const revalidate = 3600;

export default async function ContactoPage() {
  const categories = await getTripCategories();
  
  return <ContactClient categories={categories} />;
}
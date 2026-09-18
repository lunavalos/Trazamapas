export interface PayloadPost {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  publishedAt?: string;
  category?: {
    id: string | number;
    name?: string;
    title?: string;
    slug?: string;
  } | string | number;
  featuredImage?: {
    url?: string;
    filename?: string;
    alt?: string;
  } | string | number;
  author?: {
    name?: string;
  } | string | number;
}

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

export function getImageUrl(image: any): string {
  if (!image) return '/images/04_desfile_personajes_disneyland_california.webp';
  
  let rawUrl = typeof image === 'string' ? image : image?.url;
  
  if (image?.filename) {
    rawUrl = `/media/${image.filename}`;
  } else if (rawUrl && rawUrl.startsWith('/api/media/file/')) {
    rawUrl = rawUrl.replace('/api/media/file/', '/media/');
  }

  if (!rawUrl) return '/images/04_desfile_personajes_disneyland_california.webp';

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }

  return `${PAYLOAD_API_URL}${rawUrl}`;
}

export function getCategoryName(category: any): string {
  if (!category) return 'Consejos de Viaje';
  if (typeof category === 'string') return category;
  return category?.name || category?.title || 'Consejos de Viaje';
}

async function safeJsonFetch<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    return null;
  }
}

export async function getPosts(): Promise<PayloadPost[]> {
  const data = await safeJsonFetch<{ docs?: PayloadPost[] }>(
    `${PAYLOAD_API_URL}/api/posts?depth=2&sort=-publishedAt`,
    { cache: 'no-store' }
  );
  return data?.docs || [];
}

export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  // Search both draft and published posts so Live Preview in admin always finds the post
  const data = await safeJsonFetch<{ docs?: PayloadPost[] }>(
    `${PAYLOAD_API_URL}/api/posts?depth=2&where[slug][equals]=${slug}&limit=1&draft=true`,
    { cache: 'no-store' }
  );
  return data?.docs?.[0] || null;
}

export interface PayloadTripCategory {
  id: string | number;
  title: string;
  value: string;
  iconName?: string;
  image?: any;
}

export interface PayloadTrip {
  id: string | number;
  title: string;
  slug: string;
  location: string;
  duration: string;
  bestTime: string;
  shortDesc: string;
  longDesc?: any;
  features?: { feature: string; id?: string }[];
  featuredImage?: any;
  gallery?: any[];
  categories?: PayloadTripCategory[] | string[] | number[];
}

export async function getTrips(): Promise<PayloadTrip[]> {
  const data = await safeJsonFetch<{ docs?: PayloadTrip[] }>(
    `${PAYLOAD_API_URL}/api/trips?depth=2&limit=100`,
    { cache: 'no-store' }
  );
  return data?.docs || [];
}

export async function getTripBySlug(slug: string): Promise<PayloadTrip | null> {
  const data = await safeJsonFetch<{ docs?: PayloadTrip[] }>(
    `${PAYLOAD_API_URL}/api/trips?where[slug][equals]=${slug}&depth=2`,
    { cache: 'no-store' }
  );
  return data?.docs?.[0] || null;
}

export async function getTripCategories(): Promise<PayloadTripCategory[]> {
  const data = await safeJsonFetch<{ docs?: PayloadTripCategory[] }>(
    `${PAYLOAD_API_URL}/api/trip-categories?limit=100`,
    { next: { revalidate: 3600 } }
  );
  return data?.docs || [];
}
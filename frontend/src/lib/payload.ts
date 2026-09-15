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
  
  if (!rawUrl && image?.filename) {
    rawUrl = `/media/${image.filename}`;
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

export async function getPosts(): Promise<PayloadPost[]> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/posts?depth=2&sort=-publishedAt`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching posts from Payload CMS:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PayloadPost | null> {
  try {
    // Search both draft and published posts so Live Preview in admin always finds the post
    const res = await fetch(`${PAYLOAD_API_URL}/api/posts?depth=2&where[slug][equals]=${slug}&limit=1&draft=true`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error(`Error fetching post ${slug} from Payload CMS:`, error);
    return null;
  }
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
  categories?: PayloadTripCategory[] | string[] | number[];
}

export async function getTrips(): Promise<PayloadTrip[]> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/trips?depth=2&limit=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching trips:', error);
    return [];
  }
}

export async function getTripBySlug(slug: string): Promise<PayloadTrip | null> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/trips?where[slug][equals]=${slug}&depth=2`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching trip by slug:', error);
    return null;
  }
}

export async function getTripCategories(): Promise<PayloadTripCategory[]> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/trip-categories?limit=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching trip categories:', error);
    return [];
  }
}
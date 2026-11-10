import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from './payload.config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const backendRoot = path.resolve(dirname, '..');

interface TripImportItem {
  title: string;
  slug?: string;
  categories: string[];
  operator?: string;
  location: string;
  duration: string;
  bestTime: string;
  price?: string;
  airline?: string;
  termsAndConditions?: string;
  featuredImage: string;
  gallery?: string[];
  shortDesc: string;
  longDesc: string | string[];
  features: string[];
}

function formatSlug(val: string): string {
  return val
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function toLexicalRichText(input: string | string[]) {
  const paragraphs = Array.isArray(input)
    ? input.filter((p) => p && p.trim().length > 0)
    : input
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: null,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: null,
        textStyle: '',
        textFormat: 0,
        children: [
          {
            mode: 'normal',
            text,
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          },
        ],
      })),
    },
  };
}

async function resolveMediaId(payload: any, imageRef: string, altText: string): Promise<number> {
  const baseName = path.basename(imageRef);

  const existing = await payload.find({
    collection: 'media',
    where: {
      filename: {
        equals: baseName,
      },
    },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    return Number(existing.docs[0].id);
  }

  const candidatePaths = [
    path.isAbsolute(imageRef) ? imageRef : path.resolve(backendRoot, imageRef),
    path.resolve(backendRoot, 'import-media', baseName),
    path.resolve(backendRoot, 'public/media', baseName),
  ];

  const foundPath = candidatePaths.find((p) => fs.existsSync(p));
  if (!foundPath) {
    throw new Error(
      `No se encontró la imagen "${imageRef}". Colócala en "backend/import-media/" o "backend/public/media/" antes de importar.`
    );
  }

  const tmpDir = path.resolve(backendRoot, '.tmp-import');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  const tmpFilePath = path.resolve(tmpDir, baseName);
  fs.copyFileSync(foundPath, tmpFilePath);

  try {
    const createdMedia = await payload.create({
      collection: 'media',
      data: {
        alt: altText,
      },
      filePath: tmpFilePath,
    });
    return Number(createdMedia.id);
  } finally {
    if (fs.existsSync(tmpFilePath)) {
      fs.unlinkSync(tmpFilePath);
    }
  }
}

async function resolveCategoryIds(payload: any, categories: string[]): Promise<number[]> {
  const ids: number[] = [];

  for (const catRef of categories) {
    const slugRef = formatSlug(catRef);
    const found = await payload.find({
      collection: 'trip-categories',
      where: {
        or: [
          { value: { equals: slugRef } },
          { value: { equals: catRef } },
          { title: { equals: catRef } },
        ],
      },
      limit: 1,
    });

    if (found.docs.length > 0) {
      ids.push(Number(found.docs[0].id));
    } else {
      throw new Error(
        `No se encontró la categoría "${catRef}". Verifica que exista en Categorías de Viaje en Payload.`
      );
    }
  }

  return ids;
}

async function resolveOperatorId(payload: any, operatorRef?: string): Promise<number | null> {
  if (!operatorRef || !operatorRef.trim()) return null;

  const slugRef = formatSlug(operatorRef);
  const found = await payload.find({
    collection: 'trip-operators',
    where: {
      or: [
        { value: { equals: slugRef } },
        { value: { equals: operatorRef } },
        { title: { equals: operatorRef } },
      ],
    },
    limit: 1,
  });

  if (found.docs.length > 0) {
    return Number(found.docs[0].id);
  }

  // Si no existe aún en la colección trip-operators, lo creamos automáticamente
  const created = await payload.create({
    collection: 'trip-operators',
    data: {
      title: operatorRef,
      value: slugRef,
    },
  });
  return Number(created.id);
}

async function main() {
  const inputArg = process.argv[2] || 'trips-import.json';
  const jsonPath = path.isAbsolute(inputArg) ? inputArg : path.resolve(backendRoot, inputArg);

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ No se encontró el archivo: ${jsonPath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(jsonPath, 'utf-8');
  const items: TripImportItem[] = JSON.parse(rawContent);

  console.log(`🚀 Inicializando Payload para importar ${items.length} viaje(s)...`);
  const payload = await getPayload({ config });

  let createdCount = 0;
  let updatedCount = 0;

  for (const item of items) {
    const slug = item.slug ? formatSlug(item.slug) : formatSlug(item.title);
    console.log(`\n➡️  Procesando: "${item.title}" (slug: ${slug})...`);

    const categoryIds = await resolveCategoryIds(payload, item.categories);
    const operatorId = await resolveOperatorId(payload, item.operator);
    const featuredImageId = await resolveMediaId(payload, item.featuredImage, item.title);

    const galleryIds: number[] = [];
    if (item.gallery && item.gallery.length > 0) {
      for (const galleryImg of item.gallery) {
        const gId = await resolveMediaId(payload, galleryImg, item.title);
        galleryIds.push(gId);
      }
    }

    const tripData: any = {
      title: item.title,
      slug,
      categories: categoryIds,
      ...(operatorId ? { operator: operatorId } : {}),
      location: item.location,
      duration: item.duration,
      bestTime: item.bestTime,
      ...(item.price !== undefined ? { price: item.price } : {}),
      ...(item.airline !== undefined ? { airline: item.airline } : {}),
      ...(item.termsAndConditions !== undefined ? { termsAndConditions: item.termsAndConditions } : {}),
      featuredImage: featuredImageId,
      gallery: galleryIds,
      shortDesc: item.shortDesc,
      longDesc: toLexicalRichText(item.longDesc),
      features: (item.features || []).map((f) => ({ feature: f })),
    };

    const existingTrip = await payload.find({
      collection: 'trips',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });

    if (existingTrip.docs.length > 0) {
      await payload.update({
        collection: 'trips',
        id: existingTrip.docs[0].id,
        data: tripData,
      });
      updatedCount++;
      console.log(`   ✅ Actualizado (ID: ${existingTrip.docs[0].id})`);
    } else {
      const created = await payload.create({
        collection: 'trips',
        data: tripData,
      });
      createdCount++;
      console.log(`   ✅ Creado (ID: ${created.id})`);
    }
  }

  console.log(`\n🎉 Importación finalizada: ${createdCount} creados, ${updatedCount} actualizados.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Error durante la importación:', err);
  process.exit(1);
});

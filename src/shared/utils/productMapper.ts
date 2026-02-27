import type { ProductType } from '../entity/product';

type RawProduct = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  productCategory: { id: number; documentId: string; title: string };
  images: { id: number; url: string }[];
  price: number;
  discountPercent: number;
  rating: number;
};

export const mapRawToProduct = (raw: RawProduct): ProductType => ({
  id: raw.id,
  documentId: raw.documentId,
  title: raw.title,
  description: raw.description,
  category: {
    id: raw.productCategory.id,
    documentId: raw.productCategory.documentId,
    title: raw.productCategory.title,
  },
  images: raw.images.map((image) => ({
    id: image.id,
    url: image.url,
  })),
  price: raw.price,
  discountPercent: raw.discountPercent,
  rating: raw.rating,
});

export const mapRawProductsToList = (raws: RawProduct[]): ProductType[] =>
  raws.map(mapRawToProduct);

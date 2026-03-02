export type ProductType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  category: ProductCategory;
  images: ProductImages[];
  price: number;
  discountPercent: number;
  rating: number;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
  isInStock: boolean;
};

export type ProductCategory = {
  id: number;
  documentId: string;
  title: string;
};

export type ProductImages = {
  id: number;
  url: string;
};

import type { Option } from '@/App/pages/Products/components/MultiDropdown';
import type { ProductCategory } from '../entity/product';

type RawCategory = {
  id: number;
  documentId: string;
  title: string;
};

export const mapRawToCategory = (raw: RawCategory): ProductCategory => ({
  id: raw.id,
  documentId: raw.documentId,
  title: raw.title,
});

export const mapRawCategoryToList = (raws: RawCategory[]): ProductCategory[] =>
  raws.map(mapRawToCategory);

export const mapCategoryToOption = (raws: ProductCategory[]): Option[] =>
  raws.map((raw) => ({
    key: String(raw.id),
    value: raw.title,
  }));

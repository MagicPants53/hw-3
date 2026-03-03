import { paths } from './paths';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL не задана в .env');
}

export const apiUrls = {
  products: (query?: string) =>
    query ? `${API_BASE_URL}${paths.products}?${query}` : `${API_BASE_URL}${paths.products}`,
  product: (documentId: string, query?: string) =>
    query
      ? `${API_BASE_URL}${paths.products}/${documentId}?${query}`
      : `${API_BASE_URL}${paths.products}/${documentId}`,
  productCategories: () => `${API_BASE_URL}${paths.productCategories}`,
  auth: {
    login: `${API_BASE_URL}${paths.login}`,
    register: `${API_BASE_URL}${paths.register}`,
  },
  cart: {
    list: `${API_BASE_URL}${paths.cart}`,
    add: `${API_BASE_URL}${paths.cart}/add`,
    remove: `${API_BASE_URL}${paths.cart}/remove`,
  },
} as const;

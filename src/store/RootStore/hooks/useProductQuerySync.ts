import { useSearchParams } from 'react-router';
import { runInAction } from 'mobx';

import type ProductStore from '@/store/ProductStore';

export const useProductQuerySync = (productStore: ProductStore) => {
  const [_searchParams, setSearchParams] = useSearchParams();

  const updateUrl = () => {
    runInAction(() => {
      const userParams: any = {
        page: productStore.currentPage,
        limit: productStore.pageSize,
      };

      if (productStore.searchTerm) {
        userParams.search = productStore.searchTerm;
      }

      if (productStore.selectedCategoryTitles.length > 0) {
        userParams.categories = productStore.selectedCategoryTitles.join('\,');
      }

      const queryString = new URLSearchParams(userParams).toString();
      setSearchParams(queryString);
    });
  };

  return { updateUrl };
};

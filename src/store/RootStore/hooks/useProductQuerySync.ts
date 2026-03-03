import { useSearchParams } from 'react-router';
import { runInAction } from 'mobx';

import type { UserParams } from '@/shared/entity/userParams';

import type ProductStore from '@/store/ProductStore';

export const useProductQuerySync = (productStore: ProductStore) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateUrl = () => {
    runInAction(() => {
      const userParams: UserParams = {
        page: String(productStore.currentPage),
        limit: String(productStore.pageSize),
      };

      if (productStore.searchTerm) {
        userParams.search = productStore.searchTerm;
      }

      if (productStore.selectedCategoryTitles.length > 0) {
        userParams.categories = productStore.selectedCategoryTitles.join(',');
      }

      const queryString = new URLSearchParams(userParams).toString();
      setSearchParams(queryString);
    });
  };

  return { updateUrl, searchParams };
};

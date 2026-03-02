import { useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { runInAction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/Input';
import Card from './components/Card';
import Pangination from './components/Pangination';
import MultiDropdown, { type Option } from './components/MultiDropdown';

import { paths } from '@/config/paths';
import { mapCategoryToOption } from '@/shared/utils/categoryMapper';
import { Meta } from '@/shared/utils/meta';

import ProductStore from '@/store/ProductStore';
import { useProductQuerySync } from '@/store/RootStore/hooks/useProductQuerySync';

import styles from './Products.module.scss';

const Products = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const productStore = useLocalObservable(() => new ProductStore());
  const { updateUrl } = useProductQuerySync(productStore);

  useEffect(() => {
    const loadData = async () => {
      await productStore.getProductsCategories();

      const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
      const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 9;
      const search = searchParams.get('search') || '';
      const categoryTitles = searchParams.get('categories')
        ? searchParams.get('categories')!.split(',')
        : [];

      runInAction(() => {
        productStore['_currentPage'] = page;
        productStore['_pageSize'] = limit;
        productStore['_searchTerm'] = search;

        if (categoryTitles.length > 0) {
          const categoryIds = categoryTitles
            .map((title) => productStore.categoryList.find((cat) => cat.title === title))
            .filter(Boolean)
            .map((cat) => cat!.id);
          productStore['_selectedCategoryIds'] = categoryIds;
        }
      });

      productStore.getProducts();
    };

    loadData();
  }, [searchParams, productStore]);

  const handleSearch = (value: string) => {
    productStore.setSearchTerm(value);
    updateUrl();
  };

  const handlePageChange = (page: number) => {
    productStore.setCurrentPage(page);
    updateUrl();
  };

  const handleCategoriesChange = (selectedOptions: Option[]) => {
    const categoryIds = selectedOptions.map((option) => Number(option.key));
    productStore.setCategories(categoryIds);
    updateUrl();
  };

  const getCategoryTitle = useCallback((selectedOptions: Option[]): string => {
    if (selectedOptions.length === 0) {
      return 'All categories';
    }

    if (selectedOptions.length === 1) {
      return selectedOptions[0].value;
    }

    return selectedOptions.map((option) => option.value).join(', ');
  }, []);

  const clearFilters = () => {
    productStore.clearCategories();
    productStore.setSearchTerm('');
    _setSearchParams({ page: '1', limit: '9' });
  };

  const selectedCategories: Option[] = mapCategoryToOption(
    productStore.categoryList.filter((cat) => productStore.selectedCategoryIds.includes(cat.id))
  );

  const pageCount = Math.ceil(productStore.amount / productStore.pageSize);

  return (
    <>
      <div className={styles.subinfo}>
        <Text view="title">Products</Text>
        <Text view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old
          products please enter the name of the item
        </Text>
      </div>
      <div className={styles.controls}>
        <Input
          value={productStore.searchTerm}
          onChange={(value) => handleSearch(value)}
          placeholder="Search product..."
        />
        <MultiDropdown
          options={mapCategoryToOption(productStore.categoryList)}
          value={selectedCategories}
          onChange={handleCategoriesChange}
          getTitle={getCategoryTitle}
          disabled={productStore.categoryMeta !== Meta.success}
          className={styles.categoryFilter}
        />
        {productStore.hasSelectedCategories && (
          <Button onClick={clearFilters} className={styles.clearButton}>
            Очистить
          </Button>
        )}
      </div>

      <div className={styles.total}>
        <Text view="subtitle">Total products</Text>
        <Text view="p-20" color="accent" weight="bold">
          {productStore.amount}
        </Text>
      </div>
      <div className={styles.product_list}>
        {productStore.meta === Meta.loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} image={''} title={''} subtitle={''} loading />
          ))}
        {productStore.products.map((product) => (
          <Link to={`${paths.products}/${product.documentId}`} key={product.id}>
            <Card
              key={product.id}
              image={product.images[0].url}
              captionSlot={product.category.title}
              title={product.title}
              subtitle={product.description}
              contentSlot={'$' + product.price}
              actionSlot={<Button>Add to Cart</Button>}
            />
          </Link>
        ))}
      </div>
      {productStore.meta === Meta.success && pageCount > 1 && (
        <Pangination pageCount={pageCount} onChangePage={(page) => handlePageChange(page)} />
      )}
    </>
  );
};

export default observer(Products);

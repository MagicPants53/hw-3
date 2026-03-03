import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { runInAction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';

import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/Input';
import Card from './components/Card';
import Pangination from './components/Pagination';
import MultiDropdown, { type Option } from './components/MultiDropdown';

import { paths } from '@/config/paths';
import { mapCategoryToOption } from '@/shared/utils/categoryMapper';
import { Meta } from '@/shared/utils/meta';
import type { ProductType } from '@/shared/entity/product';

import ProductStore from '@/store/ProductStore';
import { useCart } from '@/store/RootStore/hooks/useCart';
import { useProductQuerySync } from '@/store/RootStore/hooks/useProductQuerySync';

import styles from './Products.module.scss';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productStore = useLocalObservable(() => new ProductStore());
  const { updateUrl } = useProductQuerySync(productStore);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadData = async () => {
      await productStore.getProductsCategories();

      const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
      const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 9;
      const search = searchParams.get('search') || '';
      const categories = searchParams.get('categories');
      const categoryTitles = categories !== null ? categories.split(',') : [];

      runInAction(() => {
        productStore['_currentPage'] = page;
        productStore['_pageSize'] = limit;
        productStore['_searchTerm'] = search;

        if (categoryTitles.length > 0) {
          const categoryIds = categoryTitles.map((title) =>
            productStore.categoryList.find((cat) => cat.title === title)
          );
          productStore['_selectedCategoryIds'] = categoryIds
            .filter((cat) => cat !== undefined)
            .map((cat) => cat.id);
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

  const handleAddToCart = (product: ProductType) => (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getCategoryTitle = useCallback((selectedOptions: Option[]): string => {
    if (selectedOptions.length === 0) {
      return 'All categories';
    }

    if (selectedOptions.length === 1) {
      return selectedOptions[0].value;
    }
    if (selectedOptions.length === 2) {
      return selectedOptions
        .slice(0, 2)
        .map((option) => option.value)
        .join(', ');
    } else {
      return selectedOptions
        .slice(0, 2)
        .map((option) => option.value)
        .join(', ')
        .concat(` (+${selectedOptions.length - 2})`);
    }
  }, []);

  const clearFilters = () => {
    productStore.clearCategories();
    productStore.setSearchTerm('');
    setSearchParams({ page: '1', limit: '9' });
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
          <Card
            key={product.id}
            image={product.images[0].url}
            captionSlot={product.category.title}
            title={product.title}
            subtitle={product.description}
            contentSlot={'$' + product.price}
            actionSlot={<Button onClick={handleAddToCart(product)}>Add to Cart</Button>}
            onClick={() => navigate(`${paths.products}/${product.documentId}`)}
          />
        ))}
      </div>
      {productStore.meta === Meta.success && pageCount > 1 && (
        <Pangination
          pageCount={pageCount}
          selectedPage={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
          onChangePage={(page) => handlePageChange(page)}
        />
      )}
    </>
  );
};

export default observer(Products);

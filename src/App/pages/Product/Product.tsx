import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import Loader from '@/components/Loader';
import Text from '@/components/Text';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';

import { paths } from '@/config/paths';
import { apiUrls } from '@/config/apiUrls';
import type { ProductType } from '@/shared/entity/product';
import { mapRawToProduct } from '@/shared/utils/productMapper';

import styles from './Product.module.scss';
import ProductInfo from './component/ProductInfo';

const Product = () => {
  const { documentId } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (documentId === '' || !documentId) return;
    const query = qs.stringify({
      populate: ['images', 'productCategory'],
    });

    const fetch = async () => {
      try {
        const result = await axios({
          method: 'GET',
          url: apiUrls.product(documentId, query),
        });

        setProduct(mapRawToProduct(result.data.data));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setProduct(undefined);

        throw error;
      }
    };

    fetch();
  }, [documentId]);

  if (!product && !isLoading)
    return (
      <div className={styles.error}>
        <Text view="title">Товар не найден</Text>
      </div>
    );
  if (isLoading) return <Loader size="l" />;

  return (
    <div className={styles.product}>
      <div className={styles.back_link}>
        <Link to={paths.products}>
          <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
          <Text view="p-20">Назад</Text>
        </Link>
      </div>
      <ProductInfo product={product} />
    </div>
  );
};
export default Product;

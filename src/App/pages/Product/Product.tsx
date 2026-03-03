import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import Loader from '@/components/Loader';
import Text from '@/components/Text';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import ProductInfo from './component/ProductInfo';

import { paths } from '@/config/paths';
import { apiUrls } from '@/config/apiUrls';

import type { ProductType } from '@/shared/entity/product';
import { mapRawToProduct } from '@/shared/utils/productMapper';
import { Meta } from '@/shared/utils/meta';

import styles from './Product.module.scss';

const Product = () => {
  const { documentId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [meta, setMeta] = useState<Meta>(Meta.initial as Meta);

  useEffect(() => {
    if (!documentId) {
      setMeta(Meta.error as Meta);
      return;
    }

    const fetch = async () => {
      setMeta(Meta.loading as Meta);
      try {
        const query = qs.stringify({
          populate: ['images', 'productCategory'],
        });

        const result = await axios({
          method: 'GET',
          url: apiUrls.product(documentId, query),
        });

        setProduct(mapRawToProduct(result.data.data));
        setMeta(Meta.success as Meta);
      } catch {
        setMeta(Meta.error as Meta);
        setProduct(null);
      }
    };

    fetch();
  }, [documentId]);

  if (meta === Meta.loading)
    return (
      <div className={styles.loader}>
        <Loader size="xl" />
      </div>
    );

  if (meta === Meta.error || !product)
    return (
      <div className={styles.error}>
        <Text view="title">Товар не найден</Text>
      </div>
    );

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

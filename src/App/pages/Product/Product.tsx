import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import type { ProductType } from '../Products';
import Loader from '@/components/Loader';
import Text from '@/components/Text';

import styles from './Product.module.scss';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import Slider from './component/Slider';
import Button from '@/components/Button';

const Product = () => {
  const { documentId } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (documentId === '') return;
    const query = qs.stringify({
      populate: ['images', 'productCategory'],
    });

    const fetch = async () => {
      try {
        const result = await axios({
          method: 'GET',
          url: `https://front-school-strapi.ktsdev.ru/api/products/${documentId}?${query}`,
        });

        setProduct({
          id: result.data.data.id,
          documentId: result.data.data.documentId,
          title: result.data.data.title,
          description: result.data.data.description,
          category: {
            id: result.data.data.productCategory.id,
            documentId: result.data.data.productCategory.documentId,
            title: result.data.data.productCategory.title,
          },
          images: result.data.data.images.map((image: { id: number; url: string }) => ({
            id: image.id,
            url: image.url,
          })),
          price: result.data.data.price,
          discountPercent: result.data.data.discountPercent,
          rating: result.data.data.rating,
        });
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
        <Link to="/products">
          <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
          <Text view="p-20">Назад</Text>
        </Link>
      </div>
      <div className={styles.content}>
        <Slider imgPaths={product?.images.map((img) => img.url)} />
        <div className={styles.info}>
          <Text view="title">{product?.title}</Text>
          <Text view="p-20" color="secondary">
            {product?.description}
          </Text>
          <Text view="title">${Number(product?.price).toFixed(2)}</Text>
          <div className={styles.btns}>
            <Button>Buy Now</Button>
            <Button className={styles.cart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;

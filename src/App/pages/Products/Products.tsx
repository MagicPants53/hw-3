import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import Button from 'components/Button';
import Card from './components/Card';
import Text from 'components/Text';

import { paths } from '@/config/paths';
import { apiUrls } from '@/config/apiUrls';
import type { ProductType } from '@/shared/entity/product';
import { mapRawProductsToList } from '@/shared/utils/productMapper';

import styles from './Products.module.scss';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const query = qs.stringify({
      populate: ['images', 'productCategory'],
    });

    const fetch = async () => {
      const result = await axios({
        method: 'GET',
        url: apiUrls.products(query),
      });

      setAmount(result.data.meta.pagination.total);

      setProducts(mapRawProductsToList(result.data.data));
    };
    fetch();
  }, []);

  return (
    <>
      <div className={styles.subinfo}>
        <Text view="title">Products</Text>
        <Text view="p-20" color="secondary">
          We display products based on the latest products we have, if you want to see our old
          products please enter the name of the item
        </Text>
      </div>
      <div className={styles.total}>
        <Text view="subtitle">Total products</Text>
        <Text view="p-20" color="accent" weight="bold">
          {amount}
        </Text>
      </div>
      <div className={styles.product_list}>
        {products.map((product) => (
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
    </>
  );
};

export default Products;

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import qs from 'qs';

import Button from 'components/Button';
import Card from './components/Card';
import Text from 'components/Text';

import styles from './Products.module.scss';

export type ProductType = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  category: ProductCategory;
  images: ProductImages[];
  price: number;
  discountPercent: number;
  rating: number;
};

type ProductCategory = {
  id: number;
  documentId: string;
  title: string;
};

type ProductImages = {
  id: number;
  url: string;
};

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
        url: `https://front-school-strapi.ktsdev.ru/api/products?${query}`,
      });

      setAmount(result.data.meta.pagination.total);

      setProducts(
        result.data.data.map(
          (raw: {
            id: number;
            documentId: string;
            title: string;
            description: string;
            productCategory: { id: number; documentId: string; title: string };
            images: { id: number; url: string }[];
            price: number;
            discountPercent: number;
            rating: number;
          }) => ({
            id: raw.id,
            documentId: raw.documentId,
            title: raw.title,
            description: raw.description,
            category: {
              id: raw.productCategory.id,
              documentId: raw.productCategory.documentId,
              title: raw.productCategory.title,
            },
            images: raw.images.map((image: { id: number; url: string }) => ({
              id: image.id,
              url: image.url,
            })),
            price: raw.price,
            discountPercent: raw.discountPercent,
            rating: raw.rating,
          })
        )
      );
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
          <Link to={`/products/${product.documentId}`} key={product.id}>
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

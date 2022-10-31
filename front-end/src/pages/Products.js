import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getProducts } from '../API/instance';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const allProducts = async () => {
      const produtos = await getProducts();
      console.log(produtos);
      return setProducts(produtos);
    };
    allProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {
        products.map((product) => (
          <div
            key={ product.id }
          >
            <p>{ product.name }</p>
          </div>
        ))
      }
    </div>
  );
}

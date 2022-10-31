import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getProducts } from '../API/instance';

export default function Products() {
  const [products, setProducts] = useState([]);

  const adicionaItem = (id) => {
    console.log(id);
    const grupo21 = products.map((product) => {
      if (product.id - 1 === id) {
        let { quantity } = product;
        quantity += 1;
        return { ...product, quantity };
      }
      return product;
    });
    console.log(grupo21);
    setProducts(grupo21);
  };

  useEffect(() => {
    const allProducts = async () => {
      const produtos = await getProducts();
      const g21 = produtos.map((prod) => ({ ...prod, quantity: 0 }));
      console.log(g21);
      return setProducts(g21);
    };
    allProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {
        products.map((product) => (
          <fieldset
            data-testid={ `customer_products__element-card-price-${product.id}` }
            key={ product.id }
          >
            <p>{ product.name }</p>
            <p>{ product.price }</p>
            <img src={ product.url_image } alt={ product.name } />
            <button
              type="button"
              onClick={ () => adicionaItem(product.id) }
            >
              Adicionar
            </button>
            <button
              type="button"
              onClick={ () => console.log('remover') }
            >
              Remover

            </button>

          </fieldset>
        ))
      }
    </div>
  );
}

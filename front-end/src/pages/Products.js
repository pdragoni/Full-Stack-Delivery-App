import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getProducts } from '../API/instance';

export default function Products() {
  const [products, setProducts] = useState([]);

  const handleQuantity = (id, param) => {
    // console.log(id, param);
    const grupo21 = products.map((product) => {
      if (product.id === id) {
        let { quantity } = product;

        if (param) quantity += 1;
        if (!param && quantity > 0) quantity -= 1;

        return { ...product, quantity };
      }
      return product;
    });
    // console.log(grupo21);
    setProducts(grupo21);
  };

  useEffect(() => {
    const allProducts = async () => {
      const produtos = await getProducts();
      const g21 = produtos.map((prod) => ({ ...prod, quantity: 0 }));
      // console.log(g21);
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
            <br />
            <button
              type="button"
              onClick={ () => handleQuantity(product.id, true) }
            >
              Adicionar
            </button>
            <br />
            <button
              type="button"
              onClick={ () => handleQuantity(product.id, false) }
            >
              Remover
            </button>
            <br />
            <span type="number" placeholder="0">{ product.quantity }</span>
          </fieldset>
        ))
      }
    </div>
  );
}

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
            key={ product.id }
          >
            <p
              data-testid={ `customer_products__element-card-title-${product.id}` }
            >
              { product.name }
            </p>
            <p
              data-testid={ `customer_products__element-card-price-${product.id}` }
            >
              { product.price }

            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
            />
            <br />
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              onClick={ () => handleQuantity(product.id, true) }
            >
              Adicionar
            </button>
            <br />
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              onClick={ () => handleQuantity(product.id, false) }
            >
              Remover
            </button>
            <br />
            <input
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              type="number"
              placeholder="0"
              value={ product.quantity }
            />
          </fieldset>
        ))
      }
      <span data-testid="checkout-bottom-value">Valor Total</span>
    </div>
  );
}

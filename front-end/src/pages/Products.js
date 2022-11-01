import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProducts } from '../API/instance';
import { setLocalStorage } from '../helpers/localStorage';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleQuantity = (id, param) => {
    const updated = products.map((product) => {
      if (product.id === id) {
        let { quantity } = product;

        if (param) quantity += 1;
        if (!param && quantity > 0) quantity -= 1;

        return { ...product, quantity };
      }
      return product;
    });

    setProducts(updated);
  };

  useEffect(() => {
    const allProducts = async () => {
      const produtos = await getProducts();
      const mappedProducts = produtos.map((prod) => ({ ...prod, quantity: 0 }));
      return setProducts(mappedProducts);
    };
    allProducts();
  }, []);

  useEffect(() => {
    const total = products.reduce((acc, curr) => {
      const { price, quantity } = curr;
      return acc + (price * quantity);
    }, 0);
    setTotalPrice(total);
    setLocalStorage('carrinho', total);
  }, [products]);

  return (
    <div>
      <Navbar />
      {
        products.map((product) => (
          <fieldset key={ product.id }>
            <p data-testid={ `customer_products__element-card-title-${product.id}` }>
              { product.name }
            </p>
            <p data-testid={ `customer_products__element-card-price-${product.id}` }>
              { product.price.replace('.', ',') }
            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${product.id}` }
              src={ product.url_image }
              alt={ product.name }
              width="150px"
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
              value={ product.quantity }
            />
          </fieldset>
        ))
      }
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ totalPrice === 0 }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          { totalPrice.toFixed(2).replace('.', ',') }
        </span>
      </button>
    </div>
  );
}

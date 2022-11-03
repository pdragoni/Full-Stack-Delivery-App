import { React, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProducts } from '../API/instance';
import { setLocalStorage, getLocalStorage } from '../helpers/localStorage';
import { calculateTotalPrice } from '../helpers/utils';
import Context from '../API/Context';

export default function Products() {
  const { setCart } = useContext(Context);

  const [products, setProducts] = useState([]);
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
    const userCart = updated.filter((product) => product.quantity > 0);
    setLocalStorage('carrinho', userCart);
    setProducts(updated);
  };

  const setProdQuantity = (value, productId) => {
    const updated = products.map((prod) => {
      if (prod.id === productId) {
        prod.quantity = value;
      }
      return prod;
    });
    const userCart = updated.filter((product) => product.quantity > 0);
    setLocalStorage('carrinho', userCart);
    setProducts(updated);
  };

  const goToCheckout = () => {
    setCart(getLocalStorage('carrinho'));
    navigate('/customer/checkout');
  };

  useEffect(() => {
    const allProducts = async () => {
      const produtos = await getProducts();
      const mappedProducts = produtos.map((prod) => ({ ...prod, quantity: 0 }));
      return setProducts(mappedProducts);
    };
    allProducts();
  }, []);

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
              onChange={ ({ target }) => setProdQuantity(target.value, product.id) }
              value={ product.quantity }
            />
          </fieldset>
        ))
      }
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => goToCheckout() }
        disabled={ calculateTotalPrice(products) === '0,00' }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          { calculateTotalPrice(products) }
        </span>
      </button>
    </div>
  );
}

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
      <div className="products-field">
        {
          products.map((product) => (
            <fieldset className="product" key={ product.id }>
              <h4 data-testid={ `customer_products__element-card-price-${product.id}` }>
                R$
                { product.price.replace('.', ',') }
              </h4>
              <img
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
                width="100px"
              />
              <br />
              <h5 data-testid={ `customer_products__element-card-title-${product.id}` }>
                { product.name }
              </h5>
              <div className="product-input-buttons">
                <button
                  className="input-buttons"
                  type="button"
                  data-testid={ `customer_products__button-card-add-item-${product.id}` }
                  onClick={ () => handleQuantity(product.id, true) }
                >
                  +
                </button>
                <input
                  className="product-input"
                  data-testid={ `customer_products__input-card-quantity-${product.id}` }
                  type="number"
                  onChange={ ({ target }) => setProdQuantity(target.value, product.id) }
                  value={ product.quantity }
                />
                <button
                  className="input-buttons"
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                  onClick={ () => handleQuantity(product.id, false) }
                >
                  -
                </button>
              </div>
            </fieldset>
          ))
        }
      </div>
      <div className="footer">
        <button
          className="nav-button products-total-value"
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => goToCheckout() }
          disabled={ calculateTotalPrice(products) === '0,00' }
        >
          <span
            className="footer-value"
            data-testid="customer_products__checkout-bottom-value"
          >
            Valor do Carrinho: R$
            { calculateTotalPrice(products) }
          </span>
        </button>
      </div>
    </div>
  );
}

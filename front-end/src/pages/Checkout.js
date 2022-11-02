import { React, useContext, useEffect, useState } from 'react';
import Context from '../API/Context';
import Navbar from '../components/Navbar';
import { setLocalStorage } from '../helpers/localStorage';

export default function Checkout() {
  const { cart, setCart } = useContext(Context);
  const [atual, setAtual] = useState(cart);
  const [isDisable, setIsDisable] = useState(false);

  const removeItem = (id) => {
    const filtered = atual.filter((c) => c.id !== id);
    setAtual(filtered);
    setCart(filtered);
    setLocalStorage('carrinho', filtered);
  };

  useEffect(() => {

  }, [cart]);

  return (
    <div>
      {/* <Navbar /> */}
      <section>
        { atual && atual.map((c, i) => (
          <div
            key={ c.id }
            data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
          >
            <p
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              { c.name }
            </p>

            <br />

            {/* <img src={ c.url_image } alt={ c.name } width="150px" /> */}
            <br />
            <span
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              { c.quantity }
            </span>
            <br />
            <span
              data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
            >
              {c.price}
            </span>
            <br />
            <span
              data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
            >
              { (c.price * c.quantity).toFixed(2).replace('.', ',') }
            </span>
            <br />
            <button
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              type="button"
              onClick={ () => removeItem(c.id) }
            >
              remove
            </button>
          </div>
        ))}
      </section>
      <span data-testid="customer_checkout__element-order-total-price">Valor total</span>
      <form>
        <select data-testid="customer_checkout__select-seller">select</select>
        <br />
        <input type="text" data-testid="customer_checkout__input-address" />
        <br />
        <input
          type="number"
          min="0"
          data-testid="customer_checkout__input-address-number"
        />
        <button
          type="button"
          disable={ isDisable }
          data-testid="customer_checkout__button-submit-order"
        >
          botaum
        </button>
      </form>
    </div>
  );
}

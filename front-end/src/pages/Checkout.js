import { React, useContext, useEffect, useState } from 'react';
import Context from '../API/Context';
import Navbar from '../components/Navbar';
import { setLocalStorage, getLocalStorage } from '../helpers/localStorage';

export default function Checkout() {
  const { cart, setCart } = useContext(Context);
  const [atual, setAtual] = useState(cart);
  const [isDisable, setIsDisable] = useState(true);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState(0);

  const vtotal = getLocalStorage('userTotal');

  const removeItem = (id) => {
    const filtered = atual.filter((c) => c.id !== id);
    setAtual(filtered);
    setCart(filtered);
    setLocalStorage('carrinho', filtered);
  };

  useEffect(() => {
    const validateButton = () => {
      const SIX = 6;
      if (address.length > SIX && addressNumber > 0) {
        setIsDisable(false);
      } else setIsDisable(true);
    };
    validateButton();
  }, [address, addressNumber]);

  useEffect(() => {

  }, [cart]);

  return (
    <div>
      <Navbar />
      <ol>
        { atual && atual.map((c, i) => (
          <li
            key={ c.id }
          >
            <span
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              { i + 1 }
            </span>
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
              { (c.price).replace('.', ',') }
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
          </li>
        ))}
      </ol>
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        { vtotal.toFixed(2).replace('.', ',') }
      </span>
      <form>
        <select data-testid="customer_checkout__select-seller">select</select>
        <br />
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setAddress(target.value) }
        />
        <br />
        <input
          type="number"
          min="0"
          data-testid="customer_checkout__input-address-number"
          onChange={ ({ target }) => setAddressNumber(target.value) }
        />
        <button
          type="button"
          disabled={ isDisable }
          data-testid="customer_checkout__button-submit-order"
        >
          botaum
        </button>
      </form>
    </div>
  );
}

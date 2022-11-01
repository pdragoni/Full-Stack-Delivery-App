import { React, useContext, useEffect, useState } from 'react';
import Context from '../API/Context';
import Navbar from '../components/Navbar';
import { setLocalStorage } from '../helpers/localStorage';

export default function Checkout() {
  const { cart, setCart } = useContext(Context);
  const [atual, setAtual] = useState(cart);

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
      <Navbar />
      <ol>
        { atual && atual.map((c, i) => (
          <li
            key={ c.id }
            data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
          >
            <p
              data-testid={ `customer_checkout__element-order-table-name-${i}` }
            >
              { c.name }
            </p>
            <br />
            <img src={ c.url_image } alt={ c.name } width="150px" />
            <br />
            <span
              data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
            >
              {c.quantity}
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
          </li>
        ))}
      </ol>
    </div>
  );
}

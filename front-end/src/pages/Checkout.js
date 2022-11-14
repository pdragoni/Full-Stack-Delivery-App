/* eslint-disable react/jsx-key */
import { React, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../API/Context';
import Navbar from '../components/Navbar';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import { calculateTotalPrice, calculateTotalPriceToNumber } from '../helpers/utils';
import { createOrder, getAllSellers, getUserId } from '../API/instance';

export default function Checkout() {
  const { cart, setCart } = useContext(Context);
  const navigate = useNavigate();
  const [atual, setAtual] = useState(cart);
  const [isDisable, setIsDisable] = useState(true);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState(0);
  const [sellers, setSellers] = useState([]);
  const sellerSelect = useRef(null);

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

  useEffect(() => {
    const fetchAllSellers = async () => {
      const data = await getAllSellers();
      setSellers(data);
    };
    fetchAllSellers();
  }, []);

  const finishOrder = async () => {
    const { email } = getLocalStorage('user');
    const userId = await getUserId(email);
    const sale = atual.map((prod) => ({ productId: prod.id, quantity: prod.quantity }));
    const order = {
      userId,
      sellerId: Number(sellerSelect.current.value),
      totalPrice: Number(calculateTotalPriceToNumber(atual)),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      sale,
    };
    const { token } = getLocalStorage('user');
    const response = await createOrder(order, token);

    navigate(`/customer/orders/${response.newSale.id}`);
  };

  return (
    <div>
      <Navbar />
      <ul>
        { atual && atual.map((c, i) => (
          <li
            key={ c.id }
            className="product-checkout"
          >
            <div className="product-ckt-first">
              <p
                className="ckt-title"
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                { i + 1 }
              </p>
              <p
                className="ckt-title"
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                { c.name }
              </p>
            </div>
            <div className="product-ckt-second">
              <img src={ c.url_image } alt={ c.name } className="product-image-ckt" />
              <div className="product-ckt-second-son">
                <p
                  data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
                >
                  { `Quantidade: ${c.quantity}` }
                </p>
                <p
                  data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
                >
                  { `Preço unitário: ${(c.price).replace('.', ',')}` }
                </p>
                <p
                  data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
                >
                  { `Subtotal: ${(c.price * c.quantity).toFixed(2).replace('.', ',')}` }
                </p>
              </div>
            </div>
            <button
              className="nav-button ckt-button"
              data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              type="button"
              onClick={ () => removeItem(c.id) }
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div>
        <div className="ckt-total">
          <h4
            data-testid="customer_checkout__element-order-total-price"
          >
            { `Valor total da compra: R$ ${calculateTotalPrice(atual)}` }
          </h4>
          <div>
            Vendedor(a):
            <select data-testid="customer_checkout__select-seller" ref={ sellerSelect }>
              { sellers && sellers.map((seller, index) => (
                <option
                  key={ index }
                  value={ seller.id }
                >
                  { seller.name }
                </option>
              ))}
            </select>
          </div>
        </div>
        <form className="login-form ckt-form">
          <div>
            <h3>
              Digite local de entrega
            </h3>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput6"
              data-testid="customer_checkout__input-address"
              placeholder="Rua"
              onChange={ ({ target }) => setAddress(target.value) }
            />
            <label className="input-form" htmlFor="floatingInput6">
              Rua
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput7"
              placeholder="Número"
              type="number"
              min="0"
              data-testid="customer_checkout__input-address-number"
              onChange={ ({ target }) => setAddressNumber(target.value) }
            />
            <label className="input-form" htmlFor="floatingInput7">
            Número
            </label>
          </div>
          <button
            className="nav-button ckt-button"
            type="button"
            disabled={ isDisable }
            data-testid="customer_checkout__button-submit-order"
            onClick={ finishOrder }
          >
            Finalizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

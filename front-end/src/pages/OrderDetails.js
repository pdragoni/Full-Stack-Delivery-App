import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrderById, updateOrder } from '../API/instance';
import { getLocalStorage } from '../helpers/localStorage';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const [statusDelivered, setStatusDelivered] = useState('');

  const { role } = getLocalStorage('user');
  const { id } = useParams();

  const dtDefault = `${role}_order_details__`;

  const changeStatus = async (value) => {
    await updateOrder(value, id);
    setStatusDelivered(value);
  };

  useEffect(() => {
    getOrderById(id).then((response) => {
      setOrder(response);
      setStatusDelivered(response.status);
    });
  }, [id]);

  useEffect(() => {
    getOrderById(id).then((response) => {
      setOrder(response);
    });
  }, [statusDelivered, id]);

  return (
    <div>
      <Navbar />
      {
        order && (
          <fieldset>
            <fieldset>
              <thead>
                <td
                  data-testid={ `${dtDefault}element-order-details-label-order-id` }
                >
                  { order.id }
                </td>
                { role === 'customer' && (
                  <td
                    data-testid={ `${dtDefault}element-order-details-label-seller-name` }
                  >
                    { order.seller.name }
                  </td>
                )}
                <td
                  data-testid={ `${dtDefault}element-order-details-label-order-date` }
                >
                  { `${new Intl.DateTimeFormat('pt-BR')
                    .format(new Date(order.saleDate))}` }
                </td>
                <td
                  data-testid={
                    `${dtDefault}element-order-details-label-delivery-status`
                  }
                >
                  { order.status }
                </td>
                { role === 'customer' && (
                  <button
                    type="button"
                    onClick={ () => changeStatus('Entregue') }
                    disabled={ statusDelivered !== 'Em Trânsito' }
                    data-testid={ `${dtDefault}button-delivery-check` }
                  >
                    Marcar como entregue
                  </button>
                )}
                { role === 'seller' && (
                  <button
                    type="button"
                    onClick={ () => changeStatus('Preparando') }
                    disabled={ statusDelivered !== 'Pendente' }
                    data-testid={ `${dtDefault}button-preparing-check` }
                  >
                    Marcar como preparando
                  </button>
                )}
                { role === 'seller' && (
                  <button
                    type="button"
                    onClick={ () => changeStatus('Em Trânsito') }
                    disabled={ statusDelivered !== 'Preparando' }
                    data-testid={ `${dtDefault}button-dispatch-check` }
                  >
                    Marcar como em trânsito
                  </button>
                )}
              </thead>
            </fieldset>
            <fieldset>
              <tbody>
                {
                  order.products?.map((product, index) => (
                    <tr
                      key={ index }
                    >
                      <td
                        data-testid={
                          `${dtDefault}element-order-fieldset-item-number-${index}`
                        }
                      >
                        { (index + 1) }
                      </td>
                      <td
                        data-testid={ `${dtDefault}element-order-fieldset-name-${index}` }
                      >
                        { product.name }
                      </td>
                      <td
                        data-testid={
                          `${dtDefault}element-order-fieldset-quantity-${index}`
                        }
                      >
                        { product.salesProducts.quantity }
                      </td>
                      <td
                        data-testid={
                          `${dtDefault}element-order-fieldset-unit-price-${index}`
                        }
                      >
                        { (product.price).replace('.', ',') }
                      </td>
                      <td
                        data-testid={
                          `${dtDefault}element-order-fieldset-sub-total-${index}`
                        }
                      >
                        { (product.price * product.salesProducts.quantity)
                          .toFixed(2).replace('.', ',') }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </fieldset>
            <fieldset>
              <tfoot>
                <tr
                  data-testid={ `${dtDefault}element-order-total-price` }
                >
                  <h5>
                    { order.totalPrice.replace('.', ',') }
                  </h5>
                </tr>
              </tfoot>
            </fieldset>
          </fieldset>
        )
      }
    </div>
  );
}

import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrderById, updateOrder } from '../API/instance';

export default function SellerOrderDetails() {
  const [order, setOrder] = useState();
  // const [isDelivered, setIsDelivered] = useState(true);
  const [statusDelivered, setStatusDelivered] = useState('');

  const { id } = useParams();

  const dtDefault = 'seller_order_details__element-order-';

  const changeStatus = async (value) => {
    await updateOrder(value, id);
    await setStatusDelivered(value);
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
  }, [statusDelivered]);

  // console.log(order);

  return (
    <div>
      <Navbar />
      {
        order && (
          <table>
            <thead>
              <td
                data-testid={ `${dtDefault}details-label-order-id` }
              >
                { order.id }
              </td>
              <td
                data-testid={ `${dtDefault}details-label-delivery-status` }
              >
                { order.status }
              </td>
              <td
                data-testid={ `${dtDefault}details-label-order-date` }

              >
                { `${new Intl.DateTimeFormat('pt-BR')
                  .format(new Date(order.saleDate))}` }
              </td>
              <button
                type="button"
                onClick={ () => changeStatus('Preparando') }
                disabled={ statusDelivered !== 'Pendente' }
                data-testid="seller_order_details__button-preparing-check"
              >
                Marcar como preparando
              </button>
              <button
                type="button"
                onClick={ () => changeStatus('Em Trânsito') }
                disabled={ statusDelivered !== 'Preparando' }
                data-testid="seller_order_details__button-dispatch-check"
              >
                Marcar como em trânsito
              </button>
            </thead>
            <tbody>
              {
                order.products?.map((product, index) => (
                  <tr
                    key={ index }
                  >
                    <td
                      data-testid={ `${dtDefault}table-item-number-${index}` }
                    >
                      { (index + 1) }
                    </td>
                    <td
                      data-testid={ `${dtDefault}table-name-${index}` }
                    >
                      { product.name }
                    </td>
                    <td
                      data-testid={ `${dtDefault}table-quantity-${index}` }
                    >
                      { product.salesProducts.quantity }
                    </td>
                    <td
                      data-testid={ `${dtDefault}table-unit-price-${index}` }
                    >
                      { (product.price).replace('.', ',') }
                    </td>
                    <td
                      data-testid={ `${dtDefault}table-sub-total-${index}` }
                    >
                      { (product.price * product.salesProducts.quantity)
                        .toFixed(2).replace('.', ',') }
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tr
              data-testid={ `${dtDefault}total-price` }
            >
              { order.totalPrice.replace('.', ',') }
            </tr>
          </table>
        )
      }
    </div>
  );
}

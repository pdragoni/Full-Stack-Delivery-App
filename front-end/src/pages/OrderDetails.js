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
          <div>
            <div>
              <div className="details-header">
                <h4
                  data-testid={ `${dtDefault}element-order-details-label-order-id` }
                >
                  { `Detalhes do Pedido ${order.id}` }
                </h4>
                <div className="details-data">
                  { role === 'customer' && (
                    <p
                      data-testid={ `${dtDefault}
                        element-order-details-label-seller-name` }
                    >
                      { `Vendedor(a): ${order.seller.name}` }
                    </p>
                  )}
                  <p
                    data-testid={ `${dtDefault}element-order-details-label-order-date` }
                  >
                    { `Data do pedido: ${new Intl.DateTimeFormat('pt-BR')
                      .format(new Date(order.saleDate))}` }
                  </p>
                </div>
                <h4
                  className="details-status"
                  data-testid={
                    `${dtDefault}element-order-details-label-delivery-status`
                  }
                >
                  { order.status.toUpperCase() }
                </h4>
              </div>
              <div className="details-buttons-ftr">
                { role === 'customer' && (
                  <button
                    className="details-buttons button-deliver"
                    type="button"
                    onClick={ () => changeStatus('Entregue') }
                    disabled={ statusDelivered !== 'Em Trânsito' }
                    data-testid={ `${dtDefault}button-delivery-check` }
                  >
                    Marcar como entregue
                  </button>
                )}
                { role === 'seller' && (
                  <div>
                    <button
                      className="details-buttons button-prepare"
                      type="button"
                      onClick={ () => changeStatus('Preparando') }
                      disabled={ statusDelivered !== 'Pendente' }
                      data-testid={ `${dtDefault}button-preparing-check` }
                    >
                      Marcar como preparando
                    </button>
                    <button
                      className="details-buttons button-transit"
                      type="button"
                      onClick={ () => changeStatus('Em Trânsito') }
                      disabled={ statusDelivered !== 'Preparando' }
                      data-testid={ `${dtDefault}button-dispatch-check` }
                    >
                      Marcar como em trânsito
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="details-table-ftr">
                <table>
                  <thead>
                    <tr>
                      <td />
                      <td>
                        Item
                      </td>
                      <td>
                        Quant.
                      </td>
                      <td>
                        Valor
                      </td>
                      <td>
                        Subtotal
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order.products?.map((product, index) => (
                        <tr
                          key={ index }
                        >
                          <td
                            data-testid={
                              `${dtDefault}element-order-div-item-number-${index}`
                            }
                          >
                            { (index + 1) }
                          </td>
                          <td
                            className="details-table-name"
                            data-testid={ `${dtDefault}element-order-div-name-${index}` }
                          >
                            { product.name }
                          </td>
                          <td
                            data-testid={
                              `${dtDefault}element-order-div-quantity-${index}`
                            }
                          >
                            { product.salesProducts.quantity }
                          </td>
                          <td
                            data-testid={
                              `${dtDefault}element-order-div-unit-price-${index}`
                            }
                          >
                            { (product.price).replace('.', ',') }
                          </td>
                          <td
                            data-testid={
                              `${dtDefault}element-order-div-sub-total-${index}`
                            }
                          >
                            { (product.price * product.salesProducts.quantity)
                              .toFixed(2).replace('.', ',') }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div>
                <h4
                  className="details-footer"
                  data-testid={ `${dtDefault}element-order-total-price` }
                >
                  { `Valor total do pedido: R$ ${order.totalPrice.replace('.', ',')}` }
                </h4>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

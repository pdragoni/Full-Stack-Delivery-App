import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrderById } from '../API/instance';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const [isDelivered, setIsDelivered] = useState(true);

  const { id } = useParams();

  const dtDefault = 'customer_order_details__element-order-';

  useEffect(() => {
    getOrderById(id).then((response) => setOrder(response));
    // const split = order.saleDate.substring(2, ten);
    // console.log(split);
  }, [id]);

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
                data-testid={ `${dtDefault}details-label-seller-name` }
              >
                { order.seller.name }
              </td>
              <td
                data-testid={ `${dtDefault}details-label-order-date` }

              >
                { `${new Intl.DateTimeFormat('pt-BR')
                  .format(new Date(order.saleDate))}` }
              </td>
              <td
                data-testid={ `${dtDefault}details-label-delivery-status` }
              >
                {
                  order.status
                }
              </td>
              <button
                type="button"
                onClick={ () => setIsDelivered(!isDelivered) }
                disabled={ isDelivered }
                data-testid="customer_order_details__button-delivery-check"
              >
                Marcar como entregue
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
            <h5
              data-testid={ `${dtDefault}total-price` }
            >
              { order.totalPrice.replace('.', ',') }
            </h5>
          </table>
        )
      }
    </div>
  );
}

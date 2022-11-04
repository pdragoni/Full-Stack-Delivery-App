import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrderById } from '../API/instance';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const [isDisable, setIsDisable] = useState(true);

  const { id } = useParams();

  const string = 'customer_order_details__element-order-';

  const sellerName = 'Fulana Pereira';

  useEffect(() => {
    getOrderById(id).then((response) => setOrder(response));
    // const split = order.saleDate.substring(2, ten);
    // console.log(split);
  }, [id]);

  console.log(order);

  return (
    <div>
      <Navbar />
      {
        order && (
          <table>
            <thead>
              <td
                data-testid={ `${string}details-label-order-id` }
              >
                { order.id }
              </td>
              <td
                data-testid={ `${string}details-label-seller-name` }
              >
                { sellerName }
              </td>
              <td
                data-testid={ `${string}details-label-order-date` }

              >
                { `${new Intl.DateTimeFormat('pt-BR')
                  .format(new Date(order.saleDate))}` }
              </td>
              <td
                data-testid={ `${string}details-label-delivery-status` }
              >
                {
                  order.status
                }
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => console.log('Pedido finalizado') }
                  disabled={ isDisable }
                  data-testid="customer_order_details__button-delivery-check"
                >
                  Marcar como entregue
                </button>
              </td>
            </thead>
            <tbody>
              {
                order.products?.map((product, index) => (
                  <tr
                    key={ index }
                  >
                    <td
                      data-testid={ `${string}table-item-number-${index}` }
                    >
                      { (index + 1) }
                    </td>
                    <td
                      data-testid={ `${string}table-name-${index}` }
                    >
                      { product.name }
                    </td>
                    <td
                      data-testid={ `${string}table-quantity-${index}` }
                    >
                      { product.salesProducts.quantity }
                    </td>
                    <td
                      data-testid={ `${string}table-unit-price-${index}` }
                    >
                      { product.price }
                    </td>
                    <td
                      data-testid={ `${string}table-sub-total-${index}` }
                    >
                      { (product.price * product.salesProducts.quantity)
                        .toFixed(2).replace('.', ',') }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
      <span
        data-testid={ `${string}total-price` }
      >
        { order.totalPrice.replace('.', ',') }
      </span>
      <button type="button" onClick={ () => console.log(order) }>botaum</button>
    </div>
  );
}

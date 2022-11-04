import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrderById } from '../API/instance';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const { id } = useParams();

  const string = 'customer_order_details__element-order-';

  useEffect(() => {
    getOrderById(id).then((response) => setOrder(response));
    console.log(order);
  }, [id]);

  console.log(order);

  return (
    <div>
      <Navbar />
      {
        order && (
          <div>
            <span
              data-testid={ `${string}details-label-order-id` }
            >
              { order.id }
            </span>
            <span
              data-testid={ `${string}details-label-seller-name` }

            >
              { order.sellerId }
            </span>
            <span
              data-testid={ `${string}details-label-order-date` }

            >
              { `Data: ${order.saleDate}` }
            </span>
            <span
              data-testid={ `${string}details-label-delivery-status` }
            />
            <button
              type="button"
              onClick={ () => console.log('Pedido finalizado') }
              data-testid="customer_order_details__button-delivery-check"
            >
              Marcar como entregue
            </button>
            {
              order.products?.map((product, index) => (
                <div
                  key={ index }
                >
                  <span
                    data-testid={ `${string}table-item-number-${index}` }
                  >
                    { (index + 1) }
                  </span>
                  <span
                    data-testid={ `${string}table-name-${index}` }
                  >
                    { product.name }
                  </span>
                  <span
                    data-testid={ `${string}table-quantity-${index}` }
                  >
                    { product.salesProducts.quantity }
                  </span>
                  <span
                    data-testid={ `${string}table-unit-price-${index}` }
                  >
                    { product.price }
                  </span>
                  <span
                    data-testid={ `${string}table-sub-total-${index}` }
                  >
                    { product.price * product.salesProducts.quantity }
                  </span>
                </div>
              ))
            }
            <span
              data-testid={ `${string}total-price` }
            >
              { order.totalPrice }
            </span>
          </div>
        )
      }
      <button type="button" onClick={ () => console.log(order) }>botaum</button>
    </div>
  );
}

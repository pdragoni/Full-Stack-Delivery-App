import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLocalStorage } from '../helpers/localStorage';
import { getOrders } from '../API/instance';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const { email, role } = getLocalStorage('user');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders(email);
      setOrders(response);
    };
    fetchOrders();
  }, [email]);

  return (
    <div>
      <div className="orders-container">
        {orders?.map((order) => (
          <Link key={ order.id } to={ `/${role}/orders/${order.id}` }>
            <div
              className="order-card"
            >
              <p data-testid={ `${role}_orders__element-order-id-${order.id}` }>
                {`Pedido ${order.id}`}
              </p>
              <p data-testid={ `${role}_orders__element-order-date-${order.id}` }>
                {new Intl.DateTimeFormat('pt-BR').format(new Date(order.saleDate))}
              </p>
              <p data-testid={ `${role}_orders__element-card-price-${order.id}` }>
                {`${order.totalPrice.replace('.', ',')}`}
              </p>
              <p data-testid={ `${role}_orders__element-delivery-status-${order.id}` }>
                { order.status }
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

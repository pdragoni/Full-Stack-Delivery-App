import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getOrders } from '../API/instance';
import { getLocalStorage } from '../helpers/localStorage';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { email } = getLocalStorage('user');
      const response = await getOrders(email);
      setOrders(response);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="orders-container">
        {orders.map((order, index) => (
          <div key={ index } className="order-card">
            <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
              {`Pedido ${order.id}`}
            </p>
            <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
              {order.sale_date}
            </p>
            <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
              {`R$ ${order.total_price.replace('.', ',')}`}
            </p>
            <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
              {order.status === 'Pendente' ? 'Pendente' : 'Entregue'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
- 33: customer_orders__element-order-id-<id>
- 34: customer_orders__element-delivery-status-<id>
- 35: customer_orders__element-order-date-<id>
- 36: customer_orders__element-card-price-<id> */

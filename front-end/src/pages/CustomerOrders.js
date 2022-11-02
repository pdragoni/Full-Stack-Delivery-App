import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getOrders } from '../API/instance';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders(id);
      setOrders(response);
    };
    fetchOrders();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="orders-container">
        {orders.map((order, index) => (
          <div key={ index } className="order-card">
            <p data-testid={ `${index}-order-number` }>{`Pedido ${order.sale_id}`}</p>
            <p data-testid={ `${index}-order-date` }>{order.sale_date}</p>
            <p data-testid={ `${index}-order-total-value` }>
              {`R$ ${order.total_price.replace('.', ',')}`}
            </p>
            <p data-testid={ `${index}-order-status` }>{order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

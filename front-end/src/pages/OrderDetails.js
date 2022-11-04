import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getOrderById } from '../API/instance';

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const { id } = useParams();
  // setOrder(getOrderById(id));

  useEffect(() => {
    setOrder(getOrderById(id));
  }, [id]);

  return (
    <div>
      <Navbar />
      <button type="button" onClick={ () => console.log(order) }>botaum</button>
    </div>
  );
}

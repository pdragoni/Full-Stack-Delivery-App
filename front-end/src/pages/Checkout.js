import { React, useEffect, useContext } from 'react';
// import { getLocalStorage } from '../helpers/localStorage';
import Context from '../API/Context';

export default function Checkout() {
  const { cart } = useContext(Context);

  useEffect(() => { console.log(cart); }, [cart]);

  return (
    <div>
      {
        (cart.length > 0 ? cart.map((c) => (
          <div key={ c.index }>
            <p>{ c.name }</p>
          </div>
        )) : <p>olá mundo</p>)
      }
    </div>
  );
}

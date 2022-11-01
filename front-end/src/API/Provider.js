import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { getLocalStorage } from '../helpers/localStorage';

function Provider({ children }) {
  const [cart, setCart] = useState(getLocalStorage('carrinho') || []);

  const contextValue = React.useMemo(() => ({
    cart,
    setCart,
  }), []);

  return (
    <Context.Provider value={ contextValue }>{ children }</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.node), PropTypes.node],
  ).isRequired,
};

export default Provider;

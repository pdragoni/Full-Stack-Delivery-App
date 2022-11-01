import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../helpers/localStorage';

export default function Navbar() {
  const navigate = useNavigate();
  const { name } = getLocalStorage('user');
  const logoutClick = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
        onClick={ () => navigate('/products') }
      >
        Produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
        onClick={ () => navigate('/orders') }
      >
        Pedidos

      </button>
      <button
        data-testid="customer_products__element-navbar-user-full-name"
        type="button"
        onClick={ () => navigate('/profile') }
      >
        { name }
      </button>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ logoutClick }
      >
        Sair

      </button>
    </header>
  );
}

import { React } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const logoutClick = () => {
    localStorage.clear();
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
        Perfil

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

import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../helpers/localStorage';
import navLogo from '../images/logo-alt-02.png';

export default function Navbar() {
  const navigate = useNavigate();
  const { name, role } = getLocalStorage('user');
  const logoutClick = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="nav-header">
      <div>
        { role === 'customer' ? (
          <button
            className="nav-button"
            data-testid="customer_products__element-navbar-link-products"
            type="button"
            onClick={ () => navigate('/customer/products') }
          >
            Produtos
          </button>
        ) : (
          <span />
        ) }
        { role === 'administrator' ? (
          <button
            className="nav-button"
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => navigate('/admin/manage') }
          >
            Gerenciar usuários
          </button>
        ) : (
          <button
            className="nav-button"
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => navigate('/seller/orders') }
          >
            Pedidos
          </button>
        )}
      </div>
      <img src={ navLogo } alt="Logo da 21 Express" className="nav-logo" />
      <div>
        <button
          className="nav-button"
          data-testid="customer_products__element-navbar-user-full-name"
          type="button"
          onClick={ () => navigate('/profile') }
        >
          { name }
        </button>
        <button
          className="nav-button-exit"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ logoutClick }
        >
          Sair
        </button>
      </div>
    </header>
  );
}

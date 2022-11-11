import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API/instance';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';
import logo from '../images/logo-full.png';
import beerRight from '../images/beer-right.png';
import beerLeft from '../images/beer-left.png';

export default function Login() {
  const [btnDisable, setBtnDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const navigate = useNavigate();

  const redirectByRole = (role) => {
    switch (role) {
    case 'customer': return navigate('/customer/products');
    case 'seller': return navigate('/seller/orders');
    default: return navigate('/admin/manage');
    }
  };

  const loginClick = async () => {
    const response = await loginUser({ email, password });
    if (!response) {
      return setValidEmail(false);
    }
    const responseJson = response.data;
    setLocalStorage('user', responseJson);
    const { role } = responseJson;
    redirectByRole(role);
  };

  useEffect(() => {
    const user = getLocalStorage('user');
    if (user) {
      const { role } = user;
      return redirectByRole(role);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const minPasswordLength = 6;

    if (regex.test(email) && password.length >= minPasswordLength) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [email, password, btnDisable]);

  return (
    <div>
      <div>
        <img src={ logo } alt="Logo da 21 Express" className="login-logo" />
      </div>
      <div className="beers">
        <img src={ beerLeft } alt="beer" className="beer-left" />
        <img src={ beerRight } alt="beer" className="beer-right" />
      </div>
      <form className="login-form">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput1"
            data-testid="common_login__input-email"
            name="email"
            placeholder="user@email.com"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <label className="input-form" htmlFor="floatingInput1">
            Email
          </label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingInput2"
            data-testid="common_login__input-password"
            name="password"
            placeholder="******"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <label className="input-form" htmlFor="floatingInput2">
            Senha
          </label>
        </div>
        <br />
        <button
          className="login-page-button"
          data-testid="common_login__button-login"
          type="button"
          disabled={ btnDisable }
          onClick={ loginClick }
        >
          Login
        </button>
        <br />
        <button
          className="login-page-button"
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Quero me cadastrar!
        </button>
        {
          !validEmail
          && (
            <span data-testid="common_login__element-invalid-email">
              E-mail inválido
            </span>)
        }
      </form>
    </div>
  );
}

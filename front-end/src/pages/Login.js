import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API/instance';
import { getLocalStorage, setLocalStorage } from '../helpers/localStorage';

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
    <form>
      <label htmlFor="email">
        Insira seu e-mail
        <input
          data-testid="common_login__input-email"
          type="email"
          name="email"
          placeholder="user@email.com"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <br />
      <label htmlFor="password">
        Insira sua senha
        <input
          data-testid="common_login__input-password"
          type="password"
          name="password"
          placeholder="******"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <br />
      <button
        data-testid="common_login__button-login"
        type="button"
        disabled={ btnDisable }
        onClick={ loginClick }
      >
        Login
      </button>
      <br />
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ () => navigate('/register') }
      >
        Cadastrar
      </button>
      {
        !validEmail
        && <span data-testid="common_login__element-invalid-email">E-mail inválido</span>
      }
    </form>
  );
}

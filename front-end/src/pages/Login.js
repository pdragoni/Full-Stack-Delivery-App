import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../API/instance';

export default function Login() {
  const [btnDisable, setBtnDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [validEmail, setValidEmail] = useState(true);

  const onInputChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  useEffect(() => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const minPasswordLength = 6;

    if (regex.test(email) && password.length >= minPasswordLength) {
      setBtnDisable(false);
      // setValidEmail(true);
    } else {
      setBtnDisable(true);
      // setValidEmail(false);
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
          onChange={ onInputChange }
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
          onChange={ onInputChange }
        />
      </label>
      <br />
      <button
        data-testid="common_login__input-login"
        type="button"
        disabled={ btnDisable }
        onClick={ async () => {
          const response = await loginUser({ email, password });

          if ('message' in response) {
            return setValidEmail(false);
          }
          const responseJson = response.data;
          setToken(responseJson.token);
          localStorage.setItem('token', responseJson.token);
          navigate('/register');
        } }
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

import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../API/instance';
import { setLocalStorage } from '../helpers/localStorage';
import logo from '../images/logo-full.png';

export default function Register() {
  const [btnDisable, setBtnDisable] = useState(true);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onInputChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    } else if (target.name === 'password') {
      setPassword(target.value);
    } else {
      setName(target.value);
    }
  };

  useEffect(() => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const minPasswordLength = 6;
    const minNameLength = 12;
    if (regex.test(email) && password.length >= minPasswordLength
      && name.length >= minNameLength) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [email, password, btnDisable, name]);

  const handleRegister = async () => {
    const userData = await registerUser({ name, email, password });

    if (!userData) return setAlreadyRegistered(true);

    setLocalStorage('user', userData);
    navigate('/customer/products');
  };

  return (
    <div>
      <div>
        <img src={ logo } alt="Logo da 21 Express" className="login-logo" />
      </div>
      <form className="login-form">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput3"
            data-testid="common_register__input-name"
            name="user-name"
            placeholder="Seu nome"
            onChange={ onInputChange }
          />
          <label className="input-form" htmlFor="floatingInput3">
            Nome
          </label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput4"
            data-testid="common_register__input-email"
            name="email"
            placeholder="user@email.com"
            onChange={ onInputChange }
          />
          <label className="input-form" htmlFor="floatingInput4">
            Email
          </label>
        </div>
        <br />
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingInput5"
            data-testid="common_register__input-password"
            name="password"
            placeholder="******"
            onChange={ onInputChange }
          />
          <label className="input-form" htmlFor="floatingInput5">
            Senha
          </label>
        </div>
        <br />
        {alreadyRegistered && (
          <span data-testid="common_register__element-invalid_register">
            Usuário já cadastrado!
          </span>
        )}
        <button
          className="login-page-button"
          data-testid="common_register__button-register"
          type="button"
          onClick={ handleRegister }
          disabled={ btnDisable }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

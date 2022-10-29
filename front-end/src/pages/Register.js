import { React, useState, useEffect } from 'react';
import { registerUser } from '../API/instance';

export default function Register() {
  const [btnDisable, setBtnDisable] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    if (regex.test(email)
      && password.length >= minPasswordLength
      && name.length >= minNameLength) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [email, password, btnDisable, name]);

  const handleRegister = async () => {
    const response = await registerUser({ name, email, password });
    console.log(response); 
  };

  return (
    <form>
      <label htmlFor="name">
        Nome
        { ' ' }
        <input
          data-testid="common_register__input-name"
          type="text"
          name="user-name"
          placeholder="Seu nome"
          onChange={ onInputChange }
        />
      </label>
      <br />
      <label htmlFor="email">
        Insira seu e-mail
        { ' ' }
        <input
          data-testid="common_register__input-email"
          type="email"
          name="email"
          placeholder="user@email.com"
          onChange={ onInputChange }
        />
      </label>
      <br />
      <label htmlFor="password">
        Insira sua senha
        { ' ' }
        <input
          data-testid="common_register__input-password"
          type="password"
          name="password"
          placeholder="******"
          onChange={ onInputChange }
        />
      </label>
      <br />
      <button
        data-testid="common_register__button-register"
        type="button"
        onClick={ handleRegister }
        disabled={ btnDisable }
      >
        Cadastrar
      </button>
    </form>
  );
}

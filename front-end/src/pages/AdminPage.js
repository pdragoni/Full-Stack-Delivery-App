import React, { useState } from 'react';
import { createUserByAdm } from '../API/instance';
import Navbar from '../components/Navbar';
import { getLocalStorage } from '../helpers/localStorage';

export default function AdminPage() {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [showMessage, setShowMessage] = useState(false);

  const onInputChange = ({ target: { name, value } }) => {
    setFormValues((state) => ({ ...state, [name]: value }));
  };

  const enableButton = () => {
    const { name, email, password } = formValues;
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const six = 6;
    const twelve = 12;
    return !(password.length >= six && name.length >= twelve && regex.test(email));
  };

  const createUser = async () => {
    const { name, email, password, role } = formValues;
    const { token } = getLocalStorage('user');
    const data = await createUserByAdm({ name, email, password, role }, token);
    console.log(data);
    if (data) {
      console.log('Usuário criado com sucesso!');
      return setFormValues({ name: '', email: '', password: '', role: 'seller' });
    }
    return setShowMessage(true);
  };

  return (
    <div>
      <Navbar />
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="name">
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            name="name"
            value={ formValues.name }
            placeholder="Nome e sobrenome"
            onChange={ onInputChange }
          />
        </label>
        <br />
        <label htmlFor="email">
          E-mail
          <input
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            value={ formValues.email }
            placeholder="user@email.com"
            onChange={ onInputChange }
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha
          <input
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            placeholder="******"
            value={ formValues.password }
            onChange={ onInputChange }
          />
        </label>
        <br />
        <label htmlFor="role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            name="role"
            onChange={ onInputChange }
            value={ formValues.role }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <br />
        <br />
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ enableButton() }
          onClick={ createUser }
        >
          Cadastrar
        </button>
      </form>

      { showMessage
      && <p data-testid="admin_manage__element-invalid-register">Usuário já existe</p> }
    </div>
  );
}

/*

- 64: admin_manage__input-name
- 65: admin_manage__input-email
- 66: admin_manage__input-password
- 67: admin_manage__button-register
- 68: admin_manage__select-role
- 69: admin_manage__element-user-table-item-number-<index>
- 70: admin_manage__element-user-table-name-<index>
- 71: admin_manage__element-user-table-email-<index>
- 72: admin_manage__element-user-table-role-<index>
- 73: admin_manage__element-user-table-remove-<index>
- 74: admin_manage__element-invalid-register [Elemento oculto (Mensagens de erro)]

*/

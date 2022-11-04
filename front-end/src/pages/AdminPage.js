import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });
  const roleSelect = useRef(null);

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
            onChange={ onInputChange }
          />
        </label>
        <br />
        <label htmlFor="role">
          Tipo
          <select
            data-testid="admin_manage__select-role"
            defaultValue="seller"
            ref={ roleSelect }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <br />
        <br />
        <button type="button" disabled={ enableButton() }>Cadastrar</button>
      </form>
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

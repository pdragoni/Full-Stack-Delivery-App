import React from 'react';
import Navbar from '../components/Navbar';

export default function AdminPage() {
  return (
    <div>
      <Navbar />
      <h2>Cadastrar novo usuário</h2>
      <form>
        <label htmlFor="name">
          Nome
          {' '}
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
          {' '}
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
          {' '}
          <input
            data-testid="common_register__input-password"
            type="password"
            name="password"
            placeholder="******"
            onChange={ onInputChange }
          />
        </label>
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

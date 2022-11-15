import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AdminRegisterForm from '../components/AdminRegisterForm';
import { getUsers } from '../API/instance';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const defaultTestidString = 'admin_manage__element-user-table';
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      const filteredUsers = response.filter((user) => user.role !== 'administrator');
      setUsers(filteredUsers);
    };
    fetchUsers();
  }, []);
  return (
    <div className="admin-page-container">
      <Navbar />
      <AdminRegisterForm />
      <div className="users-list-container">
        <h3>Usuários Cadastrados</h3>
        <ul>
          {users.map((user, index) => (
            <li key={ index }>
              <span
                data-testid={ `${defaultTestidString}-item-number-${index}` }
                className="user-item-number"
              >
                {index + 1}
              </span>
              <div className="user-info">
                <span data-testid={ `${defaultTestidString}-name` }>
                  {`Nome: ${user.name}`}
                </span>
                <span data-testid={ `${defaultTestidString}-email` }>
                  {`Email: ${user.email}`}
                </span>
                <span data-testid={ `${defaultTestidString}-role` }>
                  {`Tipo: ${user.role}`}
                </span>
              </div>
              <button type="button">
                Excluir
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

/*

- 69: data-testid={ `${defaultTestidString}-item-number-${index}`}
- 70: data-testid={ `${defaultTestidString}-name-${index}`
- 71: data-testid={ `${defaultTestidString}-email-${index}`
- 72: data-testid={ `${defaultTestidString}-role-${index}`

*/

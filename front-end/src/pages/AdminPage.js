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
    <div>
      <Navbar />
      <AdminRegisterForm />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { users?.map((user, index) => (
            <tr key={ index }>
              <td data-testid={ `${defaultTestidString}-item-number${index}` }>
                { index + 1 }
              </td>
              <td data-testid={ `${defaultTestidString}-name-${index}` }>
                { user.name }
              </td>
              <td data-testid={ `${defaultTestidString}-email-${index}` }>
                { user.email }
              </td>
              <td data-testid={ `${defaultTestidString}-role-${index}` }>
                { user.role }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `${defaultTestidString}-remove-${index}` }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

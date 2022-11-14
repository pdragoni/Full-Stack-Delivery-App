import React, { useState, useEf } from 'react';
import Navbar from '../components/Navbar';
import AdminRegisterForm from '../components/AdminRegisterForm';

export default function AdminPage() {
  // const [users, setUsers] = useState([]);

  return (
    <div>
      <Navbar />
      <AdminRegisterForm />

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

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import './styles/Checkout.css';
import './styles/OrderList.css';
import './styles/OrderDetails.css';
import './styles/AdminPage.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Provider from './API/Provider';
import CustomerOrders from './pages/CustomerOrders';
import OrderDetails from './pages/OrderDetails';
import SellerOrders from './pages/SellerOrders';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/login" /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/customer/products" element={ <Products /> } />
          <Route exact path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/orders" element={ <CustomerOrders /> } />
          <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
          <Route exact path="/seller/orders" element={ <SellerOrders /> } />
          <Route exact path="/seller/orders/:id" element={ <OrderDetails /> } />
          <Route exact path="/admin/manage" element={ <AdminPage /> } />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

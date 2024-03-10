// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/user/Dashboard';
import Deposit from './pages/user/Deposit';
import Products from './pages/user/Products';
import Profile from './pages/user/Profile';
import Teams from './pages/user/Teams';
import Transactions from './pages/user/Transactions';
import Withdrawal from './pages/user/Withdrawal';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/products" element={<Products />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/withdrawal" element={<Withdrawal />} />

    </Routes>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from '../components/header';
import Login from '../components/login';
import Signup from '../components/signup';
import Client_protected_route from '../components/Client_protected_route';
import Clientpage from '../components/clientpafe';
import Logout from '../components/Logout';
import Admin_protected_route from '../components/Admin_protected_route';
import Adminpage from '../components/adminpage';

const MyRoutes = () => {
  const location = useLocation();
  const noHeaderPath = ['/signup', '/login'];

  return (
    <>
      {/* Conditionally render Header based on current pathname */}
      {!noHeaderPath.includes(location.pathname) && <Header />}

      <Routes>
        <Route path='*' element={<h1>not found</h1>} />
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />  
        <Route path="/logout" element={<Logout />} />
        <Route path="/client" element={<Client_protected_route><Clientpage /></Client_protected_route>} />
        <Route path="/admin" element={<Admin_protected_route><Adminpage /></Admin_protected_route>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

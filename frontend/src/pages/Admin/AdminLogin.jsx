// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* your Navbar etc here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />

        {/* admin route */}
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <AdminLogin />}
        />
      </Routes>
    </>
  );
}

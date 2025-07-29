import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLogin from './AdminLogin'

const Header = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleAdminLoginSuccess = () => {
    // Admin login success is handled in AdminLogin component
    console.log('Admin login successful');
  };

  return (
    <>
      <header className="bg-white shadow px-10 py-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className="text-2xl font-bold text-blue-600">
           HSTU Research Portal
          </Link>
          <nav className="flex items-center space-x-6">
            <ul className="flex space-x-6 text-lg">
              <li>
                <Link to="/" className="hover:text-blue-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/papers" className="hover:text-blue-500 transition">
                  Papers
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-blue-500 transition">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
            <button
              onClick={() => setShowAdminLogin(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
            >
              <i className="fas fa-user-shield mr-2"></i>
              Admin
            </button>
          </nav>
        </div>
      </header>

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </>
  )
}

export default Header 
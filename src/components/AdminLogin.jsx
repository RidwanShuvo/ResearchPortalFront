import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = ({ isOpen, onClose, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdmin();

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hardcoded credentials check
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store admin status in localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      
      // Update context
      login();
      
      setIsLoading(false);
      onLoginSuccess();
      onClose();
      navigate('/admin');
    } else {
      setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCredentials({ username: '', password: '' });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-sm text-gray-500">
            Username: <code className="bg-gray-200 px-1 rounded">admin</code>
          </p>
          <p className="text-sm text-gray-500">
            Password: <code className="bg-gray-200 px-1 rounded">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 
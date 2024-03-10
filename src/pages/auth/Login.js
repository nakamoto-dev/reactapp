import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Quest from '../../components/layouts/Quest';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const { login, authToken } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://192.168.88.106:8000/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid credentials. Please check your phone and password.');
        } else {
          throw new Error(data.message || 'Login failed');
        }
      }
      const { accessToken, token_type } = data;
      login(`${token_type} ${accessToken}`);

      // Redirect to another page after successful login
      console.log('Login success:', accessToken);
      setError(null);
    } catch (error) 
    {
      setError(error.message || 'Login failed. Please try again.');
      setSuccess(null);
      console.error('Login error:', error.message);
    }
  };

  // Redirect to the dashboard if the user is already logged in
  if (authToken) {
    //return redirect('/dashboard');
    return <Navigate to="/dashboard" />;
  }

  return (
    <Quest>
      <section className="bg-light m-2 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 m-2 ">
          {/* Your existing content */}
          <a href="login" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-sm font-medium">NAKAMOTO AGENCY LTD</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>
          <h1 class="financial-heading">A <span class="highlight">TRUE</span> FINANCIAL PARTNER</h1>
          <br></br>
          <center>
              <h4 className='text-lg text-cyan-600'>Access Your Account</h4>
          </center>

          <div>
            <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
              <div class="mb-5 mt-3">
                <label for="phone" class="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
                <input
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  name='phone'
                  type='text'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='Phone'
                  required
                />
              </div>
              <div className='mb-5'>
                <label for="password" class="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                  className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder='Password'
                />
              </div>

              <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type='submit'>Login Account</button>
            </form>
            <div className="flex  mt-4 text-end">
              <span className="text-sm text-gray-600 dark:text-gray-300">Don't have an account?</span>
              <Link to="/register" className="ml-1 text-blue-600 hover:underline dark:text-blue-500">
                Create here
              </Link>
            </div>
          </div>
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}
        </div>
      </section>
    </Quest>

  );
};

export default Login;

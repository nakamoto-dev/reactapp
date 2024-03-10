import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Quest from '../../components/layouts/Quest';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import { useAuth } from '../../AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ phone: '', password: '', confirm_password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { login, authToken } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidPhoneNumber = (phone) => {
    // Use a regular expression to validate the phone number format
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit format for simplicity
    return phoneRegex.test(phone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      // Check if the password and confirm password match
      if (formData.password !== formData.confirm_password) {
        throw new Error('Password and confirm password do not match');
      }

          // Validate phone number
        if (!isValidPhoneNumber(formData.phone)) {
          setError('Please enter a valid phone number.');
          return;
        }


      const response = await fetch(`https://smartshop-tr.com.ng/api/users/register`, {
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
          throw new Error(data.message || 'Registration failed');
        }
      }

      if (response) {
        if (response.error) {
          throw new Error(error);
        } else {
          throw new Error(data.message || data[1]);
        }
      }

      setSuccess(data.message || 'Registration successful');
      setError(null);

      // Optionally, you can redirect the user to the login page after successful registration
     // navigate('/login');
     if(data.accessToken){
      login(data.accessToken);
      navigate('/dashboard');
     }
  

    } catch (error) {
      //console.log(error)
     // alert(error);
      if(error.message === "success"){
       
        navigate('/login');
      }
      
      setSuccess(null);

      setError(error.message || 'Registration failed');
    }
  };

  return (
    <Quest>
      <section className="bg-light m-2 dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 m-2 ">
          <a href="login" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-sm font-medium">NAKAMOTO AGENCY LTD</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>
          <h1 className="financial-heading">A <span className="highlight">TRUE</span> FINANCIAL PARTNER</h1>
          <br></br>
          <center>
            <h4 className='text-lg text-cyan-600'>Create Your Account</h4>
          </center>

          <form className="max-w-sm mx-auto" onSubmit={handleRegister}>
            <div className="mb-5 mt-3">
              <label htmlFor="phone" className="text-start block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='Phone'
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className='mb-5'>
              <label htmlFor="password" className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white">Your password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Password'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                required
              />
            </div>
            <div className='mb-5'>
              <label htmlFor="confirm_password" className="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input
                type='password'
                id='confirm_password'
                name='confirm_password'
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder='Confirm Password'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
              </label>
            </div>
            <button
              type='submit'
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register Account
            </button>
          </form>

          <div className="flex items-center mt-4 text-end">
            <span className="text-sm text-gray-600 dark:text-gray-300">Already have an account?</span>
            <Link to="/login" className="ml-1 text-blue-600 hover:underline dark:text-blue-500">
              Login here
            </Link>
          </div>

          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}
        </div>
      </section>
    </Quest>
  );
};

export default Register;

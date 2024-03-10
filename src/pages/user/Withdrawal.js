
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const Deposit = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // State to store form data
  const [formData, setFormData] = useState({
    phone: '',
    amount: '',
  });

  // Loading state for the STK push request
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authToken) {
      // Navigate to the login page if there's no authToken
      navigate('/login');
    }
  }, [authToken, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchUserData = async () => {

    try {
      const response = await fetch(`https://smartshop-tr.com.ng/api/users/user`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data;
      
  
    } catch (error) {
      console.error(error);
       return false;
    }
    
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
     var  trackingId = 0 ;
     setError(null);
     setSuccess(null);
    //check user details
    var user  = await fetchUserData();
    console.log(user);
    if(user){
      trackingId = user.id;
    }

    // Your API endpoint
    const apiUrl = `https://smartshop-tr.com.ng/api/users/cashout?amt=${formData.amount}&ph=${formData.phone}&&id=${trackingId}`;

    // Your API key
    const apiKey = 'f3155f2ddee430ca687172798611b7d8';

  

    try {
      // Set loading state to true before making the API request
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
     
      });

      const responseData = await response.json();

      // Reset loading state after API request completes
      setLoading(false);

      // Handle the API response
      if (response.ok) {
        if(responseData[0] == 'error'){
          setError(responseData[1]);
        }
        if(responseData[0] == 'success'){
          setSuccess(responseData[1]);
        }
        // Success case
        console.log('cashout initiated successfully:', responseData);
        // You can add further logic here, such as updating the UI or showing a success message
      

      } else {
        // Error case
        console.error('Error initiating cashout:', responseData);
        setError(responseData.message || 'Please try again.');
        // You can handle errors and show appropriate messages to the user
      }
    } catch (error) {
      // Reset loading state after other types of errors
      setLoading(false);
      setError(error.message || 'Please try again.');
      setSuccess(null);
      console.error('Error:', error);
      // Handle other types of errors, such as network issues
    }


  };

  return (
    <Layout>
      <div className='mt-2'>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleWithdrawal}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">WITHDRAW FUNDS </h5>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="07*********"
                required
              />
            </div>
            <div>
              <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Amount</label>
              <input
                type="number"
                name="amount"
                min="60"
                id="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="10000"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending Withdrawal...' : 'Initiate Cashout'}
            </button>
          </form>
        </div>
        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}
      </div>
    </Layout>
  );
};

export default Deposit;


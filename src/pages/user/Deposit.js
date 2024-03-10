
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';

const Deposit = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

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

  const handleStkPush = async (e) => {
    e.preventDefault();
     var  trackingId = 0 ;
     
    //check user details
    var user  = await fetchUserData();
    console.log(user);
    if(user){
      trackingId = user.id;
    }

    // Your API endpoint
    const apiUrl = 'https://server.mradi.co/api/v1/stkpush';

    // Your API key
    const apiKey = 'f3155f2ddee430ca687172798611b7d8';

    // Prepare the request data
    const requestData = {
      amount: formData.amount,
      phone: formData.phone,
      tracking_id: trackingId,
    };

    try {
      // Set loading state to true before making the API request
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ApiKey': apiKey,
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      // Reset loading state after API request completes
      setLoading(false);

      // Handle the API response
      if (response.ok) {
        // Success case
        console.log('STK push initiated successfully:', responseData);
        // You can add further logic here, such as updating the UI or showing a success message
      } else {
        // Error case
        console.error('Error initiating STK push:', responseData);
        // You can handle errors and show appropriate messages to the user
      }
    } catch (error) {
      // Reset loading state after other types of errors
      setLoading(false);

      console.error('Error:', error);
      // Handle other types of errors, such as network issues
    }
  };

  return (
    <Layout>
      <div className='mt-2'>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleStkPush}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">RECHARGE YOUR ACCOUNT</h5>
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
              {loading ? 'Sending STK Push...' : 'Initiate STK Push'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Deposit;


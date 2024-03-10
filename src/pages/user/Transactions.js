import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { UserIcon, MinusIcon, PlusIcon } from '@heroicons/react/outline';


const Transactions = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [trxData, settrxData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://smartshop-tr.com.ng/api/users/trxs`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch transactions data');
        }

        const data = await response.json();
        console.log(data);
        settrxData(data.transactions || []); // Ensure settrxData receives an array, even if it's undefined
       
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
        setError('Failed to fetch. Please try again.'); // Set a user-friendly error message
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [authToken, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="ml-2">Loading Transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <Layout>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Transactions Overview</h2>
  
      {trxData.length === 0 ? (
        <p className='mt-3 text-blue-500'>No Transactions Available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trxData.map((trx) => (
            <div key={trx.id} className="bg-blue-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">User Transactions</h3>
              <div className="flex items-center mb-2">
                {trx.transaction_type === 'deposit' ? (
                  <PlusIcon className="w-10 h-10 text-blue-500 mr-2" />
                ) : (
                  <MinusIcon className="w-10 h-10 text-blue-500 mr-2" />
                )}
                <span className="text-gray-600">Amount: KES.{trx.amount || 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </Layout>
  
  );
};




export default Transactions;

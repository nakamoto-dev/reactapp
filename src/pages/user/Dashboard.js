import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/layouts/Main';
import Card from '../../components/Cards';
import Header from '../../components/Header';
import { CurrencyDollarIcon, CashIcon, CubeIcon, CreditCardIcon, ChartBarIcon, GiftIcon } from '@heroicons/react/outline';

const Dashboard = () => {
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    // Perform any additional logout logic if needed
    logout();
  };

  useEffect(() => {
    if (!authToken) {
      // Navigate to the login page if there's no authToken
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.88.106:8000/api/users/user`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        
        setUserData(data);

       // alert(data);
        setLoading(false); // Set loading to false once data is fetched
        console.log(data);
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Initial fetch
    fetchUserData();

    // Fetch user data every 5 minutes (300,000 milliseconds)
    const intervalId = setInterval(fetchUserData, 300000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [authToken, navigate]);
  const  parameterValue = 90;
  return (
    <Main>
     
      <Header parameter={userData} />
      {userData ? (
        <div className="flex flex-wrap justify-center mt-2 mb-8">
          {/* Balance Card */}
          <Card icon={<CurrencyDollarIcon className='w-10 h-10 text-green-500' />} title="Balance" value={`KES. ${userData.balance ?? 0}`} />

          {/* Deposits Card */}
          <Card icon={<CashIcon className='w-10 h-10 text-green-500' />} title="Deposits" value={`KES. ${userData.deposits ?? 0}`} />

          {/* Products Card */}
          <Card icon={<CubeIcon className='w-10 h-10 text-green-500' />} title="Products" value={userData.products ?? 0} />

          {/* Withdrawals Card */}
          <Card icon={<CreditCardIcon className='w-10 h-10 text-green-500' />} title="Withdrawals" value={`KES. ${userData.withdrawals ?? 0}`} />

          {/* Profits Card */}
          <Card icon={<ChartBarIcon className='w-10 h-10 text-green-500' />} title="Profits" value={`KES. ${userData.profits ?? 0}`} />

          {/* Bonuses Card */}
          <Card icon={<GiftIcon className='w-10 h-10 text-green-500' />} title="Bonuses" value={`KES. ${userData.bonuses ?? 0}`} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center mt-24 mt-2 mb-8">
             <p>Loading user data...</p>
        </div>
      )}
    </Main>
  );
};

export default Dashboard;

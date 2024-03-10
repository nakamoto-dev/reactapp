// 
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  PhoneIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UsersIcon,
  ClipboardCopyIcon,
  UserIcon,
} from '@heroicons/react/outline'; // Use outline icons

const Dashboard = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const referralLink = "http://192.168.88.106:8000";
  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        // Handle error state if needed
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

  const totalInvestments = userData ? userData.trades : 0;
  const totalCashouts = userData ? userData.cashouts : 0;

  const copyReferralLink = () => {
    // Your existing copy-to-clipboard logic
    alert('copied')
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Your Profile Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* User Information Card */}
          <div className="bg-blue-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">User Information</h3>
            <div className="flex items-center mb-2">
              <UserIcon className=" w-10 h-10 text-blue-500 mr-2" />
              <span className="text-gray-600">Phone: {userData ? userData.phone : 'N/A'}</span>
            </div>
          </div>

          {/* Investment Portfolio Card */}
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Investment Portfolio</h3>
            <div className="flex items-center mb-2">
              <CurrencyDollarIcon className="w-10 h-10 text-green-500 mr-2" />
              <span className="text-gray-600">Total Investments: KES.{totalInvestments}</span>
            </div>
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-10 h-10 text-green-500 mr-2" />
              <span className="text-gray-600">Total Cashouts: KES.{totalCashouts}</span>
            </div>
          </div>

          {/* Links Card */}
          <div className="bg-purple-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <div className="flex items-center mb-2">
              <DocumentTextIcon className="w-10 h-10 text-purple-500 mr-2" />
              <Link to="/transactions" className="text-blue-500 hover:underline">
                View Transactions
              </Link>
            </div>
            <div className="flex items-center mb-2">
              <UsersIcon className="w-10 h-10 text-purple-500 mr-2" />
              <Link to="/teams" className="text-blue-500 hover:underline">
                View Teams
              </Link>
            </div>
            <CopyToClipboard text={userData ? `${referralLink}/register?ref=${userData.id}` : ''} onCopy={copyReferralLink}>
              <div className="flex items-center cursor-pointer">
                <ClipboardCopyIcon className="w-10 h-10 text-purple-500 mr-2" />
                <span className="text-blue-500 hover:underline">Copy Referral Link</span>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { UserIcon } from '@heroicons/react/outline';

// ... (previous imports)

const Teams = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.88.106:8000/api/users/teams`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }

        const data = await response.json();
        console.log()
        setTeamData(data.users); // Assuming your team data structure is an array under 'teams'
       
      } catch (error) {
        console.error('Error fetching teams:', error.message);
        setError('Failed to fetch team data. Please try again.'); // Set a user-friendly error message
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
        <p className="ml-2">Loading Teams...</p>
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
        <h2 className="text-2xl font-bold mb-4">Team Overview</h2>

        {teamData.length === 0 ? (
          <p>No team members available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamData.map((teamMember) => (
              <div key={teamMember.id} className="bg-blue-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">User Information</h3>
                <div className="flex items-center mb-2">
                  <UserIcon className="w-10 h-10 text-blue-500 mr-2" />
                  <span className="text-gray-600">Phone: {teamMember.phone || 'N/A'}</span>
                </div>
                {/* Add additional information if available */}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};


export default Teams;

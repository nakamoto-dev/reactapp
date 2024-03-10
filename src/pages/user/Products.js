// Import React and other necessary modules
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import PricingCard from '../../components/PricingCard';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import Swal from 'sweetalert2';

const Products = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const showSuccess = (message) => {
    Swal.fire({
      title: 'Waw!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Cool',
    });
  };

  const showError = (message) => {
    Swal.fire({
      title: 'Ooops!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool',
    });
  };

  // Function to fetch packages from the API
  const fetchPackages = async () => {
    try {
      const response = await fetch('http://192.168.88.106:8000/api/users/packages'); // Replace with your actual API endpoint
      const data = await response.json();
      console.log(data)
      setPackages(data.packages);
      setLoading(false); // Set loading to false once data is fetched

    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };




  const orderPackage = async (id) => {
    try {
      // Your order logic here
      console.log(`Ordering package with ID: ${id}`);
      // Construct the URL with the order ID
      const apiUrl = `http://192.168.88.106:8000/api/users/order?id=${id}`;
  
      // Make the fetch request with async/await
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        ErrorMessage(response.error);
        showError(response.error);
      }
  
      // Parse the response as JSON
      const data = await response.json();
      
      // Handle the data returned from the server
      console.log('Data received:', data);
      if(data.error){
        showError(data.error);
      }else{
        showSuccess(data.message);
      }
  


    } catch (error) {
      // Handle any errors that occurred during the fetch or order logic
      console.error('An error occurred while placing the order', error);
    }
  };
  

  useEffect(() => {
      if (!authToken) {
        // Navigate to the login page if there's no authToken
        navigate('/login');
      }

    // Fetch packages when the component mounts
    fetchPackages();

    // Check if there's no authToken and navigate to the login page
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  return (
    <Layout>
    

        <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                        <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
      <div>
        <h2>Packages - Available</h2>

        {loading ? (
          <p>Loading packages...</p>
        ) : packages.length === 0 ? (
          <p>No packages available.</p>
        ) : (
          packages.map((pack) => (
            <div key={pack.id} onClick={() => orderPackage(pack.id)}>
              <PricingCard product={pack} package={pack} />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Products;

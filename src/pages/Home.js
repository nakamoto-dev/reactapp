// Home.js
import React from 'react';
import Quest from '../components/layouts/Quest';
import { Link } from 'react-router-dom';
import AOS from 'aos'; // Add a smooth scrolling library
import 'aos/dist/aos.css';
import { PlayIcon } from '@heroicons/react/solid';
const Home = () => {
  // Initialize AOS for smooth scrolling animations
  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Quest>
      <section className="bg-light dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 m-2">
          {/* Your existing content */}
          <a href="login" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-sm font-medium">NAKAMOTO AGENCY LTD</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
          </a>

          <h1 class="financial-heading">A <span class="highlight">TRUE</span> FINANCIAL PARTNER</h1>

          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here at Nakamoto, we focus on markets where technology, innovation, and capital can unlock long-term benefits and drive financial growth.
          </p>

          {/* Animated buttons */}
          <div
            className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            data-aos="fade-up"
          >

            <Link
              to="login"
              className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded overflow-hidden  inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              data-aos="fade-up"
            >
              Access Account
            </Link>

            <Link
              to="register"
              className="relative bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded overflow-hidden inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              data-aos="fade-up"
            >
              Create An Account
            </Link>
          </div>

          {/* Featured in section */}
          <div
            className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36"
            data-aos="fade-up"
          >
            <span className="font-semibold text-gray-400 uppercase">FEATURED IN</span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
              <a
                href="youtube_link"
                className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 flex mt-1 dark:hover:text-gray-400"
              >
                {/* Your YouTube link SVG */}
              
                <PlayIcon className="w-8 h-8 text-red-500" /> <p className='mt-1'>YouTube</p>

              </a>
              {/* Add more featured in links as needed */}
            </div>
          </div>
        </div>
      </section>
    </Quest>
  );
};

export default Home;

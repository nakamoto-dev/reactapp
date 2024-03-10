import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { HiQrcode, HiChartBar, HiBell } from 'react-icons/hi';


const Header = (props) => {

  const [greeting, setGreeting] = useState('');
  

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

  return (
    <div className="header fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex">
            {/* Image */}
            <div className="card-logo pt-0 mt-0">
              <img src="logo.png" alt="Logo" className="h-12 w-12 mt-0 pt-0" />
            </div>

            {/* Text */}
            <div className="card-logo ml-4">
              <p className="pb-0 mb-0 text-sm"><b>{greeting},</b></p>
              <small className="text-xs pt-0 mt-0">Earn 6% for inviting</small>
            </div>
          </div>

          <div className="flex items-center">
            {/* QR Code */}
            <div className="qrcode">
              <HiQrcode size="2.0em" />
            </div>

            {/* Analytics */}
            <div className="analytics ml-4">
              <HiChartBar size="2.0em" />
            </div>

            {/* Notification */}
            <div className="notification ml-4">
              <HiBell size="2.0em" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

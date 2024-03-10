import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import { HiQrcode, HiArrowCircleLeft, HiChartBar, HiBell } from 'react-icons/hi';


const InternalNav = () => {
  const location = useLocation();

  return (
    <div className="header fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-1/3">
            {/* Image */}
            <Link to={'/dashboard'}>
              <div className="card-logo pt-0 mt-0">
                <HiArrowCircleLeft size="2.0em" className="h-12 w-12 mt-0 pt-0" />
              </div>
            </Link>
          </div>
          <div className="w-2/3">
            <p>{(location.pathname).slice(1)} page</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalNav;

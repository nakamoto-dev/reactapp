import React from "react";
import { Link } from "react-router-dom";
import { HiHome, HiCurrencyDollar, HiCube, HiUser, HiUsers, HiDocumentText, HiOutlineArrowNarrowDown } from "react-icons/hi";

const Navbar = () => {
   const menuItems = [
      { to: "/dashboard", text: "Home", icon: <HiHome className="inline-block w-4 h-4" /> },
      { to: "/deposit", text: "Deposit", icon: <HiCurrencyDollar className="inline-block w-4 h-4" /> },
      { to: "/products", text: "Products", icon: <HiCube className="inline-block w-4 h-4" /> },
      { to: "/profile", text: "Profile", icon: <HiUser className="inline-block w-4 h-4" /> },
      { to: "/withdrawal", text: "Withdrawals", icon: <HiOutlineArrowNarrowDown className="inline-block w-4 h-4" /> },
   ];

   return (
      <nav className="fixed bottom-0 left-0  w-full bg-gray-800 text-white p-1">
         <ul className="flex justify-evenly bg-gray-800 p-2">
            {menuItems.map((item, index) => (
               <li key={index} className="mr-4">
                  <Link to={item.to} className="text-white hover:text-gray-300 flex flex-col items-center">
                     <span>{item.icon}</span> {/* Icon on top */}
                     <span className="text-xs">{item.text}</span> {/* Text below the icon */}
                  </Link>
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default Navbar;

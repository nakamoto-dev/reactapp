// Quest.js
import React from 'react';
import '../../Quest.css'; // Import the CSS file for styling

const Quest = ({ children }) => {
  return (
    <div className="quest-container">
      <main>{children}</main>
    </div>
  );
};

export default Quest;

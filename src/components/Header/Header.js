import React from 'react';
import './Header.css';

const Header = ({ mosqueName, location }) => {
  return (
    <header className="header">
      <h1>{mosqueName}</h1>
      {location && <h2>{location}</h2>}
    </header>
  );
};

export default Header; 
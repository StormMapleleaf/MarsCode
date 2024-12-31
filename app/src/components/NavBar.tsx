// FILEPATH: /components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface NavBarProps {
  username: string;
}

const NavBar: React.FC<NavBarProps> = ({ username }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-text gradient-text">MarsCode</span>
      </div>
      <div className="navbar-menu">
        <Link to="/user" className="navbar-item">个人信息</Link>
        <span className="navbar-item username">{username}</span>
      </div>
    </nav>
  );
};

export default NavBar;

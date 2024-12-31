// FILEPATH: /components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface NavBarProps {
  username: string;
  role: string;
}

const NavBar: React.FC<NavBarProps> = ({ username,role }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-text gradient-text">MarsCode</span>
      </div>
      <div className="navbar-menu">
        <Link to="/home" className="navbar-item">首页</Link>
        {user.role == 'admin' && (
          <Link to="/control" className="navbar-item">管理</Link>
        )}
        <Link to="/user" className="navbar-item">个人信息</Link>
        <span className="navbar-item username">{username}</span>
      </div>
    </nav>
  );
};

export default NavBar;

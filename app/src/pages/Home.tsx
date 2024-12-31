import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.tsx';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-page">
      <NavBar username={user.name || '用户'} />
      <div className="home-content">
        <h1>欢迎回来，{user.name || '用户'}！</h1>
        <p>这是您的个人主页。</p>
        <button onClick={handleLogout}>登出</button>
      </div>
    </div>
  );
};

export default Home;
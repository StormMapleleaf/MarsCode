import React from 'react';
import NavBar from '../components/NavBar.tsx';
import './User.css';

const User: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="user-page">
      <NavBar username={user.name || '用户'} />
      <div className="user-content">
        <h1>个人信息</h1>
        <p>用户名: {user.name || '未知'}</p>
        {/* 这里可以添加更多用户信息 */}
      </div>
    </div>
  );
};

export default User;
// FILEPATH: d:/github/marscode/app/src/pages/User.tsx
import React from 'react';
import NavBar from '../components/NavBar.tsx';
import './User.css';
import { useNavigate } from 'react-router-dom';

const User: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };


  return (
    <div className="user-page">
      <NavBar username={user.name || '用户'} />
      <div className="user-content">
        <div className="user-card">
          <h1>个人信息</h1>
          <div className="user-info">
            <p><strong>用户名:</strong></p>
            <p>{user.name || '未知'}</p>
            <p><strong>手机号:</strong></p>
            <p>{user.phone_number || '未知'}</p>
            <p><strong>身份:</strong></p>
            <p>{user.role === 'admin' ? '管理员' : '会员'}</p>
            {/* 这里可以添加更多用户信息 */}
          </div>
          <button onClick={handleLogout}>退出登录</button>
        </div>
      </div>
    </div>
  );
};

export default User;

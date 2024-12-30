import React, { useState } from 'react';
import { loginUser } from '../api/api.tsx';
import './Login.css';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginUser({ phone_number: phoneNumber, password });
            const user = response.data.user;
            // 你可以将用户信息存储在 localStorage 或者 context 中
            localStorage.setItem('user', JSON.stringify(user));
            // 重定向到主页或其他页面
            window.location.href = '/';
        } catch (err) {
            setError('登录失败，请检查您的凭据');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>登录</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="phoneNumber">手机号:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">密码:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? '登录中...' : '登录'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
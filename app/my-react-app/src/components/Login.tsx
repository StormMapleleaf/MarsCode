import './Login.css';
import { useState } from 'react';
import Register from './Register';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginUser({ phone_number: phoneNumber, password });
            const user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/';
        } catch (err) {
            setError('登录失败，请检查您的凭据');
        } finally {
            setLoading(false);
        }
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
    };

    return (
        <div className="login-page">
            <h1 className="brand-name">
                {'StormMapleleaf'.split('').map((letter, index) => (
                    <span key={index} style={{ '--delay': `${index * 0.1}s` }}>{letter}</span>
                ))}
            </h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="手机号"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? '登录中...' : '登录'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
            <button onClick={toggleRegister}>
                {showRegister ? '取消注册' : '注册'}
            </button>
            {showRegister && <Register />}
        </div>
    );
};

export default Login;
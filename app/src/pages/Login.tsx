import React, { useState } from 'react';
import { loginUser,registerUser } from '../api/api.tsx';
import './Login.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerPassword !== confirmPassword) {
            setRegisterError('两次密码不一致');
            return;
        }
        setRegisterError('');

        const isConfirmed = window.confirm('您确定要注册吗？');
        if (!isConfirmed) {
            return; // 如果用户取消，则不继续注册流程
        }

        try {
            const response = await registerUser({
                username,
                phone_number: registerPhoneNumber,
                password: registerPassword
            });
            console.log('注册成功', response.data);
            alert('注册成功！请登录。');
            setShowRegister(false);
            // 清空注册表单
            setUsername('');
            setRegisterPhoneNumber('');
            setRegisterPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('注册失败', err);
            setRegisterError('注册失败，请稍后再试');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginUser({ phone_number: phoneNumber, password });
            const user = response.data.user;
            // 你可以将用户信息存储在 localStorage 或者 context 中
            localStorage.setItem('user', JSON.stringify({
                id: user.id,
                name: user.username,
                phone_number: user.phone_number,
                role: user.role
            }));
            // 重定向到主页或其他页面
            navigate('/home');
        } catch (err) {
            setError('登录失败，请检查您的凭据');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
              <h1 className="brand-name">
                    {'StormMapleleaf'.split('').map((letter, index) => (
                        <span key={index} style={{ '--delay': `${index * 0.1}s` }}>{letter}</span>
                    ))}
                </h1>
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
                    <button type="button" onClick={() => setShowRegister(true)} className="register-button">
                    注册
                </button>
                </form>
            </div>
            <Modal
                isOpen={showRegister}
                onRequestClose={() => setShowRegister(false)}
                contentLabel="注册"
                className="register-modal"
                overlayClassName="register-overlay"
            >
                <div className="login-container">
                    <h2>注册</h2>
                    <form onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username">用户名:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="registerPhoneNumber">手机号:</label>
                            <input
                                type="text"
                                id="registerPhoneNumber"
                                value={registerPhoneNumber}
                                onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="registerPassword">密码:</label>
                            <input
                                type="password"
                                id="registerPassword"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">确认密码:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {registerError && <p className="error">{registerError}</p>}
                        <button type="submit">注册</button>
                        <button type="button" onClick={() => setShowRegister(false)} className="cancel-button">取消</button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Login;
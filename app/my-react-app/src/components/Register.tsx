import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await registerUser({ phone_number: phoneNumber, password });
            // 注册成功后可以执行其他操作，比如关闭注册表单
            onClose();
        } catch (err) {
            setError('注册失败，请检查您的信息');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-modal">
            <h2>注册</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>手机号</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>密码</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '注册中...' : '注册'}
                </button>
                <button type="button" onClick={onClose}>
                    取消
                </button>
            </form>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const handleRegisterClick = () => {
        setIsRegisterOpen(true);
    };

    const closeRegisterForm = () => {
        setIsRegisterOpen(false);
    };

    return (
        <div className="app">
            <Login />
            <button onClick={handleRegisterClick}>注册</button>
            {isRegisterOpen && <Register onClose={closeRegisterForm} />}
        </div>
    );
};

export default App;
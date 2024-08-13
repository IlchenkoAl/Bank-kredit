import React, { useState } from 'react';
import './../styles/App.css';

function EmailModal({ show, onClose, onSend, isSending, isSent, error }) {
    const [email, setEmail] = useState('');

    const handleSend = () => {
        onSend(email);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Отправить результаты на почту</h2>
                <input
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSending}
                />
                <button
                    onClick={handleSend}
                    disabled={!email || isSending}
                >
                    {isSending ? 'Отправка...' : 'Отправить'}
                </button>
                <button onClick={onClose}>Закрыть</button>
                {isSent && <p>Email успешно отправлен!</p>}
                {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            </div>
        </div>
    );
}

export default EmailModal;

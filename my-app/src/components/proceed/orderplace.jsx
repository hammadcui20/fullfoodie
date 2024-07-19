import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderPlace({ onClose }) {
    const [timer, setTimer] = useState(1800); // 30 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                navigate('/reviews');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, history]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleClose = () => {
        console.log("Close button clicked!"); // Add this line for debugging
        navigate('/reviews');
    };

    return (
        <div className="OrderPlace fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg relative text-center">
                <button className="absolute top-2 right-2 text-gray-700" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h1 className="text-3xl font-bold mb-4">
                Gracias por tu orden</h1>
                <h2 className="text-xl mb-4">
                Su pedido ha sido realizado exitosamente</h2>
                <div className="text-lg mb-4">
                    <span>Timer: {formatTime(timer)}</span>
                </div>
                <button className="bg-green-700 text-white px-4 py-2 rounded mt-4" onClick={handleClose}>
                Cerca</button>
            </div>
        </div>
    );
}

export default OrderPlace;

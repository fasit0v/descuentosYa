import React, { useEffect } from "react";

const ErrorMessage = ({ message, show, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500); // 3000ms = 3 segundos

        return () => clearTimeout(timer);
    }, [show]);

    return (
        <>
            {show && (
                <div className="p-4 fixed top-0 right-0 z-50 bg-red-600 text-white rounded-l-lg">
                    <p>{message}</p>
                </div>
            )}
        </>
    );
};

export default ErrorMessage;

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
import PopUpMessageContext from "./context";

// Context provider component
export default function PopUpMessageContextProvider({ children }) {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Function to open the popup with a message and type
    const openPopUp = (message, error) => {
        setMessage(message);
        setError(error);
    };

    // Function to close the popup
    const closePopUp = () => {
        setMessage(null);
        setError(null);
    };

    // Automatically close the popup after 2.5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            closePopUp();
        }, 2500);
        return () => clearTimeout(timer);
    }, [message, error]);

    return (
        <PopUpMessageContext.Provider value={{ openPopUp }}>
            {message && (
                <div
                    className={
                        `p-4 fixed top-0 right-0 z-50 text-white rounded-l-lg ` +
                        (error ? " bg-red-500" : " bg-green-400")
                    }
                >
                    <p>{message}</p>
                </div>
            )}
            {children}
        </PopUpMessageContext.Provider>
    );
}

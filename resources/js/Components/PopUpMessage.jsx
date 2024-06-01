import React, { useEffect, useState } from "react";

const PopUpMessage = ({ response }) => {
    const [show, setShow] = useState(false);

    const openPopUp = () => {
        setShow(true);
    };

    const closePopUp = () => {
        setShow(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            closePopUp();
        }, 2500); // 3000ms = 3 segundos

        return () => {
            openPopUp();
            clearTimeout(timer);
        };
    }, [response]);

    return (
        <>
            {show && (
                <div
                    className={`p-4 fixed top-0 right-0 z-50  text-white rounded-l-lg bg-red-500`}
                >
                    <p>{response.message}</p>
                </div>
            )}
        </>
    );
};

export default PopUpMessage;

import React, { useState, useEffect } from "react";

export default function PasswordRequirements({ password }) {
    const [requirements, setRequirements] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
    });

    useEffect(() => {
        const length = password.length >= 8;
        const lowercase = /[a-z]/.test(password);
        const uppercase = /[A-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[@$!%*#?&]/.test(password);

        setRequirements({
            length,
            lowercase,
            uppercase,
            number,
            special,
        });
    }, [password]);

    return (
        <div className="mt-2 text-sm">
            <p
                className={
                    requirements.length ? "text-green-600" : "text-red-600"
                }
            >
                {requirements.length ? "✔" : "✘"} Mínimo 8 caracteres
            </p>
            <p
                className={
                    requirements.lowercase ? "text-green-600" : "text-red-600"
                }
            >
                {requirements.lowercase ? "✔" : "✘"} Al menos una letra
                minúscula
            </p>
            <p
                className={
                    requirements.uppercase ? "text-green-600" : "text-red-600"
                }
            >
                {requirements.uppercase ? "✔" : "✘"} Al menos una letra
                mayúscula
            </p>
            <p
                className={
                    requirements.number ? "text-green-600" : "text-red-600"
                }
            >
                {requirements.number ? "✔" : "✘"} Al menos un número
            </p>
            <p
                className={
                    requirements.special ? "text-green-600" : "text-red-600"
                }
            >
                {requirements.special ? "✔" : "✘"} Al menos un carácter especial
                (@$!%*#?&)
            </p>
        </div>
    );
}

import React from 'react'
import '../styles/auth.css';

const VerifyEmailScreen = () => {
    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="src/Assets/WhatsApp Logo.png" alt="Whatsapp Logo" />
            <h1>
                Se te ha enviado un correo de validación, por favor verifica tu email para ingresar a WhatsApp.
            </h1>
        </div>
    )
}

export default VerifyEmailScreen
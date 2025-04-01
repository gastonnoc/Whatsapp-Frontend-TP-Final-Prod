import React from 'react'
import '../styles/auth.css';

const VerifyEmailScreen = () => {
    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="whatsapp-logo.png" alt="Whatsapp Logo" />
            <h1>
                Se te ha enviado un correo de validación, por favor verifica tu email para ingresar a WhatsApp.
            </h1>
        </div>
    )
}

export default VerifyEmailScreen
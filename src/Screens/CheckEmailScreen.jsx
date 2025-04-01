import React from 'react'
import '../styles/auth.css';

const CheckEmailScreen = () => {
    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="src/Assets/WhatsApp Logo.png" alt="Whatsapp Logo" />
            <h1>
                Se te ha enviado un correo para restablecer tu contraseña, por favor sigue las instrucciones de ese correo para hacerlo.
            </h1>
        </div>
    )
}

export default CheckEmailScreen
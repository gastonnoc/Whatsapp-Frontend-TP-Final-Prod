import React from 'react'
import '../styles/auth.css';

const CheckEmailScreen = () => {
    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="whatsapp-logo.png" alt="Whatsapp Logo" />
            <h1 style={{textAlign: 'center'}}>
                Se te ha enviado un correo para restablecer tu contraseña, por favor sigue las instrucciones de ese correo para hacerlo.
            </h1>
        </div>
    )
}

export default CheckEmailScreen
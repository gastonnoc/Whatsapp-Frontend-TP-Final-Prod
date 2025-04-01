import React from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIRONMENT from '../config/environment'
import '../styles/auth.css'
import { useNavigate } from 'react-router-dom'

const ResetPasswordScreen = () => {
    const navigate = useNavigate()
    const initialFormState = {
        email: ''
    }

    const { formState, handleChangeInput } = useForm(initialFormState)
    const { responseApiState, putRequest } = useApiRequest(ENVIRONMENT.URL_API + '/api/auth/reset-password')

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        // Llamamos a putRequest y esperamos la respuesta.
        const response = await putRequest(formState)

        // Verificamos si la respuesta tiene la propiedad `ok` que indica que el email está registrado.
        if (response && response.ok) {
            // Si la respuesta es correcta, redirigimos al usuario a /check-email
            navigate('/check-email')
        } else {
            // Si no, no hacemos nada y simplemente mostramos el error.
            // No redirigimos y dejamos que el error aparezca en la interfaz.
        }
    }

    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="src/Assets/WhatsApp Logo.png" alt="Whatsapp Logo" />
            <div className='auth-content'>
                <h1 className='auth-h1'>Restablece tu contraseña</h1>
                <form className='auth-form' onSubmit={handleSubmitForm}>
                    <div className='auth-input-wrapper'>
                        <label htmlFor='email'></label>
                        <input className='auth-input'
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Escribe tu email'
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {responseApiState.error &&
                        <span style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', letterSpacing: '1px' }}>
                            {responseApiState.error}
                        </span>
                    }

                    {responseApiState.loading
                        ? <span style={{ textAlign: 'center' }}>Cargando...</span>
                        : <button className='iniciar-sesion-btn'>Restablecer contraseña</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordScreen

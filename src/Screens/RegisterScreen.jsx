import React from 'react'
import ENVIRONMENT from '../config/environment'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import'../styles/auth.css'
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
    const navigate = useNavigate();  
    const formInitialState = {
        username: '',
        email: '',
        password: '',
        profile_image_base64: ''
    }
    const { formState, handleChangeInput } = useForm(formInitialState)

    const {responseApiState, postRequest } = useApiRequest(ENVIRONMENT.URL_API + '/api/auth/register')


    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log('Formulario enviado:', formState);
    
        const response = await postRequest(formState);
    
        if (response && response.ok) {
            try {
                const userToStore = {
                    username: response.data.username || '',
                    email: response.data.email || '',
                    profile_image_base64: response.data.profile_image_base64 || '',
                };
                localStorage.setItem('user', JSON.stringify(userToStore));
                console.log('Usuario registrado guardado en localStorage:', userToStore);
            } catch (error) {
                console.error('Error al guardar en localStorage:', error);
            }
            navigate('/verify-email');
        }

    };
    


    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="whatsapp-logo.png" alt="Whatsapp Logo" />
            <div className='auth-content'>
                <h1 className='auth-h1'>Registrate en WhatsApp</h1>
                <form className='auth-form' onSubmit={handleSubmitForm}>
                    <div className='auth-input-wrapper'>
                        <label htmlFor='username'></label>
                        <input className='auth-input'
                            placeholder='Ingresa tu nombre de usuario'
                            type='text'
                            id='username'
                            name='username'
                            value={formState.username}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'></label>
                        <input className='auth-input'
                            placeholder='Ingresa tu email'
                            type='email'
                            id='email'
                            name='email'
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'></label>
                        <input className='auth-input'
                            placeholder='Ingresa tu contraseña'
                            type='password'
                            id='password'
                            name='password'
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {
                        responseApiState.error && <span style={{color: 'red', textAlign: 'center', fontWeight: 'bold', letterSpacing: '1px'}}>{responseApiState.error}</span>
                    }
                    {
                        responseApiState.loading
                            ? <span style={{textAlign: 'center'}} className='cargando'>Cargando</span>
                            : <button className='iniciar-sesion-btn' type='submit' >Registrarse</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
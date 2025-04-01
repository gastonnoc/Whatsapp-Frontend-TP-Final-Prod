import React, { useContext, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { useApiRequest } from '../hooks/useApiRequest';
import ENVIRONMENT from '../config/environment';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../styles/auth.css';

const LoginScreen = () => {
    const { login, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();  

    const initialFormState = {
        email: '',
        password: ''
    };

    const { formState, handleChangeInput } = useForm(initialFormState);
    const { responseApiState, postRequest } = useApiRequest(ENVIRONMENT.URL_API + '/api/auth/login');

    useEffect(() => {
        console.log('Respuesta de la API:', responseApiState); 
    
        if (responseApiState.data && !responseApiState.loading) {
            const userData = responseApiState.data.data;
    
            if (!userData || !userData.authorization_token || !userData.user) {
                console.error('⚠️ Error: No se recibió token de autorización o datos de usuario válidos.');
                return;
            }
    
            const user = userData.user;
    
            console.log('Estructura de los datos de usuario:', user);
    
            login(userData.authorization_token); 
    
            try {
                if (user.username && user.email) {
                    const userToStore = {
                        username: user.username,
                        email: user.email,
                        profile_image_base64: user.profile_image_base64 || '',
                    };
                    setUserData(userToStore);  
                    localStorage.setItem('user', JSON.stringify(userToStore)); 
                    console.log('✅ Usuario guardado en el contexto y localStorage:', userToStore);
                } else {
                    console.warn('⚠️ Advertencia: La API no devolvió username o email.');
                }
            } catch (error) {
                console.error('❌ Error al guardar en localStorage:', error);
            }
    
            navigate('/home');
        }
    }, [responseApiState, login, setUserData, navigate]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log('🔄 Enviando datos al backend:', formState);
        await postRequest(formState);
    };

    return (
        <div className='auth-wrapper'>
            <Link to="/register">
                <button className='register-btn'>Crear cuenta nueva</button>
            </Link>

            <img className='auth-logo' src="default-user.jpg" alt="Whatsapp Logo" />

            <div className='auth-content'>
                <h1 className='auth-h1'>Inicia sesión en WhatsApp</h1>

                <form className='auth-form' onSubmit={handleSubmitForm}>
                    <div className='auth-input-wrapper'>
                        <label htmlFor='email'></label>
                        <input className='auth-input'
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Ingresa tu email'
                            value={formState.email}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div>
                        <label htmlFor="password"></label>
                        <input className='auth-input'
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Ingresa tu contraseña'
                            value={formState.password}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {responseApiState.error && <span style={{color: 'red', textAlign: 'center', fontWeight: 'bold', letterSpacing: '1px'}}>{responseApiState.error}</span>}
                    {
                        responseApiState.loading
                            ? <span style={{textAlign: 'center'}}>Cargando...</span>
                            : <button className='iniciar-sesion-btn'>Iniciar sesión</button>
                    }

                    <div className='reset-password'>
                        <span>¿Olvidaste tu contraseña?</span> <br />
                        <Link to="/reset-password" className='reset-password-link'>
                            Click aquí
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;

/* import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIRONMENT from '../config/environment'
import '../styles/auth.css'
import { useNavigate } from 'react-router-dom'

const RewritePasswordScreen = () => {
    const navigate = useNavigate()
    const [resetToken, setResetToken] = useState(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const token = searchParams.get('reset_token')
        if (!token) {
            navigate('/rewrite-password')
        } else {
            setResetToken(token)
        }
    }, [navigate])

    const initialFormState = {
        newPassword: '',
        rewriteNewPassword: ''
    }

    const { formState, handleChangeInput } = useForm(initialFormState)
    const { responseApiState, postRequest } = useApiRequest(ENVIRONMENT.URL_API + '/api/auth/rewrite-password')

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (formState.newPassword !== formState.rewriteNewPassword) {
            alert('Las contraseñas no coinciden')
            return
        }
        await postRequest({ newPassword: formState.newPassword, reset_token: resetToken })
        navigate('/');
    }

    return (
        <div className='auth-wrapper'>
            <img className='auth-logo' src="whatsapp-logo.png" alt="Whatsapp Logo" />
            <div className='auth-content'>
                <h1 className='auth-h1'>Restablece tu contraseña</h1>
                <form className='auth-form' onSubmit={handleSubmitForm}>
                    <div className='auth-input-wrapper'>
                        <label htmlFor='newPassword'></label>
                        <input className='auth-input'
                            placeholder='Escribe tu nueva contraseña'
                            type='password'
                            id='newPassword'
                            name='newPassword'
                            value={formState.newPassword}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className='auth-input-wrapper'>
                        <label htmlFor='rewriteNewPassword'></label>
                        <input className='auth-input'
                            placeholder='Vuelve a escribir la contraseña'
                            type='password'
                            id='rewriteNewPassword'
                            name='rewriteNewPassword'
                            value={formState.rewriteNewPassword}
                            onChange={handleChangeInput}
                        />
                    </div>

                    {responseApiState.error && <span style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', letterSpacing: '1px' }}>{responseApiState.error}</span>}
                    {
                        responseApiState.loading
                            ? <span style={{textAlign: 'center'}}>Cargando</span>
                            : <button className='iniciar-sesion-btn'>Restablecer contraseña</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default RewritePasswordScreen
 */

import React, { useEffect } from 'react'
import { useForm } from '../hooks/useForm'
import { useApiRequest } from '../hooks/useApiRequest'
import ENVIROMENT from '../config/enviroment'
import { useNavigate, useSearchParams } from 'react-router-dom'



const RewritePasswordScreen = () => {
    const navigate = useNavigate()
    /* Forma con react router dom */
    const [searchParams] = useSearchParams(window.location.search)
    const reset_token = searchParams.get('reset_token')
    useEffect(
        ()=>{
            
            if(!reset_token) {
                navigate('/')
            }
        
        },
        []
    )
    

    /* 
	Forma nativa
    useEffect(
        ()=>{
            const searchParams = new URLSearchParams(window.location.search)
            const reset_token = searchParams.get('reset_token')
            if(!reset_token) {
                navigate('/login')
            }
        },
        []
    ) */
    
	const initialFormState ={
		password: ''
	}

	const { formState, handleChangeInput } = useForm(initialFormState)
	const { responseApiState, putRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/rewrite-password')

    useEffect(
        ()=>{
            if(responseApiState.data) {
                navigate('/')
            }
        }, 
        [responseApiState]
    )

	const handleSubmitForm = async (e) =>{
		e.preventDefault()
        //                 Nueva pass                    Reset_token
		await putRequest({password: formState.password, reset_token})
	}


    /* 
    Tarea:

    PUT /api/auth/reset-password
    body: {
        password: '',
        reset_token
    }
    Validara que el token sea correcto, el token tendra dentro el _id del usuario.
    Ustedes deberan buscar a ese usuario y modificar la contraseña por la nueva contraseña (que previamente encriptaran)
    */

	return (
		<div className='content'>
			<h1 className='recuperar'>Establecer nueva contraseña</h1>
			<form onSubmit={handleSubmitForm}>
				<div className='mail'>
					<label htmlFor='password'>Nueva contraseña</label>
					<input 
						type="text" 
						id='password' 
						name='password' 
						placeholder='NuevaContraseña' 
						value={formState.password} 
						onChange={handleChangeInput} 
					/>
				</div>

				{responseApiState.error && <span style={{color: 'red'}}>{responseApiState.error}</span>}
				{
					responseApiState.loading
					? <span>Cargando</span>
					: (
                        responseApiState.data 
                        ? <span>Enviado</span>
                        : <button>Establecer nueva contraseña</button>
                    )
				}
			</form>
		</div>
	)
}

export default RewritePasswordScreen
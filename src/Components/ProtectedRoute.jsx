import React from 'react'
import { AuthContext } from '../context/AuthContext'
import {Navigate, Outlet} from 'react-router-dom'
import {useContext} from 'react'

const ProtectedRoute = () => {
    //Llama al isAuthenticatedState
    const {isAuthenticatedState} = useContext(AuthContext)
    return (
        isAuthenticatedState
        ? <Outlet/>
        : <Navigate to = {'/login'} />
    ) 
}

export default ProtectedRoute
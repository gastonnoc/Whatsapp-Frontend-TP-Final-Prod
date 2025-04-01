import React from 'react'
import { AuthContext } from '../Context/AuthContext'
import {Navigate, Outlet} from 'react-router-dom'
import {useContext} from 'react'

const ProtectedRoute = () => {

    const {isAuthenticatedState} = useContext(AuthContext)
    return (
        isAuthenticatedState
        ? <Outlet/>
        : <Navigate to = {'/login'} />
    ) 
}

export default ProtectedRoute
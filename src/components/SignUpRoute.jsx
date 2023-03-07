import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

export default function SignUpRoute() {
    const { checkingStatus, loggedIn } = useAuthStatus();
    if(checkingStatus){
        return (
            <h3>Loading...</h3>
        );
    }
    return loggedIn ? <Navigate to="/profile" /> : <Outlet />;
}

import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from '../components/Spinner';

export default function PrivateRoute() {
    const { checkingStatus, loggedIn } = useAuthStatus();
    if(checkingStatus){
        return (
            <Spinner />
        );
    }
    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

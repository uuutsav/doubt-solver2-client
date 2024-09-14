import React from 'react'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../recoil/atoms/authAtom'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const authState = useRecoilValue(authAtom);

    return (
        authState.isAuthenticated ? <Outlet /> : <Navigate to={`/login`} />
    )
}

export default ProtectedRoute
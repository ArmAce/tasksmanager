import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

import { useAuth} from '../hooks';

const ProtectedRoute = ({ children, redirect="/" }) => {
    const { user, storedUser } = useAuth();
    
    if(user.isAuth || storedUser.isAuth) {
        return (children ? children : <Outlet/>) 
    } else {
        return <Navigate to={redirect} replace />;
    }
}

export default ProtectedRoute;


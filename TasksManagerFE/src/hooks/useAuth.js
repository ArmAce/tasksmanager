import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, logIn, setUser } from '../redux/slices/userSlice';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '.';

import { INITIAL_USER } from '../constants/initials';
import { checkUser, userCreate } from '../api/apiAuth';

import jwt from 'jsonwebtoken';

const useAuth = () => {
    const { user } = useSelector(state => state.user)
    const [ storedUser, setStoredUser, deleteStoredUser ] = useLocalStorage('user', INITIAL_USER.AUTH)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(user.isAuth && user.remember) {
            setStoredUser(user);
        }
    }, [user.isAuth, user.remember]);

    useEffect(() => {
        const setStoredUser = async () => {
            const res = await checkUser(storedUser.token);
            if(res.status!=401) {
                dispatch(setUser(storedUser));
            } 
        }

        if(!user.isAuth && storedUser.isAuth) {
            const decodedToken=jwt.decode(storedUser.token, {complete: true}).payload;
            const dateNow = Math.trunc(new Date().getTime()/1000);
            if(decodedToken.exp < dateNow){
                deleteStoredUser('user');
                navigate('/login')
                return () => {
                    console.log('sloggato')
                }
            }

            setStoredUser();
        }
    }, [storedUser]);


    const userLogOut = () => {
        (user.isAuth || storedUser.isAuth) && dispatch(logOut());
        deleteStoredUser('user');
        navigate('/login')
    }

    const userLogIn = (data) => {
        dispatch(logIn(data));
    }

    const userRegister = async (data) => {
        await userCreate(data);
        navigate('/login')
    }

    return { userLogOut, userLogIn, user, storedUser, userRegister };
}

export default useAuth;
import axios from 'axios';
import { ENDPOINTS_AUTH } from '../constants/endpoint';

export const userLogin = async (payload) => {
    try {
        const res = await axios.post(ENDPOINTS_AUTH.LOGIN, payload)
        console.log(res)
        return res;
    } catch(e) {
        return {
            data: {
                error: true,
                code: e.code
            }
        };
    }
}


export const userCreate = async (payload) => {
    try {
        const res = await axios.post(ENDPOINTS_AUTH.CREATE, payload)
        return res;
    } catch(e) {
        return {
            data: {
                error: true,
                code: e.code
            }
        };
    }
}

export const checkUser = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await axios.get(ENDPOINTS_AUTH.CHECK, config)
        console.log(res)
        return res;
    } catch(e) {
        return {
            data: {
                error: true,
                code: e.code
            }
        };
    }
}

import axios from 'axios';
import { ENDPOINTS_TASKS } from '../constants/endpoint';

export const getAllTasks = async () => {
    const token = getToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await axios.get(ENDPOINTS_TASKS.ALL, config)
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

export const createTask = async (payload) => {
    const token = getToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await axios.post(ENDPOINTS_TASKS.ADD, payload, config)
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

export const deleteTask = async (id) => {
    const token = getToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await axios.delete(`${ENDPOINTS_TASKS.ALL}/${id}`, config)
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

export const patchTask = async (id, payload) => {
    const token = getToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    try {
        const res = await axios.patch(`${ENDPOINTS_TASKS.ALL}/${id}`, payload, config)
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

const getToken = () => {
    const item = window.localStorage.getItem('user');
    return item ? JSON.parse(item).token : ''
}

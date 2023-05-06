import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from './useAuth';
import { getAll, addNew, delTask, updateTask } from '../redux/slices/tasksSlice';

const useTasks = () => {
    const { user } = useAuth();
    const { tasks } = useSelector(state => state.tasks)
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.isAuth && user.remember) {
            dispatch(getAll())
        }
    }, [user.isAuth]);

    const addTask = (data) => {
        dispatch(addNew(data));
    }

    const deleteTask = (id) => {
        dispatch(delTask(id));
    }

    const editTask = (id, data) => {
        dispatch(updateTask({ id: id, payload: data}));
    }

    const completeTask = (id) => {
        dispatch(updateTask({ id: id, payload: {done:true}}));
    }

    return { tasks, addTask, deleteTask, editTask, completeTask };
}

export default useTasks;
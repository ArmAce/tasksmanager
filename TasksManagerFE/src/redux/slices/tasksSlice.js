import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTasks, createTask, deleteTask, patchTask } from "../../api/apiTasks";

export const getAll = createAsyncThunk('tasks/all', async () => {
    const res = await getAllTasks();
    
    console.log(res.data)
    return res.data;
})

export const addNew = createAsyncThunk('task/add', async (data) => {
    const res = await createTask(data);
    
    console.log(res.data)
    return res.data;
})

export const delTask = createAsyncThunk('task/delete', async (data) => {
    const res = await deleteTask(data);
    
    console.log(res.data)
    return res.data;
})

export const updateTask = createAsyncThunk('task/update', async (data) => {
    console.log('data',data)
    const res = await patchTask(data.id, data.payload);
    
    console.log(res.data)
    return res.data;
})


export const tasks = createSlice({
    name: "tasks",
    initialState: {
       tasks: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.tasks =action.payload
        })
        .addCase(addNew.fulfilled, (state, action) => {
            state.tasks = [action.payload, ...state.tasks]
        })
        .addCase(delTask.fulfilled, (state, action) => {
            console.log(action)
            state.tasks = state.tasks.filter(function( obj ) {
                return obj.id !== action.payload.id;
            });
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            console.log(action)
            const finded = state.tasks.find(function( obj ) {
                return obj.id === action.payload.id;
            });
            if(finded){
                finded.title=action.payload.title;
                finded.content=action.payload.content;
                finded.done=action.payload.done;
            }
        })
       
    }
});

export const {  } = tasks.actions;
export default tasks.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../../api/apiAuth";
import { INITIAL_USER } from "../../constants/initials";

export const logIn = createAsyncThunk('user/login', async (data) => {
    const res = await userLogin(data);
    
    console.log({...res.data, remember: data.remember})
    return {...res.data, remember: data.remember};
})

export const user = createSlice({
    name: "user",
    initialState: {
        user: INITIAL_USER.AUTH
    },
    reducers: {
        logOut:(state, action) => {
            state.user = INITIAL_USER.AUTH;
        },
        setUser: (state, action) => {
            state.user = {
                isAuth: action.payload.isAuth,
                token: action.payload.token,
                username: action.payload.username,
                remember: action.payload.remember,
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(logIn.fulfilled, (state, action) => {
            state.user = {
                isAuth: action.payload.token ? true : false,
                token: action.payload.token ? action.payload.token : undefined,
                username: action.payload.user.name ? action.payload.user.name : undefined,
                remember: action.payload.remember ? action.payload.remember : false,
            }
        })
    }
});

export const { logOut, setUser } = user.actions;
export default user.reducer;

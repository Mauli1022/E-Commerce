import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token : null
}

export const registerUser = createAsyncThunk('/auth/register',

    async (formData) => {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,
            formData, {
            withCredentials: true
        })
        return response.data
    }
)

export const loginUser = createAsyncThunk('/auth/login',

    async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
                formData, {
                withCredentials: true
            })
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)

/*
export const checkAuth = createAsyncThunk("/auth/checkauth",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
            {
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                }
            },
        )
        return response.data
    }
)
*/

export const checkAuth = createAsyncThunk("/auth/checkauth",
    async (token) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
            {
                headers: {
                    Authorization : `Bearer ${token}`,
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                }
            },
        )
        return response.data
    }
)

export const logOutUser = createAsyncThunk('/auth/logout',

    async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{},{
                withCredentials : true
            })
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {},
        
        resetTokenAndCredentials : (state)=>{
            state.isAuthenticated = false
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.user = !action.payload.success ? null : action.payload.user;
                state.isAuthenticated = action.payload.success;
                state.token = action.payload.token
                sessionStorage.setItem("token",JSON.stringify(action.payload.token))
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.token = null
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.user = action?.payload?.success ? action.payload.user : null 
                state.isAuthenticated = action?.payload?.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                // console.log(action);
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logOutUser.fulfilled,(state)=>{
                state.isLoading = false,
                state.user = null,
                state.isAuthenticated = false
            })
    }
})
export const { setUser,resetTokenAndCredentials } = authSlice.actions
export default authSlice.reducer
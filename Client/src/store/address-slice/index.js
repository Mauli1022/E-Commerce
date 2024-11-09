import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    userAddress : []
}

// async thunk to add Address 
export const addAddress = createAsyncThunk(
    "/address/addAddress",
    async (formData)=>{
        // console.log(formData);
        const response = await axios.post("http://localhost:8000/api/address/add-address",formData)
        return response.data;
    }
)

// async thunk to get All User Address
export const fetchAllAddress = createAsyncThunk(
    "/address/fetchAddress",
    async({userId})=>{
        const response = await axios.get(`http://localhost:8000/api/address/get-address/${userId}`)

        return response.data;
    }
)
// async thunk to update User Address
export const updateAddress = createAsyncThunk(
    "/address/updateAddress",
    async ({userId, addressId,formData})=>{
        const response = await axios.put(`http://localhost:8000/api/address/update-address/${userId}/${addressId}`,formData)
        return response.data;
    }
)
// async thunk to delete User Address
export const deleteAddress = createAsyncThunk(
    "/address/deleteAddress",
    async ({userId,addressId})=>{
        console.log("UserId",userId,"addressId",addressId);
        
        const response = await axios.delete(`http://localhost:8000/api/address/delete-address/${userId}/${addressId}`)
        return response.data
    }
)

export const addressSlice = createSlice({
    name : "address",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(addAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addAddress.fulfilled,(state,action)=>{
            // console.log(action);
            state.isLoading = false
            // state.userAddress = action.payload.data
        })
        .addCase(addAddress.rejected,(state,action)=>{
            state.isLoading = false
            // state.userAddress = []
        })
        .addCase(fetchAllAddress.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchAllAddress.fulfilled,(state,action)=>{
            // console.log(action.payload);
            
            state.isLoading = false,
            state.userAddress = action.payload.data
        })
        .addCase(fetchAllAddress.rejected,(state,action)=>{
            state.isLoading = false,
            state.userAddress = []
        })
    }
})

export default addressSlice.reducer
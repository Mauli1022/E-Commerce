import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    images : []
}

export const addFeatureImage = createAsyncThunk("/common/addImage",
    async(image)=>{
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/feature-image/add-image`,{image})
        return response.data;
    }
)

export const getFeatureImage = createAsyncThunk("/common/fetchImage",
    async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/feature-image/get-image`)
        return response.data;
    }
)

export const deleteFeatureImage = createAsyncThunk("/common/deleteFeatureImage",
    async(id)=>{
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/feature-image/delete-image/${id}`)
        return response.data;
    }
)



const commonSlice = createSlice({
    name : "commonSlice",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(getFeatureImage.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getFeatureImage.fulfilled,(state,action)=>{
            state.isLoading = false
            state.images = action.payload.data
        })
        .addCase(getFeatureImage.rejected,(state,action)=>{
            state.isLoading = false
            state.images = null
        })
    }
})

export default commonSlice.reducer;
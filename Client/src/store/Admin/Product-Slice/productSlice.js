// Product Slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    productList: []
}

// async Thunk to create a new Product
export const addNewProduct = createAsyncThunk(
    "/products/addnewProduct",
    async (formData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/add-product`, formData, {
            headers: {
                'Content-Type': "application/json"
            }
        })
        return result.data

    })

// Async Thunk to Fetch All Product
export const fetchAllProduct = createAsyncThunk(
    "/products/addnewProduct",
    async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getall-product`)
        return result.data
    })

// Async Thunk to Updata a Product
export const updataAProduct = createAsyncThunk(
    "/products/addnewProduct",
    async ({id,formData}) => {
        // console.log(id,formData);
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/update-product/${id}`, formData)

        console.log(result.data);
        
        return result.data
    })

// asunc Thunk to Delete a Product
export const deleteProduct = createAsyncThunk(
    "/products/addnewProduct",
    async (id) => {
        console.log(id);
        
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/delete-product/${id}`)
        return result.data
    })

// Admin Product Slice ---------------------------------------------------------------------
const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewProduct.pending, (state) => {
            state.isLoading = true
        })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                // console.log("Add New Product",action.payload.data);

                state.isLoading = false,
                    state.productList = action.payload.data
            })
            .addCase(addNewProduct.rejected, (state, action) => {
                // console.log("Add New Product",action.payload.data);
                state.isLoading = false,
                    state.productList = []
            })
    }
})

export default adminProductSlice.reducer
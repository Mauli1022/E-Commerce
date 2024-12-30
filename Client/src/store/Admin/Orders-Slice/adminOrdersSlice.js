// import { resetOrderDetails } from "@/store/order-slice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    orderList : [],
    orderDetails : null
}


// async thunk to fetch all Order of users
export const getAllUsersOrderForAdmin = createAsyncThunk("/order/getAllOrderofAllUserForAdmin",
    async()=>{
        const response = await axios.get(`http://localhost:8000/api/admin-order/all-users-order`);

        return response.data;
})

// async thunk to fetch single Order Details
export const getSingleOrderDetailsForAdmin = createAsyncThunk("/order/getSingleOrderDetailsforAdmin",
    async(id)=>{
        const response = await axios.get(`http://localhost:8000/api/admin-order/admin-order-details/${id}`);
        return response.data;
})

// Async thunk to update Order Status
export const updateOrderStatus = createAsyncThunk("/order/updateOrderStatus",
    async({id,orderStatus})=>{
        const response = await axios.put(`http://localhost:8000/api/admin-order/update-order-status/${id}`,{orderStatus});
        return response.data;
})


const adminOrderSlice = createSlice({
    name : "adminOrderSlice",
    initialState,
    reducers : {
        resetOrderDetails :(state)=>{
            state.orderDetails = null

        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllUsersOrderForAdmin.pending, (state)=>{
                    state.isLoading = true
                    
                })
                .addCase(getAllUsersOrderForAdmin.fulfilled, (state, action)=>{
                    // console.log(action.payload.data);
                    
                    state.isLoading = false
                    state.orderList = action.payload.data
                })
                .addCase(getAllUsersOrderForAdmin.rejected, (state, action)=>{
                    state.isLoading = false
                    state.orderList = null
                })
                .addCase(getSingleOrderDetailsForAdmin.pending, (state)=>{
                    state.isLoading = true
                })
                .addCase(getSingleOrderDetailsForAdmin.fulfilled, (state, action)=>{
                    // console.log('Async Thunk Index File : ' , action.payload.data);
                    
                    state.isLoading = false
                    state.orderDetails = action.payload.data
                })
                .addCase(getSingleOrderDetailsForAdmin.rejected, (state, action)=>{
                    state.isLoading = false
                    state.orderDetails = null
                   
                })
    }
})

export const { resetOrderDetails} = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
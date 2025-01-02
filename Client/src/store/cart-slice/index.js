import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isLoading : false,
    cartItems : []
}

export const addToCart = createAsyncThunk("/cart/addToCart", 
    async({userId, productId, quantity})=>{
        // console.log(userId, productId, quantity);
        
    const response = await axios.post("http://localhost:8000/api/cart/add-cart-product",{
        userId,productId,quantity
    },
)
    return response.data
})

export const fetchCartItems = createAsyncThunk("/cart/fetchCartItems", 
    async(userId)=>{

    const response = await axios.get(`http://localhost:8000/api/cart/fetch-cart-product/${userId}`)
    return response.data
})

export const updateCartItems = createAsyncThunk("/cart/updateCartItems", 
    async({userId, productId, quantity})=>{
        // console.log("User Update Thunk",userId ,productId, quantity );
        
    const response = await axios.put("http://localhost:8000/api/cart/update-cart-product",{
        userId,productId,quantity
    })
    return response.data
})

export const deleteCartItem = createAsyncThunk("/cart/deleteCartItem", 
    async({userId, productId})=>{
        
    const response = await axios.delete(`http://localhost:8000/api/cart/delete-cart-product/${userId}/${productId}`)
    return response.data
})


const shoppingCartSlice = createSlice({
    name : "shoppingCart",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(addToCart.pending,(state)=>{
            state.isLoading = true,
            state.cartItems = []
        })
        .addCase(addToCart.fulfilled, (state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(addToCart.rejected,(state,action)=>{
            // console.log(action);
            state.isLoading = false,
            state.cartItems = []
        })
        .addCase(fetchCartItems.pending,(state)=>{
            state.isLoading = true,
            state.cartItems = []
        })
        .addCase(fetchCartItems.fulfilled, (state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(fetchCartItems.rejected,(state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.cartItems = []
        })
        .addCase(updateCartItems.pending,(state)=>{
            state.isLoading = true,
            state.cartItems = []
        })
        .addCase(updateCartItems.fulfilled, (state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(updateCartItems.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false,
            state.cartItems = []
        })
        .addCase(deleteCartItem.pending,(state)=>{
            state.isLoading = true,
            state.cartItems = []
        })
        .addCase(deleteCartItem.fulfilled, (state,action)=>{
            // console.log(action.payload);
            state.isLoading = false,
            state.cartItems = action.payload.data
        })
        .addCase(deleteCartItem.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading = false,
            state.cartItems = []
        })
    }

})

export default shoppingCartSlice.reducer
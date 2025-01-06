import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading :  false,
    searchResults : []
}

export const searchResultThunk = createAsyncThunk("/search/searchAsyncThunk",
    async(keyword)=>{

        const response = await axios.get(`http://localhost:8000/api/search-shop/search/${keyword}`)
        return response.data;

    }
)

const searchSlice = createSlice({
    name : "searchSlice",
    initialState,
    reducers : {
        resetSearchResults : (state)=>{
            state.searchResults = []
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(searchResultThunk.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(searchResultThunk.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.searchResults = action.payload.data
        })
        .addCase(searchResultThunk.rejected,(state,action)=>{
            state.isLoading = false,
            state.searchResults = null
        })
    }
})

export const { resetSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCartAT = createAsyncThunk('FETCH_CART',async()=>{
    const email = localStorage.getItem('email');
    try{
        const response = await axios.get(`https://backend-node-2-uhkv.onrender.com/ARA/getCart/${email}` );
        return response.data; // Return the cart data if successful
    }catch(error){
        throw new Error(error.response?.data?.message || error.message);
    }
})

const initialState = {
    Isloading:false,
    cart:{},
    error:''
}

const cartReducer = createSlice({
    name:'cart',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchCartAT.pending,(state,action)=>{
            state.Isloading=true;
            state.error='';
        });
        builder.addCase(fetchCartAT.fulfilled,(state,action)=>{
            state.Isloading=false;
            state.cart=action.payload;
            state.error='';
        });
        builder.addCase(fetchCartAT.rejected,(state,action)=>{
            state.Isloading=false;
            state.cart={};
            state.error=action.payload;
        });
    }
});

export default cartReducer.reducer;
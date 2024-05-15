import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products:[]
}
const cartSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        addproducts:(state,action)=>{
            state.products.push(action.payload);
            console.log(action.payload);
            state.products.quantity = state.products.quantity+1;
            state.products.index= state.products.index+1;
        }
    }
})

export const {addproducts} = cartSlice.actions;
export default cartSlice.reducer
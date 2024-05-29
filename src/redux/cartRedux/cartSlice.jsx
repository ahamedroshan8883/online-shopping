import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products:[],
    cartTotalquantity:0,
    cartTitalAmount:0
}
const cartSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        addproducts:(state,action)=>{
            const temppro = {...action.payload,cartQuantiy:1};
            state.products.push(temppro);
            console.log(action.payload);
        }
    }
})

export const {addproducts} = cartSlice.actions;
export default cartSlice.reducer
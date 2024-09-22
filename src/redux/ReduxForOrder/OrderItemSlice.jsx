import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    OrderItems:{}
}
const OrderSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        OrderItemsCheckout:(state,action)=>{
            state.OrderItems=action.payload;
        },
        cleartOrderItems:(state,action)=>{
            state=initialState;
        }
    }
})

export const {OrderItemsCheckout,cleartOrderItems} = OrderSlice.actions;
export default OrderSlice.reducer
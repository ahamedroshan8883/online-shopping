import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products:[],
    cartTotalquantity:0,
    cartTotalAmount:0
}
const cartSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        addproducts:(state,action)=>{
            const itemIndex = state.products.findIndex(item=>item.id===action.payload.id);
            state.cartTotalquantity += 1;
            state.cartTotalAmount +=action.payload.price;
            if(itemIndex>=0){
                state.products[itemIndex].cartQuantity += 1;
            }else{
            const temppro = {...action.payload,cartQuantity:1};
            state.products.push(temppro);
            }
            console.log(action.payload);
        }
    }
})

export const {addproducts} = cartSlice.actions;
export default cartSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products:[],
    cartTotalquantity:0,
    cartTotalAmount:0,
    shippingQuantity:[],
    shippingProductid:[]
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
        },
        removeproduct:(state,action)=>{
            const tempProducts = state.products.filter(item=>item.id!==action.payload.id);
            state.cartTotalAmount -= Number(action.payload.price)*Number(action.payload.cartQuantity)
            state.cartTotalquantity -= action.payload.cartQuantity;
            state.products = tempProducts;
        },
        decreseProductquantity:(state,action)=>{
           const itemIndex =  state.products.findIndex(product=>product.id==action.payload.id);
           if(state.products[itemIndex].cartQuantity>1){
            state.products[itemIndex].cartQuantity -= 1;
            state.cartTotalAmount -= state.products[itemIndex].price;
           }else if(state.products[itemIndex].cartQuantity===1){
            const tempProducts = state.products.filter(item=>item.id!==action.payload.id);
            state.cartTotalAmount -= Number(action.payload.price)*Number(action.payload.cartQuantity)
            state.cartTotalquantity -= action.payload.cartQuantity;
            state.products = tempProducts;
           }
        // console.log(state.products[itemIndex].cartQuantity);
        },
        shippingProductdetails:(state)=>{
            state.products.map(item=>state.shippingProductid.push(item.id))
            state.products.map(item=>state.shippingQuantity.push(item.cartQuantity))
        },
        cleartcart:(state)=>{
            state.products =[];
            state.cartTotalAmount = 0;
            state.cartTotalquantity=0;
            state.shippingProductid =[];
            state.shippingQuantity=[];
        }
    }
})

export const {addproducts,removeproduct,decreseProductquantity,shippingProductdetails,cleartcart} = cartSlice.actions;
export default cartSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    Isloading:false,
    products:[],
    error:''
}
export const fetchProductsByCategory = createAsyncThunk('Fetch_Products',async(category)=>{
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    try{
        const responsejson = await response.json()
        console.log(responsejson);
        return responsejson;
    }catch(error){
        console.log(error);
    }
}) 
const categoryProductReducers = createSlice({
    name:'products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsByCategory .pending,(state,action)=>{
            state.Isloading=true;
            state.error='';
        });
        builder.addCase(fetchProductsByCategory .fulfilled,(state,action)=>{
            state.Isloading=false;
            let fileredItems = action.payload.filter(item=>item.category!=="electronics")
            state.products=fileredItems;
            console.log(fileredItems);
        });
        builder.addCase(fetchProductsByCategory .rejected,(state,action)=>{
            state.Isloading=false;
            state.products=[];
            state.error=action.payload;
        })
    }
})
export default categoryProductReducers.reducer;

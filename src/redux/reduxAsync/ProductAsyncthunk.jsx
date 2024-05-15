import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    Isloading:false,
    products:[],
    error:''
}
export const fetchProducts = createAsyncThunk('Fetch_Products',async()=>{
    const response = await fetch('https://fakestoreapi.com/products');
    try{
        const responsejson = await response.json()
        return responsejson;
    }catch(error){
        console.log(error);
    }
}) 


const productReducers = createSlice({
    name:'products',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.Isloading=true;
            state.error='';
        });
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.Isloading=false;
            let fileredItems = action.payload.filter(item=>item.category!=="electronics")
            state.products=fileredItems;
            console.log(fileredItems);
        });
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.Isloading=false;
            state.products=[];
            state.error=action.payload;
        })
    }
})
export default productReducers.reducer;

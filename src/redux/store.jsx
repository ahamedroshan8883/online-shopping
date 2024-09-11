// import { applyMiddleware, combineReducers,legacy_createStore as  createStore, } from "@reduxjs/toolkit";
// import {thunk} from 'redux-thunk'
// import { productReducer } from "./productReduser";

import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reduxAsync/ProductAsyncthunk";
import cartReducers from "./cartRedux/cartSlice"
// const rootrender = combineReducers({
//     productSore : productReducer,
// });

// export const store = createStore(rootrender,applyMiddleware(thunk))
export const store = configureStore({
    reducer:{
        productsStore:productReducers,
        cartStore:cartReducers
    }
})
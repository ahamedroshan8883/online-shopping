import { applyMiddleware, combineReducers,legacy_createStore as  createStore, } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk'
import { productReducer } from "./redux/productReduser";

const rootrender = combineReducers({
    productSore : productReducer
});

export const store = createStore(rootrender,applyMiddleware(thunk))
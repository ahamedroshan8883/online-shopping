import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reduxAsync/ProductAsyncthunk";
import OrderReducer from "./ReduxForOrder/OrderItemSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from "redux-thunk";


const orderItemPersistConfig = {
    key: 'orderItem',
    storage,
  };
const persistedOrderItemReducer = persistReducer(orderItemPersistConfig, OrderReducer);

export const store = configureStore({
    reducer:{
        productsStore:productReducers,
        OrderReducer: persistedOrderItemReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // Disable serialization check if you're using non-serializable values
      }).concat(thunk),
})
export const persistor = persistStore(store);
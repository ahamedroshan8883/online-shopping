
import { configureStore } from "@reduxjs/toolkit"

import cartReducer  from "./cartSlice"
export const cartstore = configureStore({
    reducer:{
        cartStore : cartReducer
    }
})
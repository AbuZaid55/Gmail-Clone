import { configureStore } from "@reduxjs/toolkit";
import appSlice from './appSlice'

const store = configureStore({
    reducer:{
        app:appSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
})
export default store;
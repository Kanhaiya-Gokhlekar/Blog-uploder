import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
// Import the postSlice

const store = configureStore({
    reducer: {
        auth: authSlice,
        //post: postSlice, // Added post slice
    },
});

export default store;

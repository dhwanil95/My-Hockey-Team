// Import necessary Redux toolkit functions and the users slice reducer
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../redux/userslice";

// Configure and create a Redux store that uses the users reducer
export const store = configureStore({
  reducer: {
    users: usersReducer,  // Assign users slice to the 'users' property in Redux state
  },
});

// Define RootState type which provides type definitions for the entire Redux state
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type which provides type definitions for dispatch function in Redux
export type AppDispatch = typeof store.dispatch;

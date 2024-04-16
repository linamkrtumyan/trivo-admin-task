// store.js
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import  userReducer  from '../features/user/userSlice'; // Define your slice with async thunk
import  loginReducer  from '../features/auth/loginSlice'; // Define your slice with async thunk


export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,

    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

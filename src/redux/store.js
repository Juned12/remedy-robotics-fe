import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserDetailsSlice } from "./userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  }
  const reducer = combineReducers({
    userLoginData: UserDetailsSlice.reducer, // <-- cartSlice.reducer function
  })
  
  const persistedReducer = persistReducer(persistConfig, reducer)

  export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  })

  export const persistor = persistStore(store)
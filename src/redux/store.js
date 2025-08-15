import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'],   // chỉ persist slice nào cần
  // blacklist: ['temp'],   // hoặc loại trừ slice không cần persist
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // để tránh warning với redux-persist
    }),
})

export const persistor = persistStore(store)
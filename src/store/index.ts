import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productReducer } from '@/store/product';

const rootReducer = combineReducers({
    products: productReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

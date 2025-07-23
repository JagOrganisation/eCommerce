import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productReducer } from '@/store/product';
import type { RootState } from '@/store';

export function renderWithStore(
    ui: ReactElement,
    preloadedState?: Partial<RootState>
) {
    const rootReducer = combineReducers({
        products: productReducer,
    });

    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    });

    return {
        store,
        ...render(<Provider store={store}>{ui}</Provider>),
    };
}

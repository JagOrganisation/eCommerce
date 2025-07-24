import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '@/api/productApi';

export interface IProduct {
    index: number;
    productName: string;
    price: string;
    productImage: string;
    isSale: boolean;
    type: string;
    description?: string
}

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProductState {
    items: IProduct[];
    status: Status;
    error: string | null;
    filter: string;
    search: string;
}

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null,
    filter: 'All',
    search: '',
};

export const fetchProducts = createAsyncThunk<IProduct[]>(
    'products/fetchProducts',
    async () => {
        return await getProducts();
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Something went wrong';
            });
    },
});

export const { setFilter, setSearch } = productSlice.actions;
export const productReducer = productSlice.reducer;

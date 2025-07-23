import {
    productReducer,
    setFilter,
    setSearch,
    fetchProducts,
    IProduct,
    ProductState,
} from '@/store/product';

const initialState: ProductState = {
    items: [],
    status: 'idle',
    error: null,
    filter: 'All',
    search: '',
};

describe('productSlice reducer', () => {
    it('should return the initial state', () => {
        const state = productReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual(initialState);
    });

    it('should handle setFilter', () => {
        const newState = productReducer(initialState, setFilter('Wine'));
        expect(newState.filter).toBe('Wine');
    });

    it('should handle setSearch', () => {
        const newState = productReducer(initialState, setSearch('beer'));
        expect(newState.search).toBe('beer');
    });
});

describe('fetchProducts async thunk reducer cases', () => {
    it('should handle pending', () => {
        const action = { type: fetchProducts.pending.type };
        const state = productReducer(initialState, action);
        expect(state.status).toBe('loading');
        expect(state.error).toBeNull();
    });

    it('should handle fulfilled', () => {
        const mockProducts: IProduct[] = [
            {
                index: 1,
                productName: 'Mock Beer',
                price: '$5',
                productImage: 'beer.png',
                type: 'Beer',
                isSale: false,
            },
        ];
        const action = {
            type: fetchProducts.fulfilled.type,
            payload: mockProducts,
        };
        const state = productReducer(initialState, action);
        expect(state.status).toBe('succeeded');
        expect(state.items).toEqual(mockProducts);
    });

    it('should handle rejected', () => {
        const action = {
            type: fetchProducts.rejected.type,
            error: { message: 'Failed to load' },
        };
        const state = productReducer(initialState, action);
        expect(state.status).toBe('failed');
        expect(state.error).toBe('Failed to load');
    });
});

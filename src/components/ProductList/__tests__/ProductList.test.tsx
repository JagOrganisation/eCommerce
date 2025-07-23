import { screen } from '@testing-library/react';
import { renderWithStore } from '@/utils/test-utils';
import ProductList from '@/components/ProductList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock('@/store/product', () => {
    const original = jest.requireActual('@/store/product');
    return {
        ...original,
        fetchProducts: jest.fn(),
    };
});

describe('ProductList UI Behavior', () => {
    const fakeDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(fakeDispatch);
    });

    it('displays loader while fetching data', () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                products: {
                    items: [],
                    status: 'loading',
                    error: null,
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('shows error message on failure', () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                products: {
                    items: [],
                    status: 'failed',
                    error: 'Unexpected error occurred',
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        expect(screen.getByText(/Error: Unexpected error occurred/i)).toBeInTheDocument();
    });

    it('renders individual product cards', () => {
        const mockCatalog = [
            {
                index: 9,
                productName: 'Premium Lager',
                productImage: 'lager.png',
                price: '$7.99',
                type: 'Beer',
                isSale: true,
            },
        ];

        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                products: {
                    items: mockCatalog,
                    status: 'succeeded',
                    error: null,
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        expect(screen.getByText('Premium Lager')).toBeInTheDocument();
        expect(screen.getByText('$7.99')).toBeInTheDocument();
        expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    it('updates search field on user input', async () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                products: {
                    items: [],
                    status: 'succeeded',
                    error: null,
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        const searchInput = screen.getByPlaceholderText(/search products/i);
        await userEvent.type(searchInput, 'lager');
        expect(searchInput).toHaveValue('lager');
    });

    it('Show Error Message, if Searched Item does not exist in system', async () => {
        (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
            selectorFn({
                products: {
                    items: [],
                    status: 'succeeded',
                    error: null,
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        const searchInput = screen.getByPlaceholderText(/search products/i);
        await userEvent.type(searchInput, 'aaaaaaaaaaaaa');
        expect(screen.getByText(/No products found matching your criteria/i)).toBeInTheDocument();
    });
});

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
    const actual = jest.requireActual('@/store/product');
    return {
        ...actual,
        fetchProducts: jest.fn(),
    };
});

describe('ProductList Component', () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    });

    it('renders loading state', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) =>
            selector({
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

    it('renders error state', () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) =>
            selector({
                products: {
                    items: [],
                    status: 'failed',
                    error: 'Something went wrong',
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
    });

    it('renders product cards correctly', () => {
        const mockProducts = [
            {
                index: 1,
                productName: 'Test Beer',
                productImage: 'beer.png',
                price: '$10',
                type: 'Beer',
                isSale: true,
            },
        ];

        (useAppSelector as jest.Mock).mockImplementation((selector) =>
            selector({
                products: {
                    items: mockProducts,
                    status: 'succeeded',
                    error: null,
                    filter: 'All',
                    search: '',
                },
            })
        );

        renderWithStore(<ProductList />);
        expect(screen.getByText('Test Beer')).toBeInTheDocument();
        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    it('allows user to search', async () => {
        (useAppSelector as jest.Mock).mockImplementation((selector) =>
            selector({
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
        const input = screen.getByPlaceholderText(/search products/i);
        await userEvent.type(input, 'test');
        expect(input).toHaveValue('test');
    });
});

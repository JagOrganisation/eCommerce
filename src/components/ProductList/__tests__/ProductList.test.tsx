import { screen } from '@testing-library/react';
import { renderWithStore } from '@/utils/test-utils';
import ProductList from '@/components/ProductList';
import userEvent from '@testing-library/user-event';

jest.mock('@/store/product', () => {
    const original = jest.requireActual('@/store/product');
    return {
        ...original,
        fetchProducts: jest.fn(() => () => Promise.resolve()),
    };
});

describe('ProductList UI Behavior', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('displays loader while fetching data', () => {
        renderWithStore(<ProductList />, {
            products: {
                items: [],
                status: 'loading',
                error: null,
                filter: 'All',
                search: '',
            },
        });

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('shows error message on failure', () => {
        renderWithStore(<ProductList />, {
            products: {
                items: [],
                status: 'failed',
                error: 'Unexpected error occurred',
                filter: 'All',
                search: '',
            },
        });

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

        renderWithStore(<ProductList />, {
            products: {
                items: mockCatalog,
                status: 'succeeded',
                error: null,
                filter: 'All',
                search: '',
            },
        });

        expect(screen.getByText('Premium Lager')).toBeInTheDocument();
        expect(screen.getByText('$7.99')).toBeInTheDocument();
        expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    it('updates search field on user input', async () => {
        renderWithStore(<ProductList />, {
            products: {
                items: [],
                status: 'succeeded',
                error: null,
                filter: 'All',
                search: '',
            },
        });

        const searchInput = screen.getByPlaceholderText(/search products/i);
        await userEvent.type(searchInput, 'lager');
        expect(searchInput).toHaveValue('lager');
    });

    it('shows message if searched item does not exist', async () => {
        renderWithStore(<ProductList />, {
            products: {
                items: [],
                status: 'succeeded',
                error: null,
                filter: 'All',
                search: '',
            },
        });

        const searchInput = screen.getByPlaceholderText(/search products/i);
        await userEvent.type(searchInput, 'nonexistent item');
        expect(screen.getByText(/No products found matching your criteria/i)).toBeInTheDocument();
    });

    it('shows message when no products exist in the system', () => {
        renderWithStore(<ProductList />, {
            products: {
                items: [],
                status: 'succeeded',
                error: null,
                filter: 'All',
                search: '',
            },
        });

        expect(screen.getByText(/No products found matching your criteria/i)).toBeInTheDocument();
    });

    it('opens and closes the product modal when a product is clicked', async () => {
        const mockProduct = {
            index: 1,
            productName: 'Test Gin',
            productImage: 'testgin.png',
            price: '$39.99',
            type: 'Spirits',
            isSale: false,
        };

        renderWithStore(<ProductList />, {
            products: {
                items: [mockProduct],
                status: 'succeeded',
                error: null,
                filter: 'All',
                search: '',
            },
        });

        const productTexts = screen.getAllByText('Test Gin');
        await userEvent.click(productTexts[0]);

        expect(screen.getByRole('heading', { name: /test gin/i })).toBeInTheDocument();
        expect(screen.getByText(/Price:\s*\$39\.99/i)).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /×/i });
        await userEvent.click(closeButton);

        expect(screen.queryByRole('heading', { name: /test gin/i })).not.toBeInTheDocument();
    });
});

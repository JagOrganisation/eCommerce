import { getProducts } from '@/api/productApi';
import { IProduct } from '@/store/product';

describe('getProducts', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.resetAllMocks();
    });

    it('returns data on successful fetch', async () => {
        const mockData: IProduct[] = [
            { index: 1, productName: 'Beer', price: '$5.00', productImage: 'beer.png', isSale: false, type: 'Beer' },
        ];

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const promise = getProducts();
        jest.runAllTimers();

        const result = await promise;
        expect(result).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith('/data/products.json');
    });

    it('throws error on failed fetch', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
        });

        const promise = getProducts();
        jest.runAllTimers();

        await expect(promise).rejects.toThrow('Fetch failed with status 500');

        consoleSpy.mockRestore()
    });

    it('logs error and throws if fetch fails completely', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

        const promise = getProducts();

        jest.runAllTimers();

        await expect(promise).rejects.toThrow('Network error');
        expect(consoleSpy).toHaveBeenCalledWith(
            'Error fetching products:',
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });
});

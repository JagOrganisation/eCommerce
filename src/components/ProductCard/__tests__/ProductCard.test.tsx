import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components';
import { IProduct } from '@/store/product';

describe('ProductCard', () => {
    const mockProduct: IProduct = {
        index: 1,
        productName: 'Mock Wine',
        price: '$12.00',
        productImage: 'wine.png',
        isSale: true,
        type: 'Wine',
    };

    it('renders product name, price and image correctly', () => {
        render(<ProductCard product={mockProduct} />);

        expect(screen.getByText('Mock Wine')).toBeInTheDocument();

        expect(screen.getByText('$12.00')).toBeInTheDocument();

        const image = screen.getByAltText('Mock Wine') as HTMLImageElement;
        expect(image).toBeInTheDocument();
        expect(image.src).toContain('/images/wine.png');
    });

    it('shows "Sale" badge when isSale is true', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    it('does NOT show "Sale" badge when isSale is false', () => {
        const productNoSale = { ...mockProduct, isSale: false };
        render(<ProductCard product={productNoSale} />);
        expect(screen.queryByText('Sale')).not.toBeInTheDocument();
    });
});

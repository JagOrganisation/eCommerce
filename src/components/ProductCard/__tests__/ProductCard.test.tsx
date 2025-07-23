import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components';
import { IProduct } from '@/store/product';

describe('ProductCard Component UI', () => {
    const sampleProduct: IProduct = {
        index: 42,
        productName: 'Test Beverage',
        price: '$18.50',
        productImage: 'Product_1.png',
        isSale: true,
        type: 'Beverages',
    };

    it('displays product title, cost, and image properly', () => {
        render(<ProductCard product={sampleProduct} />);

        expect(screen.getByText('Test Beverage')).toBeInTheDocument();
        expect(screen.getByText('$18.50')).toBeInTheDocument();

        const imgElement = screen.getByAltText('Test Beverage') as HTMLImageElement;
        expect(imgElement).toBeInTheDocument();
        expect(imgElement.src).toMatch(/Product_1\.png/);
    });

    it('displays discount badge when product is on sale', () => {
        render(<ProductCard product={sampleProduct} />);
        expect(screen.getByText('Sale')).toBeInTheDocument();
    });

    it('omits discount badge when product is not on sale', () => {
        const nonSaleProduct = { ...sampleProduct, isSale: false };
        render(<ProductCard product={nonSaleProduct} />);
        expect(screen.queryByText('Sale')).not.toBeInTheDocument();
    });
});

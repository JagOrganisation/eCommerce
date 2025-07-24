import { render, screen, fireEvent } from '@testing-library/react';
import ProductModal from '@/components/ProductModal';
import { IProduct } from '@/store/product';

const mockProduct: IProduct = {
    index: 1,
    productName: 'Grey Goose Vodka 700ml',
    productImage: 'grey-goose.jpg',
    description: 'A premium French vodka known for its smooth taste and clean finish. Ideal for cocktails or sipping straight.',
    price: "59.99",
    type: "vodka",
    isSale: true
};


describe('ProductModal', () => {
    it('renders product details correctly', () => {
        render(<ProductModal product={mockProduct} onClose={jest.fn()} />);

        expect(screen.getByText('Grey Goose Vodka 700ml')).toBeInTheDocument();
        expect(screen.getByText('Price: 59.99')).toBeInTheDocument();
        expect(screen.getByText(/premium French vodka/i)).toBeInTheDocument();

        const image = screen.getByAltText('Grey Goose Vodka 700ml');
        expect(image).toBeInTheDocument();
    });

    it('calls onClose when clicking close button', () => {
        const onClose = jest.fn();
        render(<ProductModal product={mockProduct} onClose={onClose} />);

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking backdrop', () => {
        const onClose = jest.fn();
        const { container } = render(<ProductModal product={mockProduct} onClose={onClose} />);

        const backdrop = container.querySelector('.backdrop');
        if (backdrop) fireEvent.click(backdrop);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when clicking inside modal content', () => {
        const onClose = jest.fn();
        const { container } = render(<ProductModal product={mockProduct} onClose={onClose} />);

        const modal = container.querySelector('.modal');
        if (modal) fireEvent.click(modal);

        expect(onClose).not.toHaveBeenCalled();
    });
});


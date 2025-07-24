import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopPanel from '@/components/TopPanel';
import { renderWithStore } from '@/utils/test-utils';

describe('TopPanel', () => {
    const mockProps = {
        searchText: '',
        onSearchChange: jest.fn(),
        filter: 'All',
        onFilterChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders search field and filter dropdown correctly', () => {
        renderWithStore(<TopPanel {...mockProps} />);

        expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
    });

    it('invokes search handler on each keystroke', async () => {
        renderWithStore(<TopPanel {...mockProps} />);

        const input = screen.getByPlaceholderText(/search products/i);
        await userEvent.type(input, 'gin');

        await waitFor(() => {
            expect(mockProps.onSearchChange).toHaveBeenCalledTimes(3);
        });
    });

    it('triggers filter handler when a different option is selected', async () => {
        renderWithStore(<TopPanel {...mockProps} />);

        const select = screen.getByLabelText(/filter by/i);
        await userEvent.selectOptions(select, 'Beer');

        expect(mockProps.onFilterChange).toHaveBeenCalledWith('Beer');
    });
});

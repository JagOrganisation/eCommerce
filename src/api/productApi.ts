import { IProduct } from '@/store/product';

export async function getProducts(): Promise<IProduct[]> {
    try {
        // adding this delay timer to show Spinner on Loading Time, not required for PROD env.
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch('/data/products.json');
        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

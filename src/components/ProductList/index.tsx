'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, IProduct, setFilter } from '@/store/product';
import styles from './ProductList.module.css';
import { ProductCard, ProductModal, TopPanel } from '@/components';
import { PRODUCT_NOT_FOUND } from '@/constants/ProductConstants';

export default function ProductList() {
    const dispatch = useAppDispatch();
    const { items, filter, status, error } = useAppSelector((state) => state.products);
    const [searchText, setSearchText] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = items.filter((product) => {
        const matchesSearch = product.productName.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filter === 'All' || product.type === filter;
        return matchesSearch && matchesFilter;
    });

    if (['idle', 'loading'].includes(status)) {
        return (
            <p className={styles.message} aria-live="polite">
                Loading...
            </p>
        );
    }

    if (error) {
        return (
            <p className={styles.message} role="alert">
                Error: {error}
            </p>
        );
    }

    return (
        <div className={styles.container}>
            <section aria-label="Search and filter panel">
                <TopPanel
                    searchText={searchText}
                    onSearchChange={setSearchText}
                    filter={filter}
                    onFilterChange={(val) => dispatch(setFilter(val))}
                />
            </section>

            {filteredProducts.length === 0 ? (
                <p className={styles.message} aria-live="polite">
                    {PRODUCT_NOT_FOUND}
                </p>
            ) : (
                <section
                    className={styles.grid}
                    role="region"
                    aria-labelledby="products-heading"
                >
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.index}
                            product={product}
                            priority={product.index === 0}
                            handleClickOnCard={() => setSelectedProduct(product)}
                        />
                    ))}
                </section>
            )}

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setFilter } from '@/store/product';
import styles from './ProductList.module.css';
import { ProductCard } from '@/components';
import { PRODUCT_FILTER_OPTIONS } from '@/constants/ProductConstants';
import { PRODUCT_NOT_FOUND } from '@/constants/ProductConstants';

export default function ProductList() {
    const dispatch = useAppDispatch();
    const { items, filter, status, error } = useAppSelector((state) => state.products);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = items.filter((product) => {
        const matchesSearch = product.productName.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filter === 'All' || product.type === filter;
        return matchesSearch && matchesFilter;
    });

    if (['idle', 'loading'].includes(status)) {
        return <p className={styles.message}>Loading...</p>;
    }

    if (error) return <p className={styles.message}>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <div className={styles.controlsWrapper}>
                <input
                    type="search"
                    placeholder="Search products..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className={styles.searchInput}
                />
                <div className={styles.filterWrapper}>
                    <label htmlFor="filterSelect" className={styles.filterLabel}>Filter by</label>
                    <select
                        id="filterSelect"
                        className={styles.select}
                        value={filter}
                        onChange={(e) => dispatch(setFilter(e.target.value))}
                    >
                        {PRODUCT_FILTER_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <p className={styles.message}>
                    {PRODUCT_NOT_FOUND}
                </p>
            ) : (
                <div className={styles.grid}>
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.index} product={product} priority={index === 0} />
                    ))}
                </div>
            )}
        </div>
    );
}

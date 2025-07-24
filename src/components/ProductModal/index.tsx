'use client'
import styles from './ProductModal.module.css';
import { IProduct } from '@/store/product';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ProductModalProps {
    product: IProduct;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        modalRef.current?.focus();
    }, []);

    return (
        <div
            className={styles.backdrop}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
                ref={modalRef}
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close product details"
                >
                    &times;
                </button>

                <div className={styles.imageWrapper}>
                    <Image
                        src={`/images/${product.productImage}`}
                        alt={product.productName}
                        fill
                        sizes="200px"
                        className={styles.image}
                    />
                </div>

                <h2 id="modal-title" className={styles.title}>
                    {product.productName}
                </h2>

                <p className={styles.price}>Price: {product.price}</p>

                <p id="modal-description" className={styles.description}>
                    {product.description || 'No description available.'}
                </p>
            </div>
        </div>
    );
};

export default ProductModal;

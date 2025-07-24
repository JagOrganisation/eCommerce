import styles from './ProductCard.module.css';
import { IProduct } from '@/store/product';
import Image from 'next/image';

interface ProductCardProps {
    product: IProduct;
    priority?: boolean;
    handleClickOnCard?: (product: IProduct) => void;
}

const ProductCard = ({ product, priority, handleClickOnCard }: ProductCardProps) => {
    return (
        <article
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => handleClickOnCard?.(product)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClickOnCard?.(product);
                }
            }}
            aria-label={`View details for ${product.productName}`}
        >
            {product.isSale && <span className={styles.saleSticker}>Sale</span>}
            <div className={styles.imageWrapper}>
                <Image
                    src={`/images/${product.productImage}`}
                    alt={product.productName}
                    fill
                    sizes="200px"
                    className={styles.image}
                    priority={priority}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.titleRow}>
                    <p>{product.productName}</p>
                    <p>{product.price}</p>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;

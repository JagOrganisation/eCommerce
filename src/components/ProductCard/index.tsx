import styles from './ProductCard.module.css';
import { IProduct } from '@/store/product';
import Image from 'next/image';

interface ProductCardProps {
    product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {product.isSale && <span className={styles.saleSticker}>Sale</span>}
                <Image
                    src={`/images/${product.productImage}`}
                    alt={product.productName}
                    fill
                    sizes="200px"
                    className={styles.image}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.titleRow}>
                    <h3>{product.productName}</h3>
                    <p>{product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard
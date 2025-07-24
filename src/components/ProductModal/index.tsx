import styles from './ProductModal.module.css';
import { IProduct } from '@/store/product';
import Image from 'next/image';

interface ProductModalProps {
    product: IProduct;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
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
                <h2 className={styles.title}>{product.productName}</h2>
                <p className={styles.price}>Price: {product.price}</p>
                <p className={styles.description}>
                    {product.description || 'No description available.'}
                </p>
            </div>
        </div>
    );
};

export default ProductModal;

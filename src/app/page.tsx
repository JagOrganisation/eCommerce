import styles from "./page.module.css";
import { ProductList } from '@/components';

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

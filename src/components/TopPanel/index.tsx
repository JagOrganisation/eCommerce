import { PRODUCT_FILTER_OPTIONS, PRODUCT_SEARCH_TEXT } from "@/constants/ProductConstants";
import styles from './TopModal.module.css';

interface TopPanelProps {
    searchText: string;
    onSearchChange: (value: string) => void;
    filter: string;
    onFilterChange: (value: string) => void;
}

const TopPanel = ({ searchText, onSearchChange, filter, onFilterChange }: TopPanelProps) => {
    return (
        <div className={styles.controlsWrapper}>
            <input
                type="search"
                placeholder={PRODUCT_SEARCH_TEXT}
                name='searchBox'
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
                className={styles.searchInput}
            />
            <div className={styles.filterWrapper}>
                <label htmlFor="filterSelect" className={styles.filterLabel}>Filter by</label>
                <select
                    id="filterSelect"
                    className={styles.select}
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    {PRODUCT_FILTER_OPTIONS.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TopPanel;

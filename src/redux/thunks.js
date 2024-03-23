import { setProductList } from './actions';

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('/products.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }

            const data = await response.json();
            dispatch(setProductList(data));
        } catch (error) {
            console.error('Error fetching products:', error.message);
            throw error;
        }
    };
};

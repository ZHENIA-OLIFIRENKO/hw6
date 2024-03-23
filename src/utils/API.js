export const fetchProducts = async () => {
    try {
        const response = await fetch('../../public/products.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

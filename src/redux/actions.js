export const setProductList = (products) => ({
    type: 'SET_PRODUCT_LIST',
    payload: products,
});

export const toggleFavorite = (product) => ({
    type: 'TOGGLE_FAVORITE',
    payload: { product },
});

export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: { product },
});

export const removeFromCart = (product) => ({
    type: 'REMOVE_FROM_CART',
    payload: { product },
});

export const clearCart = () => ({
    type: 'CLEAR_CART',
});

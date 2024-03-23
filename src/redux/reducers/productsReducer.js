const initialState = {
    products: [],
    favorites: [],
    cart: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_LIST':
            return {
                ...state,
                products: action.payload,
            };
        case 'TOGGLE_FAVORITE':
            const { product: favoriteProduct } = action.payload;
            const isFavorite = state.favorites.some((product) => product.article === favoriteProduct.article);

            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter((product) => product.article !== favoriteProduct.article)
                    : [...state.favorites, favoriteProduct],
            };
        case 'ADD_TO_CART':
            const { product: cartProduct } = action.payload;

            return {
                ...state,
                cart: [...state.cart, cartProduct],
            };
        case 'REMOVE_FROM_CART':
            const { product: removedProduct } = action.payload;

            return {
                ...state,
                cart: state.cart.filter((product) => product.article !== removedProduct.article),
            };
        case 'CLEAR_CART':
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: [],
            };
        default:
            return state;
    }
};

export default productsReducer;

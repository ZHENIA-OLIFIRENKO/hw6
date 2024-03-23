import productsReducer from './productsReducer';

test('додає товар до кошика', () => {
    const initialState = {
        cart: [],
    };
    const product = { id: 1, name: 'Тестовий товар', price: 10 };

    const newState = productsReducer(initialState, { type: 'ADD_TO_CART', payload: { product } });

    expect(newState.cart).toHaveLength(1);
    expect(newState.cart[0].name).toBe('Тестовий товар');
});

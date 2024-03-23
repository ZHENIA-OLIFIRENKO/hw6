import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import CartPage from './CartPage';

test('renders delete button and opens modal', async () => {
    render(
        <Provider store={store}>
            <CartPage />
        </Provider>
    );

    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);

    const modalTitle = await screen.findByText('Remove Item');
    expect(modalTitle).toBeInTheDocument();
});

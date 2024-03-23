import React from 'react';
import { render } from '@testing-library/react';
import FavoritesPage from './FavoritesPage';

test('рендерить сторінку обраного товару правильно', () => {
    const { container } = render(<FavoritesPage />);
    expect(container).toMatchSnapshot();
});
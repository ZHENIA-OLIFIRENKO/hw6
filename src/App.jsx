import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './components/HomePage/HomePage';
import CartPage from './components/CartPage/CartPage';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import { ViewModeProvider } from '../src/context/ViewModeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ViewModeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Router>
      </ViewModeProvider>
    </Provider>
  );
};

export default App;

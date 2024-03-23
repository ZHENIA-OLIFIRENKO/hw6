import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/thunks';
import { selectProducts } from '../../redux/selectors';
import ProductCard from '../ProductCard/ProductCard';
import Header from '../Header/Header';
import ModalText from '../Modal/ModalText';
import TableView from '../TableView/TableView';
import '../../styles/Main.scss';
import { useViewMode } from '../../context/ViewModeContext';

const HomePage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { viewMode, toggleViewMode } = useViewMode();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchProducts());

                const storedCart = localStorage.getItem('cart');
                const storedFavorites = localStorage.getItem('favorites');

                if (storedCart) {
                    setCart(JSON.parse(storedCart));
                }

                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites);
                    setFavorites(parsedFavorites);
                    setFavoriteCount(parsedFavorites.length);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, product];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });

        setSelectedProduct(product);
        setIsTextModalOpen(true);
    };

    const toggleFavorite = (product) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.includes(product)
                ? prevFavorites.filter((fav) => fav !== product)
                : [...prevFavorites, product];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavoriteCount(updatedFavorites.length);
            return updatedFavorites;
        });
    };

    const handleToggleView = () => {
        toggleViewMode();
        setIsChecked(!isChecked);
    };

    return (
        <div className='wholeProducts'>
            <Header cartCount={cart.length} favoriteCount={favoriteCount} />
            <h2>Our Products</h2>

            <div className="toggle-container">
                <label className="checkbox-label">
                    <input className='checkbox-label' type="checkbox" checked={isChecked} onChange={handleToggleView} />
                    {viewMode === 'table' ? 'Table View' : 'Card View'}
                </label>
            </div>

            {isChecked ? null : (
                <div className='productContainer'>
                    {Array.isArray(products) ? (
                        products.map((product) => (
                            <div key={product.article}>
                                <ProductCard
                                    product={product}
                                    addToCart={() => addToCart(product)}
                                    toggleFavorite={() => toggleFavorite(product)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            )}

            {isChecked ? <TableView /> : null}
        </div>
    );
};

export default HomePage;
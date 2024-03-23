import React, { useState, useEffect } from 'react';
import Modal from '../Modal/ModalText';
import './FavoritesPage.scss';

const FavoritesPage = () => {
    const [favoritesItems, setFavoritesItems] = useState([]);
    const [removedProduct, setRemovedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavoritesItems(JSON.parse(storedFavorites));
        }
    }, []);

    const removeFromFavorites = (productId) => {
        setRemovedProduct(productId);
        setIsModalOpen(true);
    };

    const handleConfirmRemove = () => {
        const updatedFavorites = favoritesItems.filter((product) => product.article !== removedProduct);
        setFavoritesItems(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        setIsModalOpen(false);
    };

    const handleCancelRemove = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="favorites-page">
            <h2 className="favorites-title">Favorites</h2>

            <ul className="product-list">
                {Array.isArray(favoritesItems) && favoritesItems.length > 0 ? (
                    favoritesItems.map((product) => (
                        <li key={product.article} className="product-item">
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">₴{(parseFloat(product.price))}</p>
                            </div>
                            <button
                                className="remove-button"
                                onClick={() => removeFromFavorites(product.article)}
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <li key="empty-favorites" className="empty-favorites">
                        Your favorites list is empty.
                    </li>
                )}
            </ul>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCancelRemove}
                title="Remove Item"
                content="Are you sure you want to remove this item from favorites?"
                onCancel={handleCancelRemove}
                onConfirm={handleConfirmRemove}
            />
        </div>
    );
};

export default FavoritesPage;

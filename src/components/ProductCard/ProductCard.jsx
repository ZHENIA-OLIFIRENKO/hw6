import React, { useState } from 'react';
import '../../styles/Main.scss';
import ModalText from '../Modal/ModalText';
import { useViewMode } from '../../context/ViewModeContext';

const ProductCard = ({ product, addToCart, toggleFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const { viewMode } = useViewMode();

    const handleToggleFavorite = () => {
        toggleFavorite(product);
        setIsFavorite(!isFavorite);
    };

    const handleAddToCart = () => {
        setIsTextModalOpen(true);
    };

    const handleConfirm = () => {
        addToCart(product);
        setIsTextModalOpen(false);
    };

    const closeModal = () => {
        setIsTextModalOpen(false);
    };

    return (
        <div className={`products ${viewMode === 'table' ? 'product-card-table' : ''}`}>
            {product.image && <img src={product.image} alt={product.name} />}
            <p className='p-type'>{product.type}</p>
            <p className='p-name'>{product.name}</p>
            <p className='p-price'>Ціна: {product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleToggleFavorite} className={`favorite-icon ${isFavorite ? 'selected' : ''}`}>
                &#9733;
            </button>

            {/* Modal */}
            <ModalText
                isOpen={isTextModalOpen}
                onClose={closeModal}
                title="Кошик"
                content={`Ви бажаєте додати ${product.name} до вашого кошику?`}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default ProductCard;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/actions';
import { selectProducts } from '../../redux/selectors';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Modal from '../Modal/ModalText';
import './CartPage.scss';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (productId) => {
        setSelectedProduct(productId);
        setIsModalOpen(true);
    };

    const handleConfirmRemove = () => {
        const updatedCart = cartItems.filter((product) => product.article !== selectedProduct);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        setIsModalOpen(false);
    };

    const handleCancelRemove = () => {
        setIsModalOpen(false);
    };

    const calculateTotal = () => {
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return 0;
        }

        const total = cartItems.reduce((acc, product) => acc + (parseFloat(product.price) || 0), 0);
        return isNaN(total) ? 0 : total;
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Обов\'язкове поле'),
        lastName: Yup.string().required('Обов\'язкове поле'),
        age: Yup.number().required('Обов\'язкове поле'),
        address: Yup.string().required('Обов\'язкове поле'),
        phoneNumber: Yup.string().required('Обов\'язкове поле'),
    });

    const handleSubmit = (values, { resetForm }) => {
        resetForm();
        setIsCheckoutSuccess(true);
        dispatch(clearCart());
    };

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h2 className="cart-title">Shopping Cart</h2>
                <div className="cart-total">
                    Total: <strong>₴{calculateTotal()}</strong>
                </div>
            </div>

            <ul className="product-list">
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((product) => (
                        <li key={product.article} className="product-item">
                            <div className="product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">₴{parseFloat(product.price)}</p>
                            </div>
                            <button
                                className="remove-button"
                                onClick={() => removeFromCart(product.article)}
                            >
                                Remove
                            </button>
                        </li>
                    ))
                ) : (
                    <li key="empty-cart" className="empty-cart">
                        Your cart is empty.
                    </li>
                )}
            </ul>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCancelRemove}
                title="Remove Item"
                content="Are you sure you want to remove this item from the cart?"
                onCancel={handleCancelRemove}
                onConfirm={handleConfirmRemove}
            />

            {/* Form */}
            <div className="cart-form-container">
                <h2>Інформація про користувача та адреса доставки</h2>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        age: '',
                        address: '',
                        phoneNumber: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="cart-form">
                        <div className="form-group">
                            <label htmlFor="firstName">Ім'я:</label>
                            <Field type="text" id="firstName" name="firstName" />
                            <ErrorMessage name="firstName" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Прізвище:</label>
                            <Field type="text" id="lastName" name="lastName" />
                            <ErrorMessage name="lastName" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Вік:</label>
                            <Field type="number" id="age" name="age" />
                            <ErrorMessage name="age" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Адреса доставки:</label>
                            <Field type="text" id="address" name="address" />
                            <ErrorMessage name="address" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Мобільний телефон:</label>
                            <Field type="tel" id="phoneNumber" name="phoneNumber" />
                            <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                        </div>

                        <button type="submit">Checkout</button>
                    </Form>
                </Formik>
            </div>

            {isCheckoutSuccess && <p className="success-message">Покупка успішно оформлена!</p>}
        </div>
    );
};

export default CartPage;

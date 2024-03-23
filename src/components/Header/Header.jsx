import React from 'react';
import '../../styles/Main.scss'
import ShopIcon from "../../../public/images/shop.png"
import StarIcon from "../../../public/images/star.png"
import StoreLogo from "../../../public/images/shoplogo.png"
import HomeLogo from "../../../public/images/home.png"
import { Link } from 'react-router-dom';

const Header = ({ cartCount, favoriteCount }) => {
    return (
        <div className="header">
            <div className='shop-logo'>
                <img src={StoreLogo} alt="Shop Icon" className="shop-icon" />
            </div>

            <h1 className='header-text'>tea</h1>

            <div className='carts-wrapper'>
                <Link to="/" className='home'>
                    <img src={HomeLogo} alt="Home" className="home-icon" />
                </Link>

                <Link to="/cart" className='carts'>
                    <img src={ShopIcon} alt="Cart" className="cart-icon" />
                    <span className="badge">{cartCount}</span>
                </Link>

                <Link to="/favorites" className='carts'>
                    <img src={StarIcon} alt="Favorite" className="star-icon" />
                    <span className="badge">{favoriteCount}</span>
                </Link>
            </div>
        </div>
    );
};


export default Header;
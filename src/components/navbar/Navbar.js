import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './style.css';

import search from './../../img/icons/search.svg';
import heart from './../../img/icons/heart.svg';
import cart from './../../img/icons/cart.svg';
import user from './../../img/icons/user.svg';

const Navbar = () => {
    const activeLink = 'nav-list__link nav-list__link--active';
    const normalLink = 'nav-list__link';

    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
            navigate(`/books?search=${encodeURIComponent(searchInput)}`);
            setSearchInput(""); 
        }
    };

    return (
        <header className="navbar">
            <div className="navbar_top">
                <NavLink to="/" className="navbar_logo">
                    BookStore
                </NavLink>

                <form className="navbar_search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit" className="search-btn">
                        <img src={search} alt='Search' className="search-icon" />
                    </button>
                </form>

                <div className="navbar_icons">
                    <NavLink to="/favorites">
                        <img src={heart} alt="favorites" />
                    </NavLink>
                    <NavLink to="/cart">
                        <img src={cart} alt="cart" />
                    </NavLink>
                    <NavLink to="/profile">
                        <img src={user} alt="profile" />
                    </NavLink>
                </div>
            </div>

            <nav className="navbar_menu">
                <ul>
                    <li className='nav-list'>
                        <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                            Home
                        </NavLink>
                    </li>
                    <li className='nav-list'>
                        <NavLink to="/books" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                            Books
                        </NavLink>
                    </li>
                    <li className='nav-list'>
                        <NavLink to="/fiction" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                            Fiction
                        </NavLink>
                    </li>
                    <li className='nav-list'>
                        <NavLink to="/nonfiction" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                            Nonfiction
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
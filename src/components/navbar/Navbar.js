import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

import searchIcon from "./../../img/icons/search.svg";
import heart from "./../../img/icons/heart.svg";
import cart from "./../../img/icons/cart.svg";
import user from "./../../img/icons/user.svg";

import "./style.css";

const Navbar = () => {
  const activeLink = "nav-list__link nav-list__link--active";
  const normalLink = "nav-list__link";

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();

    if (location.pathname.startsWith("/books")) {
      if (trimmed !== "") {
        navigate(
          `/books?search=${encodeURIComponent(trimmed)}&page=1&limit=10`, { replace: false });
      } 
      else {
        navigate("/books?page=1&limit=10", { replace: false });
      }
    }
  }, [debouncedSearch, location.pathname, navigate]);

  const clearSearch = () => {
    setSearchInput("");

    if (location.pathname.startsWith("/books")) {
      navigate("/books?page=1&limit=10");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed !== "") {
      navigate(`/books?search=${encodeURIComponent(trimmed)}&page=1&limit=10`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar_top">
        <NavLink to="/" className="navbar_logo">
          BookStore
        </NavLink>

        <form className="navbar_search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {searchInput.trim() !== "" && (
            <button
              type="button"
              className="clear-btn"
              onClick={clearSearch}
            >
              Clear
            </button>
)}

          <button className="search-btn" type="submit">
            <img src={searchIcon} alt="Search" className="search-icon" />
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
          <li className="nav-list">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Books
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink
              to="/fiction"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Fiction
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink
              to="/nonfiction"
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              Nonfiction
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
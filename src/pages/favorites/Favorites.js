import React, { useEffect } from 'react';
import BookCard from '../../components/bookcard/BookCard';
import Spinner from '../../components/spinner/Spinner';
import './style.css';

import { auth } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import {
  loadFavorites,
  saveFavorites,
  toggleSelect,
  unselectAll,
  removeSelected,
  clearAll,
  setUser
} from '../../features/favoritesSlice';

const Favorites = () => {
  const dispatch = useDispatch();

  const { favorites, selected, loading, mergedWithLocal, user } = useSelector(state => state.favorites);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser));
      dispatch(loadFavorites(currentUser));
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (mergedWithLocal) {
      alert("Your local favorites were merged with your account.");
    }
  }, [mergedWithLocal]);

  const handleSaveFavorites = (updatedFavorites) => {
    dispatch(saveFavorites({ user, favorites: updatedFavorites }));
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelected());
    handleSaveFavorites(favorites.filter(book => !selected.includes(book.title)));
  };

  const handleClearAll = () => {
    dispatch(clearAll());
    handleSaveFavorites([]);
  };

  const handleToggleSelect = (title) => {
    dispatch(toggleSelect(title));
  };

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const addSelectedToCart = () => {
    const selectedBooks = favorites.filter(book => selected.includes(book.title));
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCart = [
      ...existingCart,
      ...selectedBooks.filter(book => !existingCart.some(item => item.title === book.title)),
    ];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${selectedBooks.length} book(s) added to cart`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="favorites-page">
      <h1 className="favorites-title">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="favorites-empty">No books added yet.</p>
      ) : (
        <>
          <div className="favorites-actions">
            {selected.length > 0 && (
              <>
                <button className="btn-unselect-all" onClick={handleUnselectAll}>
                  Cancel the selection
                </button>
                <button className="remove-selected" onClick={handleRemoveSelected}>
                  Remove Selected ({selected.length})
                </button>
                <button className="btn add-to-cart" onClick={addSelectedToCart}>
                  Add to Cart ({selected.length})
                </button>
              </>
            )}
            <button className="btn clear-all" onClick={handleClearAll}>
              Clear All
            </button>
          </div>

          <div className="favorites-grid">
            {favorites.map((book) => (
              <div
                key={book.title}
                className={`favorite-item ${
                  selected.includes(book.title) ? 'selected' : ''
                }`}
              >
                <div className="favorite-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.includes(book.title)}
                    onChange={() => handleToggleSelect(book.title)}
                  />
                </div>
                <BookCard
                  image={book.image}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  rating={book.rating}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Favorites;
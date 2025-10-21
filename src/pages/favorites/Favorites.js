import React, { useEffect, useState } from 'react';
import BookCard from '../../components/bookcard/BookCard';
import './style.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [selected, setSelected] = useState([]);

    const loadFavorites = () => {
        const saved = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(saved);
    };

    useEffect(() => {
        loadFavorites();

        const handleUpdate = () => loadFavorites();
        window.addEventListener('favoritesUpdated', handleUpdate);

        return () => {
            window.removeEventListener('favoritesUpdated', handleUpdate);
        };
    }, []);

    const toggleSelect = (title) => {
        setSelected((prev) =>
            prev.includes(title)
            ? prev.filter((t) => t !== title)
            : [...prev, title]
        );
    };

    const clearAll = () => {
        localStorage.removeItem('favorites');
        setFavorites([]);
        setSelected([]);
        window.dispatchEvent(new Event('favoritesUpdated'));
    };

    const unselectAll = () => {
        setSelected([]);
    };

    const removeSelected = () => {
        const updated = favorites.filter((book) => !selected.includes(book.title));
        setFavorites(updated);
        setSelected([]);
        localStorage.setItem('favorites', JSON.stringify(updated));
        window.dispatchEvent(new Event('favoritesUpdated'));
    }; 

    const addSelectedToCart = () => {
        const selectedBooks = favorites.filter((book) =>
            selected.includes(book.title)
        );

        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        const updatedCart = [
            ...existingCart,
            ...selectedBooks.filter(
                (book) => !existingCart.some((item) => item.title === book.title)
            ),
        ];

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
        alert(`${selectedBooks.length} book(s) added to cart`);
    };

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
                            <button className="btn-unselect-all" onClick={unselectAll}>
                                Cancel the selection
                            </button>
                            <button className="remove-selected" onClick={removeSelected}>
                                Remove Selected ({selected.length})
                            </button>
                            <button className="btn add-to-cart" onClick={addSelectedToCart}>
                                Add to Cart ({selected.length})
                            </button>
                        </>
                    )}
                    <button className="btn clear-all" onClick={clearAll}>
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
                                    onChange={() => toggleSelect(book.title)}
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
import React, { useEffect, useState } from 'react';
import './style.css';

import trash from './../../img/icons/trash.svg';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('cart')) || [];
        
        const updated = saved.map((book) => ({
            ...book,
            quantity: book.quantity || 1,
        }));
        setCart(updated);

        const handleUpdate = () => {
            const refreshed = JSON.parse(localStorage.getItem('cart')) || [];
            const withQuantity = refreshed.map((book) => ({
                ...book,
                quantity: book.quantity || 1,
            }));
            setCart(withQuantity);
        };
        window.addEventListener('cartUpdated', handleUpdate);

        return () => window.removeEventListener('cartUpdated', handleUpdate);
    }, []);

    const saveCart = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const removeFromCart = (title) => {
        const updated = cart.filter((book) => book.title !== title);
        saveCart(updated);
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
        setSelected([]);
    };

    const toggleSelect = (title) => {
        setSelected((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title]
        );
    };

    const changeQuantity = (title, delta) => {
        const updated = cart.map((book) =>
            book.title === title
                ? { ...book, quantity: Math.max(1, book.quantity + delta) }
                : book
        );
        saveCart(updated);
    };

    const totalPrice = cart
        .filter((book) => selected.includes(book.title))
        .reduce((sum, book) => sum + book.price * book.quantity, 0)
        .toFixed(2);

    const checkout = () => {
        if (selected.length === 0) {
            alert('Please select at least one book');
            return;
        }
        alert(`Checkout successful! Total: $${totalPrice}`);
        const remaining = cart.filter((book) => !selected.includes(book.title));
        saveCart(remaining);
        setSelected([]);
    };

    return (
        <main className="cart-page">
            <h1 className="cart-title">My Bag</h1>

            {cart.length === 0 ? (
                <p className="cart-empty">Your bag is empty.</p>
            ) : (
                <>
                    <div className="cart-grid">
                        {cart.map((book, index) => (
                            <div key={index} className="cart-item">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(book.title)}
                                    onChange={() => toggleSelect(book.title)}
                                    className="cart-checkbox"
                                />
                                <img src={book.image} alt={book.title} className="cart-image" />
                                <div className="cart-info">
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                    <p className="cart-price">${book.price}</p>
                                </div>

                                <div className="cart-quantity">
                                    <button
                                        onClick={() => changeQuantity(book.title, -1)}
                                        className="quantity-btn"
                                    >
                                        -
                                    </button>
                                    <span>{book.quantity}</span>
                                    <button
                                        onClick={() => changeQuantity(book.title, 1)}
                                        className="quantity-btn"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="btn remove"
                                    onClick={() => removeFromCart(book.title)}
                                >
                                    <img src={trash} alt="Remove" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-info">
                            <p>
                                <strong>Selected:</strong> {selected.length} book(s)
                            </p>
                            <p>
                                <strong>Total:</strong> ${totalPrice}
                            </p>
                        </div>
                        <div className="summary-buttons">
                            {selected.length > 0 && (
                                <button
                                className="btn-remove-selected"
                                onClick={() => setSelected([])}
                                disabled={selected.length === 0}
                            >
                                Cancel the selection
                            </button>
                                )}
                            <button
                                className="btn clear-all"
                                onClick={clearCart}
                            >
                                Clear All
                            </button>
                            <button
                                className="btn checkout"
                                onClick={checkout}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default Cart;
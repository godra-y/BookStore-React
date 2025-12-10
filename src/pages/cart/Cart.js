import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import * as cartService from "../../services/cartService";
import Spinner from "../../components/spinner/Spinner";

import trash from "./../../img/icons/trash.svg";
import "./style.css";

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      const { cart: loadedCart, mergedWithLocal } =
        await cartService.loadCart(currentUser);

      if (mergedWithLocal) alert("Your local cart was merged with your account.");

      setCart(loadedCart);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveCart = async (updatedCart) => {
    setCart(updatedCart);
    await cartService.saveCart(user, updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (title) => {
    const updated = cartService.removeFromCart(cart, title);
    setSelected(selected.filter((t) => t !== title));
    saveCart(updated);
  };

  const handleClear = async () => {
    setCart([]);
    setSelected([]);
    if (user) await cartService.saveCartToFirestore(user.uid, []);
    else cartService.clearLocalCart();

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleToggle = (title) => {
    setSelected((prev) => cartService.toggleSelect(prev, title));
  };

  const handleQuantity = (title, delta) => {
    saveCart(cartService.changeQuantity(cart, title, delta));
  };

  const totalPrice = cartService.calculateTotal(cart, selected).toFixed(2);

  const checkout = () => {
    if (selected.length === 0) {
      alert("Please select at least one book");
      return;
    }

    alert(`Checkout successful! Total: $${totalPrice}`);

    const remaining = cart.filter((b) => !selected.includes(b.title));
    saveCart(remaining);
    setSelected([]);
  };

  if (loading) return <Spinner />;

  return (
    <main className="cart-page">
      <h1 className="cart-title">My Bag</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">Your bag is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((book, i) => (
              <div key={i} className="cart-item">
                <input
                  type="checkbox"
                  checked={selected.includes(book.title)}
                  onChange={() => handleToggle(book.title)}
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
                    onClick={() => handleQuantity(book.title, -1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span>{book.quantity}</span>
                  <button
                    onClick={() => handleQuantity(book.title, 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button className="btn remove" onClick={() => handleRemove(book.title)}>
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
                >
                  Cancel selection
                </button>
              )}

              <button className="btn clear-all" onClick={handleClear}>
                Clear All
              </button>

              <button className="btn checkout" onClick={checkout}>
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
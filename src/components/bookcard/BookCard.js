import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import './style.css';

import starIcon from './../../img/icons/star.svg';
import likeIcon from './../../img/icons/like.svg';
import likeFilledIcon from './../../img/icons/like-filled.svg';

const BookCard = ({ image, rating = 4, title, author, price }) => {
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  const stars = Array.from({ length: 5 }, (_, index) => (
    <img
      key={index}
      src={starIcon}
      alt="star"
      className={`book-card__star ${index < rating ? 'filled' : 'empty'}`}
    />
  ));

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    const isLiked = saved.some((book) => book.title === title);
    setLiked(isLiked);
    const cartSaved = JSON.parse(localStorage.getItem('cart')) || [];
    const isInCart = cartSaved.some((book) => book.title === title);
    setInCart(isInCart);
  }, [title]);

  const toggleLike = () => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    let updated;

    if (liked) {
      updated = saved.filter((book) => book.title !== title);
    } 
    else {
      const exists = saved.some((book) => book.title === title);
      if (!exists) {
        updated = [...saved, { image, rating, title, author, price }];
      } 
      else {
        updated = saved;
      }
    }

    localStorage.setItem('favorites', JSON.stringify(updated));
    setLiked(!liked);
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const toggleCart = () => {
    const saved = JSON.parse(localStorage.getItem('cart')) || [];
    let updated;

    if (inCart) {
      updated = saved.filter((book) => book.title !== title);
    } 
    else {
      const exists = saved.some((book) => book.title === title);
      if (!exists) {
        updated = [...saved, { image, rating, title, author, price }];
      }
      else {
        updated = saved;
      }
    }

    localStorage.setItem('cart', JSON.stringify(updated));
    setInCart(!inCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="book-card" onClick={() => navigate(`/book/${encodeURIComponent(title)}`)}>
      <img src={image} alt={title} className="book-card__image" />
      <div className="book-card__rating">{stars}</div>
      <h4 className="book-card__title">{title}</h4>
      <p className="book-card__author">{author}</p>
      <p className="book-card__price">${price}</p>

      <div className="book-card__actions" onClick={(e) => e.stopPropagation()}>
        <button
          className={`book-card__btn ${inCart ? 'in-cart' : ''}`}
          onClick={toggleCart}
        >
          {inCart ? 'Added to bag' : 'Add to bag'}
        </button>
        <img
          src={liked ? likeFilledIcon : likeIcon}
          alt="like"
          className="book-card__like"
          onClick={toggleLike}
        />
      </div>
    </div>
  );
};

export default BookCard;
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useBooks } from '../../context/BooksContext';
import BookCard from '../../components/bookcard/BookCard';
import Genre from '../../components/genre/Genre';
import Author from '../../components/author/Author';
import Spinner from '../../components/spinner/Spinner';
import './style.css';

import sliderImage from './../../img/pictures/home/slide.png';
import bannerImage from './../../img/pictures/home/banner.png';
import subscribeImage from './../../img/pictures/home/subscribe.png'; 

import genre1 from './../../img/pictures/genres/genre1.png';
import genre2 from './../../img/pictures/genres/genre2.png';
import genre3 from './../../img/pictures/genres/genre3.png';
import genre4 from './../../img/pictures/genres/genre4.png';

import author1 from './../../img/pictures/authors/author1.jpg';
import author2 from './../../img/pictures/authors/author2.jpg';
import author3 from './../../img/pictures/authors/author3.webp';
import author4 from './../../img/pictures/authors/author4.jpg';
import author5 from './../../img/pictures/authors/author5.avif';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/books");

  const { books, loading, error } = useBooks();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <main className="home">
      <section className="slider">
        <img src={sliderImage} alt="Book Store Slider" className="slider_image" />

        <div className="slider_text">
          <h1>
            Welcome to <span>BookStore</span>
          </h1>
          <p>A new adventure starts with a single page</p>
          <button className="btn_slider" onClick={handleClick}>
            Shop now
          </button>
        </div>
      </section>

      <section className="new-arrivals">
        <p className="arrivals_text1">New Arrivals</p>
        <hr className="line1" />
        <p className="arrivals_text2">Fresh stories, just for you!</p>
      </section>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <section className="books">
          {books.slice(0, 10).map((book) => (
            <BookCard
              key={book.key}
              image={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150x220?text=No+Cover"
              }
              rating={Math.floor(Math.random() * 5) + 1}
              title={book.title}
              author={book.author_name ? book.author_name[0] : "Unknown Author"}
              price={Math.floor(Math.random() * 30) + 10}
            />
          ))}
        </section>
      )}

      <section className="banner">
        <img src={bannerImage} alt="Book Store Banner" className="banner_image" />

        <div className="banner_items">
          <div className="banner_text">
            <h1>Bestsellers of the Month</h1>
            <p>The books that flew off the shelves – and into readers’ hearts!</p>
            <button className="btn_banner" onClick={handleClick}>
              Shop now
            </button>
          </div>

          <div className="banner_books">
            {loading ? (
              <Spinner />
            ) : (
              books.slice(6, 9).map((book) => (
                <img
                  key={book.key}
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : "https://via.placeholder.com/120x180?text=No+Cover"
                  }
                  alt={book.title}
                  className="banner_book"
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="genres_text">
        <h1>Genres Books</h1>
        <hr className="line2" />
        <p>Find the stories that match your mood!</p>
      </section>

      <section className="genres">
        <Genre image={genre1} title="Sci-fi" />
        <Genre image={genre2} title="Fantasy" />
        <Genre image={genre3} title="Love Story" />
        <Genre image={genre4} title="Adventure" />
      </section>

      <section className="authors">
        <h1>Popular authors</h1>
      </section>

      <section className="authors_grid">
        <Author image={author1} name="Stephen King" />
        <Author image={author2} name="J.K. Rowling" />
        <Author image={author3} name="Haruki Murakami" />
        <Author image={author4} name="Gabriel García Márquez" />
        <Author image={author5} name="Chuck Palahniuk " />
      </section>

      <section className="newsletter">
        <img src={subscribeImage} alt="Subscribe to Newsletter" className="newsletter_image" />

        <div className="newsletter__content">
          <div className="newsletter__text">
            <h3>Join Our Book Community</h3>
            <p>Stay updated with book releases, events & exclusive content</p>
          </div>

          {!subscribed ? (
            <form className="newsletter__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn" type="submit">Join</button>
            </form>
          ) : (
            <p className="newsletter-message">🎉 Thank you for subscribing!</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
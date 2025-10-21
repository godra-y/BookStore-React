import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBooks } from "../../context/BooksContext";
import BookCard from "../../components/bookcard/BookCard";
import "./style.css";

const Books = () => {
  const { books, loading, error, fetchBooks } = useBooks();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("search") || "all";

  useEffect(() => {
    fetchBooks(query);
  }, [query]);

  return (
    <main className="books-page">
      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <section className="books-grid">
          {books.slice(0, 20).map((book) => (
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
      {books.length === 0 && !loading && (
        <p className="no-books">No books found for "{query}".</p>
      )}
    </main>
  );
};

export default Books;
import React, { useEffect } from "react";
import { useBooks } from "../../context/BooksContext";
import BookCard from "../../components/bookcard/BookCard";
import "./style.css";

const Fiction = () => {
  const { books, loading, error, fetchBySubject } = useBooks();

  useEffect(() => {
    fetchBySubject("fiction");
  }, []);

  return (
    <main className="fiction-page">
      <h1 className="fiction-title">Fiction Books</h1>

      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <section className="fiction-grid">
          {books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.key}
                image={
                  book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : "https://via.placeholder.com/150x220?text=No+Cover"
                }
                rating={Math.floor(Math.random() * 5) + 1}
                title={book.title}
                author={book.authors ? book.authors[0].name : "Unknown Author"}
                price={Math.floor(Math.random() * 30) + 10}
              />
            ))
          ) : (
            <p className="error">No books found</p>
          )}
        </section>
      )}
    </main>
  );
};

export default Fiction;
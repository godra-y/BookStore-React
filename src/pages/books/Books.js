import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooks } from "../../context/BooksContext";
import { useDebounce } from "../../hooks/useDebounce"; 

import BookCard from "../../components/bookcard/BookCard";
import Spinner from "../../components/spinner/Spinner";

import "./style.css";

const Books = () => {
  const { books, loading, error, fetchBooks } = useBooks();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const query = params.get("search") || "all";
  const page = parseInt(params.get("page")) || 1;
  const limit = parseInt(params.get("limit")) || 10;

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    fetchBooks({ query: debouncedQuery, page, limit });
  }, [debouncedQuery, page, limit]);

  const updateParams = (newParams) => {
    const p = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) => p.set(key, value));
    navigate(`/books?${p.toString()}`);
  };

  return (
    <main className="books-page">
      <div className="limit-select">
        <h2>Results for: {debouncedQuery}</h2>
        
        <div className="show-select-wrapper">
          <span>Show:</span>
          <select
            value={limit}
            onChange={(e) => updateParams({ limit: e.target.value, page: 1 })}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>

      <div className="content-wrapper">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <section className="books-grid">
            {books.map((book) => (
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
          <p className="no-books">No books found for "{debouncedQuery}".</p>
        )}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => updateParams({ page: page - 1 })}>
          ←
        </button>
        <span>{page}</span>
        <button onClick={() => updateParams({ page: page + 1 })}>
          →
        </button>
      </div>
    </main>
  );
};

export default Books;
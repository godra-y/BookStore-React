import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../../context/BooksContext";
import BookCard from "../../components/bookcard/BookCard";
import "./style.css";

const BookDetail = () => {
  const { title } = useParams();
  const { books } = useBooks();

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    if (!books || books.length === 0) return;

    const found = books.find((b) => b.title === title);
    if (!found) return;

    const bookData = {
      ...found,
      price: found.price || Math.floor(Math.random() * 40) + 10,
      author:
        found.author_name && found.author_name.length > 0
          ? found.author_name.join(", ")
          : "Unknown Author",
      image: found.cover_i
        ? `https://covers.openlibrary.org/b/id/${found.cover_i}-L.jpg`
        : "https://via.placeholder.com/150x220?text=No+Cover",
    };

    setBook(bookData);

    const shuffled = [...books].sort(() => 0.5 - Math.random());
    setRelatedBooks(shuffled.slice(0, 5));
  }, [title, books]);

  if (!book)
    return (
      <main className="book-detail">
        <p className="book-detail__empty">Book not found</p>
      </main>
    );

  return (
    <main className="book-detail">
      <h1 className="book-detail__title">{book.title}</h1>

      <div className="book-detail__main">
        <BookCard
          image={book.image}
          title={book.title}
          author={book.author}
          price={book.price}
          rating={book.rating || 4}
          showButtons={true} 
        />

        <div className="book-detail__desc">
          <p>
            Discover the story of <strong>{book.title}</strong> — a captivating
            book that will stay with you long after you finish reading.
          </p>
          <p>
            Written by <strong>{book.author}</strong>, this book explores
            powerful ideas and emotions that resonate with readers of all ages.
          </p>
        </div>
      </div>

      {relatedBooks.length > 0 && (
        <section className="related-books">
          <h3 className="related-books__title">You also may like</h3>
          <div className="books-grid">
            {relatedBooks.map((b, i) => (
              <BookCard
                key={i}
                image={
                  b.cover_i
                    ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150x220?text=No+Cover"
                }
                rating={b.rating || Math.floor(Math.random() * 5) + 1}
                title={b.title}
                author={
                  b.author_name && b.author_name.length > 0
                    ? b.author_name[0]
                    : "Unknown Author"
                }
                price={b.price || Math.floor(Math.random() * 30) + 10}
                showButtons={true}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BookDetail;
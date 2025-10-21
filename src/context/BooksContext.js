import { createContext, useContext, useState, useEffect } from "react";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async (query = "all") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
      const data = await res.json();
      setBooks(data.docs || []);
    } 
    catch (err) {
      setError(err.message || "Something went wrong");
    } 
    finally {
      setLoading(false);
    }
  };

  const fetchBySubject = async (subject) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=20`);
      const data = await res.json();
      setBooks(data.works || []);
    } 
    catch (err) {
      setError(err.message || "Something went wrong");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("all");
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, error, fetchBooks, fetchBySubject }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
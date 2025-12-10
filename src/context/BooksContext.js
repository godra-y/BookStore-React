import { createContext, useContext, useState, useRef } from "react";
import { 
  fetchBooks as fetchBooksService, 
  fetchBySubject as fetchBySubjectService 
} from "../services/apiService";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const cancelPreviousRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current.signal;
  };

  const fetchBooks = async ({ query = "all", page = 1, limit = 10 }) => {
    setLoading(true);
    setError(null);

    const signal = cancelPreviousRequest();

    try {
      const booksData = await fetchBooksService({ query, page, limit, signal });
      setBooks(booksData);
    } 
    catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  const fetchBySubject = async (subject) => {
    setLoading(true);
    setError(null);

    const signal = cancelPreviousRequest();

    try {
      const booksData = await fetchBySubjectService(subject, { signal });
      setBooks(booksData);
    } 
    catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <BooksContext.Provider value={{ books, loading, error, fetchBooks, fetchBySubject }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
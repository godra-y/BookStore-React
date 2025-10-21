import "./styles/main.css";

import { BooksProvider } from "./context/BooksContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from "react";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer";
import BookCard from "./components/bookcard/BookCard";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import BookDetail from "./pages/book-detail/BookDetail";
import Fiction from "./pages/fiction/Fiction";
import Noniction from "./pages/nonfiction/Nonfiction";
import Favorites from "./pages/favorites/Favorites";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Register";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BooksProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/book/:title" element={<BookDetail />} />
            <Route path="/fiction" element={<Fiction />} />
            <Route path="/nonfiction" element={<Noniction />} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </Router>
        <Footer />
      </BooksProvider>
    </div>
  );
}

export default App;
import "./styles/main.css";

import { BooksProvider } from "./context/BooksContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from "react";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer";
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
import OrderTracking from './pages/static/OrderTracking';
import Shipping from './pages/static/Shipping';
import Payment from './pages/static/Payment';
import Contacts from './pages/static/Contacts';
import Returns from './pages/static/Returns';
import GiftCertificates from './pages/static/GiftCertificates';
import BonusCards from './pages/static/BonusCards';
import About from './pages/static/About';
import Impact from './pages/static/Impact';
import Future from './pages/static/Future';

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
            <Route path="/orders" element={<OrderTracking />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/gift-cards" element={<GiftCertificates />} />
            <Route path="/bonus" element={<BonusCards />} />
            <Route path="/about" element={<About />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/future" element={<Future />} />
          </Routes>
          <Footer />
        </Router>
      </BooksProvider>
    </div>
  );
}

export default App;
import './style.css';
import { NavLink } from 'react-router';

import cards from './../../img/pictures/footer/cards.png';
import apps from './../../img/pictures/footer/apps.png';
import facebook from './../../img/icons/facebook.svg';
import instagram from './../../img/icons/instagram.svg';
import twitter from './../../img/icons/twitter.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_logo">BookStore</div>

      <div className="footer-content">
        <ul className="footer-column">
          <li><span>To customers</span></li>
          <li><NavLink to="/orders">Order tracking</NavLink></li>
          <li><NavLink to="/shipping">Shipping</NavLink></li>
          <li><NavLink to="/payment">Payment</NavLink></li>
          <li><NavLink to="/contacts">Contacts</NavLink></li>
          <li><NavLink to="/returns">Return of the product</NavLink></li>
          <img src={cards} alt="Payment Methods" className="cards-image" />
        </ul>

        <ul className="footer-column">
          <li><span>Services</span></li>
          <li><NavLink to="/gift-cards">Gift certificates</NavLink></li>
          <li><NavLink to="/bonus">Bonus cards</NavLink></li>
        </ul>

        <ul className="footer-column">
          <li><span>Company</span></li>
          <li><NavLink to="/about">About us</NavLink></li>
          <li><NavLink to="/impact">Our impact</NavLink></li>
          <li><NavLink to="/future">Future</NavLink></li>
        </ul>

        <div className="footer-column">
          <span>Follow us</span>
          <div className="footer-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>

          <p className="footer-apps-title">Download free apps for iOS and Android.</p>
          <a href="#" className="app-link">
            <img src={apps} alt="App store badges" className="app-badge" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
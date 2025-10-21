import './style.css';

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
          <li>Order tracking</li>
          <li>Shipping</li>
          <li>Payment</li>
          <li>Contacts</li>
          <li>Return of the product</li>
          <li>FAQ</li>
          <img src={cards} alt="Payment Methods" className="cards-image" />
        </ul>

        <ul className="footer-column">
          <li><span>Services</span></li>
          <li>Gift certificates</li>
          <li>Bonus cards</li>
        </ul>

        <ul className="footer-column">
          <li><span>Company</span></li>
          <li>About us</li>
          <li>Our impact</li>
          <li>Future</li>
        </ul>

        <div className="footer-column">
          <span>Follow us</span>
          <div className="footer-icons">
            <img src={facebook} alt="Facebook" />
            <img src={instagram} alt="Instagram" />
            <img src={twitter} alt="Twitter" />
          </div>

          <p className="footer-apps-title">Download free apps for iOS and Android.</p>
          <img src={apps} alt="App store badges" className="app-badge" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;